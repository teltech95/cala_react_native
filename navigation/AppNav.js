import { Text, View } from 'react-native'
import {NavigationContainer} from '@react-navigation/native';
import React, { Component, useContext } from 'react'
import AuthStack from './AuthStack';
import AppStack from './AppStack';
import { ActivityIndicator } from 'react-native-paper';
import { AuthContext } from '../context/AuthContext';

const AppNav = () => {
    const {isLoading, userToken} = useContext(AuthContext)
    if( isLoading ){
        return(
            <View style={{flex:1, justifyContent:'center', alignContent:'center'}}>
                {/* <ActivityIndicator size={'large'}/> */}
                <ActivityIndicator animating={true} color="#AD40AF" size={'large'}/>
                
            </View>
        )
       
    }
    return (
        <NavigationContainer>
            {userToken !== null ? 
                <AppStack /> 
                : 
                <AuthStack/>
            }
            
            {/* <AppStack />  */}
       </NavigationContainer>
    )
  
}

export default AppNav