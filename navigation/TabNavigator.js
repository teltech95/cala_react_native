import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import {
Button,
ImageBackground,
TextInput,
TouchableOpacity,
} from "react-native";
import HomeScreen from '../screens/HomeScreen';
import CourseWorkScreen from '../screens/CourseWorkScreen';

import CartScreen from '../screens/CartScreen';
import StudentScreen from '../screens/StudentScreen'
import TeacherScreen from '../screens/TeacherScreen'
import AnalysisScreen from '../screens/AnalysisScreen'
import AddMarkScreen from '../screens/AddMarkScreen'
import AddElementScreen from '../screens/AddElementScreen'

import FavoriteScreen from '../screens/FavoriteScreen';
import GameDetailsScreen from '../screens/GameDetailsScreen';
import { AuthContext } from "../context/AuthContext";
import { Ionicons, Feather, FontAwesome, FontAwesome5, Octicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeStack = () => {
 
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GameDetails"
        component={GameDetailsScreen}
        options={({route}) => ({
          title: route.params?.title,
        })}
      />
    </Stack.Navigator>
  );
};

const TabNavigator = ({navigation}) => {
  const { userInfo } = useContext(AuthContext);

  if (userInfo.is_student === true) {
    return (
    
      <Tab.Navigator
        screenOptions={{
          headerShown: true,
          tabBarShowLabel: false,
          headerStyle: {
            backgroundColor: '#AD40AF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ paddingRight:10}}>
                <ImageBackground
                  source={require("../assets/images/tfa.jpeg")}
                  style={{ width: 35, height: 35 }}
                  imageStyle={{ borderRadius: 25 }}
                />
              </TouchableOpacity>),
          tabBarInactiveTintColor: '#fff',
          tabBarActiveTintColor: 'yellow',
        }}>
          
        <Tab.Screen
          name="Home2"
          component={HomeStack}
          options={({route}) => ({
            tabBarStyle: {
              display: getTabBarVisibility(route),
              backgroundColor: '#AD49AF',
            },
            
            title: 'My home',
            tabBarIcon: ({color, size}) => (
              <Ionicons name="home-outline" color={color} size={size} />
            ),
          })}
        />
        
        <Tab.Screen
          name="Favorite"
          component={FavoriteScreen}
          
          options={({route}) => ({
            tabBarStyle: {
              display: getTabBarVisibility(route),
              backgroundColor: '#AD49AF',
            },
            
            title: 'Learning Elements',
            tabBarIcon: ({color, size}) => (
              <Ionicons name="book" color={color} size={size} />
            ),
          })}
        />
         <Tab.Screen
          name="CourseWork"
          component={CourseWorkScreen}
          
  
          options={({route}) => ({
            tabBarStyle: {
              display: getTabBarVisibility(route),
              backgroundColor: '#AD49AF',
            },
            
            title: 'Course Work',
            tabBarIcon: ({color, size}) => (
              <Ionicons name="timer-outline" size={size} color={color} />
            ),
          })}
        />
        
      </Tab.Navigator>
    );
  }
  if (userInfo.is_teacher === true) {
    return (
    
      <Tab.Navigator
        screenOptions={{
          headerShown: true,
          tabBarShowLabel: false,
          headerStyle: {
            backgroundColor: '#AD40AF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ paddingRight:10}}>
                <ImageBackground
                  source={require("../assets/images/tfa.jpeg")}
                  style={{ width: 35, height: 35 }}
                  imageStyle={{ borderRadius: 25 }}
                />
              </TouchableOpacity>),
          tabBarInactiveTintColor: '#fff',
          tabBarActiveTintColor: 'yellow',
        }}>
          
        <Tab.Screen
          name="Home2"
          component={HomeStack}
          options={({route}) => ({
            tabBarStyle: {
              display: getTabBarVisibility(route),
              backgroundColor: '#AD49AF',
            },
            
            title: 'My home',
            tabBarIcon: ({color, size}) => (
              <Ionicons name="home-outline" color={color} size={size} />
            ),
          })}
        />
        
        <Tab.Screen
          name="AddElement"
          component={AddElementScreen}
          
          options={({route}) => ({
            tabBarStyle: {
              display: getTabBarVisibility(route),
              backgroundColor: '#AD49AF',
            },
            
            title: 'Learning Elements',
            tabBarIcon: ({color, size}) => (
              <Ionicons name="book" color={color} size={size} />
            ),
          })}
        />
         <Tab.Screen
          name="AddUpdate"
          component={AddMarkScreen}
          options={({route}) => ({
            tabBarStyle: {
              display: getTabBarVisibility(route),
              backgroundColor: '#AD49AF',
            },
            
            title: 'Add / Update Mark',
            tabBarIcon: ({color, size}) => (
              <Ionicons name="person-add-outline" size={size} color={color} />
            ),
          })}
        />
        
      </Tab.Navigator>
    );
  }
  if (userInfo.is_head === true) {
    return (
    
      <Tab.Navigator
        screenOptions={{
          headerShown: true,
          tabBarShowLabel: false,
          headerStyle: {
            backgroundColor: '#AD40AF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ paddingRight:10}}>
                <ImageBackground
                  source={require("../assets/images/tfa.jpeg")}
                  style={{ width: 35, height: 35 }}
                  imageStyle={{ borderRadius: 25 }}
                />
              </TouchableOpacity>),
          tabBarInactiveTintColor: '#fff',
          tabBarActiveTintColor: 'yellow',
        }}>
          
        <Tab.Screen
          name="Home2"
          component={HomeStack}
          options={({route}) => ({
            tabBarStyle: {
              display: getTabBarVisibility(route),
              backgroundColor: '#AD49AF',
            },
            
            title: 'My home',
            tabBarIcon: ({color, size}) => (
              <Ionicons name="home-outline" color={color} size={size} />
            ),
          })}
        />
        
        <Tab.Screen
          name="Student"
          component={StudentScreen}
          
          options={({route}) => ({
            tabBarStyle: {
              display: getTabBarVisibility(route),
              backgroundColor: '#AD49AF',
            },
            
            title: 'Active Student',
            tabBarIcon: ({color, size}) => (
              <FontAwesome5 name="user" color={color} size={size} />
            ),
          })}
        />

        <Tab.Screen
          name="Teacher"
          component={TeacherScreen}
          
          options={({route}) => ({
            tabBarStyle: {
              display: getTabBarVisibility(route),
              backgroundColor: '#AD49AF',
            },
            
            title: 'Active Staff',
            tabBarIcon: ({color, size}) => (
              <FontAwesome5 name="user-tie" color={color} size={size} />
            ),
          })}
        />
        
        <Tab.Screen
          name="Analysis"
          component={AnalysisScreen}
          
          options={({route}) => ({
            tabBarStyle: {
              display: getTabBarVisibility(route),
              backgroundColor: '#AD49AF',
            },
            
            title: 'Statistical Analysis',
            tabBarIcon: ({color, size}) => (
              <Octicons name="graph" color={color} size={size} />
            ),
          })}
        />
        
      </Tab.Navigator>

      
    );
  }

};

const getTabBarVisibility = route => {
  // console.log(route);
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';
  // console.log(routeName);

  if( routeName == 'GameDetails' ) {
    return 'none';
  }
  return 'flex';
};

export default TabNavigator;
