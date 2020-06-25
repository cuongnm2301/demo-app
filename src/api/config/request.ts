import axios from 'axios'
import Config from 'react-native-config'
import i18next from 'shared/utilities/i18next'
import TokenProvider from 'services/authenticate/TokenProvider'
import AuthenticateService from 'services/authenticate/AuthenticateService'
import { AUTH_URL } from 'api/config/urls'
const request = axios.create({
    baseURL: Config.API_URL,
    timeout: 5000,
    headers: { Accept: '*/*' },
})
// for multiple requests
let isRefreshing = false
let failedQueue: any = []

const processQueue = (error: any, token: string | null | undefined = null) => {
    failedQueue.forEach((prom: any) => {
        if (error) {
            prom.reject(error)
        } else {
            prom.resolve(token)
        }
    })

    failedQueue = []
}
request.interceptors.request.use(
    async function (config: any) {
        // Do something before api is sent
        const userToken = await TokenProvider.getToken()
        if (userToken) {
            config.headers['Authorization'] = 'Bearer ' + userToken
        }
        // __DEV__ &&
        //     console.log(
        //         `%c ${config.method?.toUpperCase()} from ${config.url}:`,
        //         'background: ' + 'yellow' + '; color: #000',
        //         config,
        //     )
        return config
    },
    function (error: any) {
        // Do something with api error
        // __DEV__ &&
        //     console.log(
        //         `%c FAILED ${error.response.method?.toUpperCase()} from ${error.response.config.url}:`,
        //         'background: ' + 'red' + '; color: #fff',
        //         error.response,
        //     )
        return Promise.reject(error)
    },
)
request.interceptors.response.use(
    function (response: any) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        // __DEV__ &&
        //     console.log(
        //         `%c SUCCESS ${response.config.method?.toUpperCase()} from ${response.config.url}:`,
        //         'background: ' + 'green' + '; color: #fff',
        //         response.data,
        //     )
        return response
    },
    async function (error: any) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        const { response } = error || {}
        const { data } = response || {}
        const { errorMessage } = data || {}

        // __DEV__ &&
        //     console.log(
        //         `%c FAILED ${error.config?.method?.toUpperCase()} from ${error?.config?.url}:`,
        //         'background: ' + 'red' + '; color: #fff',
        //         error.response,
        //     )
        const originalRequest = error.config
        if (errorMessage === 'RefreshToken_NotExist') {
            // console.log('RefreshToken_NotExist => logout :(')
            // logout here
            await AuthenticateService.logOut()
            return Promise.reject(error)
        } else if (
            ((error.response && error.response.status === 401) || errorMessage === 'Token_Expire') &&
            !originalRequest.retry
        ) {
            if (isRefreshing) {
                return new Promise(function (resolve: any, reject: any) {
                    failedQueue.push({ resolve, reject })
                })
                    .then((token: any) => {
                        originalRequest.headers['Authorization'] = 'Bearer ' + token
                        return request(originalRequest)
                    })
                    .catch((err: any) => {
                        return Promise.reject(err)
                    })
            }
            // console.log('refreshing token...')
            originalRequest.retry = true
            isRefreshing = true
            const localRefreshToken = await TokenProvider.getRefreshToken()
            return new Promise(function (resolve: any, reject: any) {
                // we use pure axios when refreshing token
                axios
                    .post(Config.API_URL + '/' + AUTH_URL.refreshToken, {
                        refresh_token: localRefreshToken,
                    })
                    .then(async ({ data: response_data }: any) => {
                        const { token, refreshToken } = response_data
                        await TokenProvider.setAllNewToken(token, refreshToken)
                        originalRequest.headers['Authorization'] = 'Bearer ' + refreshToken
                        processQueue(null, token)
                        resolve(request(originalRequest))
                    })
                    .catch((err: any) => {
                        processQueue(err, null)
                        reject(err)
                    })
                    .then(() => {
                        isRefreshing = false
                    })
            })
        }
        error.message = errorMessage || i18next.t('common.errorMessage.requestFailed')
        return Promise.reject(error)
    },
)
export default request
