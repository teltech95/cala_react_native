
import 'react-native-gesture-handler';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as NavigationBar from 'expo-navigation-bar';
//import { StatusBar } from 'expo-status-bar';

import AppNav from './navigation/AppNav';

import { AuthProvider } from './context/AuthContext';

export default function App() {
  NavigationBar.setBackgroundColorAsync("#AD40AF");
  //StatusBar.setStatusBarBackgroundColor("#AD40AF")
  return (
    <AuthProvider>
      <AppNav/>
    </AuthProvider>

  );
}


