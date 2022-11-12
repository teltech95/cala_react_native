import {
  Alert,
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';


import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import LoginSVG from '../assets/images/login.svg';

import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';



const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)

  const {login} = useContext(AuthContext);

  const createTwoButtonAlert = () =>
    Alert.alert('Error !!', 'Invalid login credentials', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ]);

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <View style={{paddingHorizontal: 25}}>
        <View style={{alignItems: 'center'}}>
          <LoginSVG
            height={300}
            width={300}
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
          Login 
        </Text>

        <InputField
          label={'Username ID'}
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
          fieldButtonLabel={"Forgot?"}
          fieldButtonFunction={() => {}}
          value={password}
          onChangeText = {text => setPassword(text)}

        />
        
        {/* <CustomButton label={"Login"} onPress={() => {login(email, password)}} /> */}
        <CustomButton label={"Login"} onPress={() => {login(email, password)}} />

        <Text style={{textAlign: 'center', color: '#666', marginBottom: 30}}>
          
        </Text>

       

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>New to the app?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={{color: '#AD40AF', fontWeight: '700'}}> Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;