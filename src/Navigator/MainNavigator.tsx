/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabs from './BottomTab';
import { RootState, store } from '../Redux/Store/store'
import { Provider, useSelector, useDispatch } from 'react-redux'
import LoginPage from '../Components/Login/LoginPage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from '../Redux/Slice/authSlice';

function MainNavigator(): React.JSX.Element {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
    const dispatch = useDispatch()

    const clearAuthToken = async () => {
        try {
            await AsyncStorage.setItem('AUTH_TOKEN', '')
        } catch (e) {
            console.log('error while clearing auth token', e)
        }
    }

    React.useEffect(() => {
        // let sessionTimeout: any

        // if (isAuthenticated) {
        //     sessionTimeout = setTimeout(() => {
        //         dispatch(logout())
        //         clearAuthToken()
        //     }, 5 * 60 * 1000)
        // }

        // return () => {
        //     clearTimeout(sessionTimeout)
        // }
    }, [isAuthenticated])

    return (
        <Provider store={store}>
            <NavigationContainer>
                <SafeAreaView style={{ flex: 1 }}>
                    {
                        isAuthenticated ? <BottomTabs /> : <LoginPage />
                    }
                </SafeAreaView>
            </NavigationContainer>
        </Provider>
    );
}

export default MainNavigator;
