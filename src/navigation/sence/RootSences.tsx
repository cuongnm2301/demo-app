import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { APP_ROUTE } from '../config/routes'
import HomeView from 'feature/home/HomeView'
import navigationConfigs from '../config/options'

const MainStack = createStackNavigator()
const RootStack = createStackNavigator()

const AppStack = () => {
    return (
        <MainStack.Navigator headerMode={'none'} screenOptions={navigationConfigs}>
            <MainStack.Screen name={APP_ROUTE.HOME} component={HomeView} />
        </MainStack.Navigator>
    )
}

const Navigation = () => {
    return <AppStack />
}

export default Navigation
