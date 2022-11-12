import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import { Ionicons, Feather, MaterialIcons, Foundation } from '@expo/vector-icons';

import BannerSlider from '../components/BannerSlider';
import {windowWidth} from '../utils/Dimensions';

import {freeGames, paidGames, sliderData} from '../model/data';
import CustomSwitch from '../components/CustomSwitch';

import ListItem from '../components/ListItem';
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from '@expo-google-fonts/inter';

const LeftContent = props => <Ionicons name="ios-school-outline" size={24} color="#AD40AF" />
const LeftContent2 = props => <Foundation name="results" size={24} color="#AD40AF" />

const rigthContent = props => <MaterialIcons name="keyboard-arrow-right" size={24} color="#AD40AF" />

export default function HomeScreen({navigation}) {
  const [gamesTab, setGamesTab] = useState(1);

  const renderBanner = ({item, index}) => {
    return <BannerSlider data={item} />;
  };

  const onSelectSwitch = value => {
    setGamesTab(value);
  };

  let [fontsLoaded] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView style={{padding: 20}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 10,
            marginTop: 20,
          }}>
          <Text style={{fontSize: 18, fontFamily: 'Inter_500Medium'}}>
            Hello !! Valentine
          </Text>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <ImageBackground
              source={require('../assets/images/tfa.jpeg')}
              style={{width: 35, height: 35}}
              imageStyle={{borderRadius: 25}}
            />
          </TouchableOpacity>
        </View>

       

        <View style={{marginVertical: 10}}>
          <Card>
            <Card.Title title="Course Work" subtitle="Updates" left={LeftContent} right={rigthContent}/>
            
          </Card>
        </View>
        <View style={{marginVertical: 10}}>
          <Card>
            <Card.Title title="Study Material" subtitle="no updates" left={LeftContent2}  right={rigthContent}/>
            
          </Card>
        </View>

       
      </ScrollView>
    </SafeAreaView>
  );
}
