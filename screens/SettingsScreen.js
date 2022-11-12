
import React, {useState} from 'react';
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

//import DateTimePicker from '@react-native-community/datetimepicker';
import InputField from '../components/InputField';

import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';

import RegistrationSVG from '../assets/images/registration.svg';
import CustomButton from '../components/CustomButton';

const SettingsScreen = ({navigation}) => {
  const createTwoButtonAlert = () =>
    Alert.alert('Error !!', 'Please enter a positive integer number less than or equal 100', [
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
          Capture Student Marks
        </Text>


        <InputField
          label={'Student ID'}
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
          label={'LeveL ID'}
          icon={
            <FontAwesome
              name="level-up"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
        />
        <InputField
          label={'Session ID'}
          icon={
            <Ionicons
              name="ios-school-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
        />
        <InputField
          label={'Mark'}
          icon={
            <Ionicons
              name="checkmark-done"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
          keyboardType="email-address"
        />

       
       
        <CustomButton label={'Save'} onPress= {createTwoButtonAlert}/>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{color: '#AD40AF', fontWeight: '700'}}> back</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;