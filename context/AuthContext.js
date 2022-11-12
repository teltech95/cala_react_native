import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';
import { BASE_URL } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({children }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [userToken, setUserToken] = useState(null)
    const [test, setTest] = useState('Test value')
    const [userInfo, setUserInfo] = useState(null)


    const tfa = (navigation) =>{
        navigation.navigate('Register')
    }


    const login = (email, password) =>{
        const userObject = {
            username: email,
            password: password
        };
        setIsLoading(true);
        axios.post(`${BASE_URL}/rest-auth/login/`, userObject)
            .then((res) => {
                //console.log(res.data)
                const userInfor = {
                    username: res.data.user_data.username,
                    school: res.data.user_data.school,
                    userId: res.data.user,
                    is_student: res.data.user_data.is_student,
                    is_teacher: res.data.user_data.is_teacher,
                    is_head: res.data.user_data.is_head,
                    is_ministry: res.data.user_data.is_ministry,
                    expirationDate: new Date(new Date().getTime() + 3600 * 1000)
                };
                setUserInfo(userInfor);
                setUserToken(res.data.key);
                AsyncStorage.setItem('userInfo', JSON.stringify(userInfor));
                AsyncStorage.setItem('userToken', res.data.key);
                setIsLoading(false);
            }).catch((error) => {
                console.log(error)
                setIsLoading(false);
                alert('Unable to log in with provided credentials.');

            });
        
    };

   

    const logout = () =>{
        setIsLoading(true);
        setUserToken(null);
        AsyncStorage.removeItem('userToken');
        AsyncStorage.removeItem('userInfo')
        setIsLoading(false);
    }
    const isLoggedIn = async () => {
        try {
            setIsLoading(true);
            let userInfo = await AsyncStorage.getItem('userInfo');
            let userToken = await AsyncStorage.getItem('userToken');
            userInfo = JSON.parse(userInfo)
            if(userInfo){
                setUserToken(userToken);
                setUserInfo(userInfo);
            }
            
            setIsLoading(false);

          //if(value !== null) {
            // value previously stored
          
        } catch(e) {
          // error reading value
          console.log(`is loggedin err ${e}`)
        }
    }

    useEffect(() =>{
        isLoggedIn();
    },[])
    return (
        <AuthContext.Provider value={{login, logout, isLoading, userToken, test, tfa, userInfo}}>
            {children}
        </AuthContext.Provider>
    )
}