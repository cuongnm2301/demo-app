import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { APP_ROUTE, TAB_NAVIGATION_ROOT } from '../config/routes'
import navigationConfigs from '../config/options'
import { Host } from 'react-native-portalize'

import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs'

import HomeView from 'feature/home/HomeView'
import NotificationView from 'feature/notification/NotificationView'
import SettingView from 'feature/setting/Setting'
import StyledTabBar from 'navigation/component/StyledTabBar'

const MainStack = createStackNavigator()
const MainTab = createBottomTabNavigator()

const MainTabContainer = () => {
    const getTabBarVisible = (route: any) => {
        const routeName = route.state
            ? route.state.routes[route.state.index].name
            : route.params?.screen || TAB_NAVIGATION_ROOT.HOME_ROUTE.ROOT
        // list tab bar name to hide
        const list: any[] = []
        if (list.includes(routeName)) {
            return false
        }
        return true
    }
    return (
        <MainTab.Navigator tabBar={(props: BottomTabBarProps) => <StyledTabBar {...props} />}>
            <MainTab.Screen
                name={TAB_NAVIGATION_ROOT.HOME_ROUTE.ROOT}
                component={HomeView}
                options={({ route }: any) => ({
                    tabBarVisible: getTabBarVisible(route),
                })}
            />
            <MainTab.Screen name={TAB_NAVIGATION_ROOT.NOTIFICATION_ROUTE.ROOT} component={NotificationView} />
            <MainTab.Screen name={TAB_NAVIGATION_ROOT.SETTING_ROUTE.ROOT} component={SettingView} />
        </MainTab.Navigator>
    )
}

const AppStack = () => {
    return (
        <Host>
            <MainStack.Navigator headerMode={'none'} screenOptions={navigationConfigs}>
                <MainStack.Screen name={APP_ROUTE.MAIN_TAB} component={MainTabContainer} />
            </MainStack.Navigator>
        </Host>
    )
}

const Navigation = () => {
    return <AppStack />
}

export default Navigation
