import React, {useContext, useState} from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../config';

//import DateTimePicker from '@react-native-community/datetimepicker';
import InputField from '../components/InputField';

import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import RegistrationSVG from '../assets/images/registration.svg';
import CustomButton from '../components/CustomButton';
import { AuthContext } from '../context/AuthContext';

const RegisterScreen = ({navigation}) => {

  const [username, setUsername] = useState(null)
  const [school, setSchool] = useState(null)
  const [email, setEmail] = useState(null)
  const [account, setAccount] = useState(null)
  const [password, setPassword] = useState(null)
  const [cpassword, setCPassword] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const register = (username, school, email, password, cpassword) =>{
    const userObject = {
        username: username,
        school:school,
        email: email,
        password1: password,
        password2: cpassword,
        is_student: true,
        is_teacher: false,
        is_head: false,
        is_ministry: false

    };
    console.log(userObject);
    setIsLoading(true);
    axios.post(`${BASE_URL}/rest-auth/registration/`, userObject)
        .then((res) => {
            console.log(res.data)
            
            setIsLoading(false);
            alert('Account created successfully.');
            navigation.navigate('Login')
        }).catch((error) => {
            console.log(error)
            setIsLoading(false);
            alert('Unable to create your account.');

        });
    
  }
  const createTwoButtonAlert = () =>
    Alert.alert('Error !!', 'Please fill in all fields', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{paddingHorizontal: 25}}>
        <View style={{alignItems: 'center'}}>
          <RegistrationSVG
            height={240}
            width={240}
            style={{transform: [{rotate: '-5deg'}]}}
          />
        </View>

        <Text
          style={{
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            marginBottom: 30,
          }}>
          Create Account
        </Text>


        <InputField
          label={'Username'}
          icon={
            <Ionicons
              name="person-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          value={username}
          onChangeText = {text => setUsername(text)}
        />
         <InputField
          label={'Account Type'}
          icon={
            <Ionicons
              name="person-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
        />
        <InputField
          label={'School ID'}
          icon={
            <Ionicons
              name="ios-school-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          value={school}
          onChangeText = {text => setSchool(text)}
        />
        <InputField
          label={'Email ID'}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          keyboardType="email-address"
          value={email}
          onChangeText = {text => setEmail(text)}
        />

        <InputField
          label={'Password'}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          inputType="password"
          value={password}
          onChangeText = {text => setPassword(text)}
        />

        <InputField
          label={'Confirm Password'}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          inputType="password"
          value={cpassword}
          onChangeText = {text => setCPassword(text)}
        />


        <CustomButton label={'Register'} onPress={() => {register(username, school, email, password, cpassword)}}/>
 
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>Already registered?</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{color: '#AD40AF', fontWeight: '700'}}> Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;