import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  
} from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import Carousel from "react-native-snap-carousel";
import {
  Ionicons,
  Feather,
  MaterialIcons,
  Foundation,
} from "@expo/vector-icons";
import axios from "axios";
import { BASE_URL } from '../config';

import BannerSlider from "../components/BannerSlider";
import { windowWidth } from "../utils/Dimensions";

import { freeGames, paidGames, sliderData } from "../model/data";
import CustomSwitch from "../components/CustomSwitch";

import ListItem from "../components/ListItem";
import AppLoading from "expo-app-loading";
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
} from "@expo-google-fonts/inter";
import { AuthContext } from "../context/AuthContext";
const LeftContent = (props) => (
  <Ionicons name="ios-school-outline" size={24} color="#AD40AF" />
);
const LeftContent2 = (props) => (
  <Foundation name="results" size={24} color="#AD40AF" />
);
const LeftContent3 = (props) => (
  <MaterialIcons name="analytics" size={24} color="#AD40AF" />
);

const rigthContent = (props) => (
  <MaterialIcons name="keyboard-arrow-right" size={24} color="#AD40AF" />
);

export default function HomeScreen({ navigation }) {
  const [gamesTab, setGamesTab] = useState(1);

  const { userInfo } = useContext(AuthContext);

  const renderBanner = ({ item, index }) => {
    return <BannerSlider data={item} />;
  };

  const onSelectSwitch = (value) => {
    setGamesTab(value);
  };

  const StudentComponent = () => {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        
        <ScrollView style={{ padding: 20 }}>
          {/* <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 10,
              marginTop: 20,
            }}
          >
            <Text style={{ fontSize: 18, fontFamily: "Inter_500Medium" }}>
              Hello ! {userInfo.username}
            </Text>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <ImageBackground
                source={require("../assets/images/tfa.jpeg")}
                style={{ width: 35, height: 35 }}
                imageStyle={{ borderRadius: 25 }}
              />
            </TouchableOpacity>
          </View> */}
          <View>
            <View style={{ marginVertical: 10 }}>
            <TouchableOpacity onPress={() => navigation.navigate('CourseWork')}>
              <Card>
                <Card.Title
                  title="Course Work"
                  subtitle="Updates"
                  left={LeftContent}
                  right={rigthContent}
                />
              </Card>
              </TouchableOpacity>
            </View>
            <View style={{ marginVertical: 10 }}>
            <TouchableOpacity onPress={() => navigation.navigate('Favorite')}>
              <Card>
                <Card.Title
                  title="Study Material"
                  subtitle="updates"
                  left={LeftContent2}
                  right={rigthContent}
                />
              </Card>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };

  const TeacherComponent = () => {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <ScrollView style={{ padding: 20 }}>
          <View>
            <Text>Dashboard</Text>
            <View style={{ marginVertical: 10 }}>
              <Card>
                <Card.Title
                  title="My Students"
                  subtitle="77"
                  left={LeftContent}
                  right={rigthContent}
                />
              </Card>
            </View>
            <View style={{ marginVertical: 10 }}>
              <Card>
                <Card.Title
                  title="Marks"
                  subtitle="Capture"
                  left={LeftContent2}
                  right={rigthContent}
                />
              </Card>
            </View>

            <View style={{ marginVertical: 10 }}>
              <Card>
                <Card.Title
                  title="Learning Elements"
                  subtitle="Upload"
                  left={LeftContent3}
                  right={rigthContent}
                />
              </Card>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };
  const HeadComponent = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setErrorFlag] = useState(false);
    const [teacherData, setTeacherData] = useState([]);
    const [studentData, setStudentData] = useState([]);


    useEffect(() => {
      const source = axios.CancelToken.source();
      const url = `${BASE_URL}/alluser/`;
      const fetchUsers = async () => {
        try {
          setIsLoading(true);
          const response = await axios.get(url, { cancelToken: source.token });
          console.log(response.data)
          if (response.status === 200) {
            const fetched_data = response.data;
            const filterBySchool = fetched_data.filter(c => c.school == 1);
            const filterByTeacher = filterBySchool.filter(c => c.is_teacher == true);
            const filterByStudent = filterBySchool.filter(c => c.is_student == true);

            //console.log('fetching.......................................')
            //console.log(filterByStudent);
            setTeacherData(filterByTeacher);
            setStudentData(filterByStudent)
            setIsLoading(false);
            return;
          } else {
            throw new Error("Failed to fetch users");
          }
        } catch (error) {
          if(axios.isCancel(error)){
            console.log('Data fetching cancelled');
          }else{
            setErrorFlag(true);
            setIsLoading(false);
          }
        }
      };
      fetchUsers();
      return () => source.cancel("Data fetching cancelled");
    }, []);

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <ScrollView style={{ padding: 20 }}>
          <View>
            <Text>Dashboard</Text>
            <View style={{ marginVertical: 10 }}>
            <TouchableOpacity onPress={() => navigation.navigate('Student')}>
            <Card>
                <Card.Title
                  title="All Active Students"
                  subtitle={studentData.length}
                  left={LeftContent}
                  right={rigthContent}
                />
              </Card>
            </TouchableOpacity>
              
            </View>
            <View style={{ marginVertical: 10 }}>
            <TouchableOpacity onPress={() => navigation.navigate('Teacher')}>
              <Card>
                <Card.Title
                  title="All Active Teachers"
                  subtitle={teacherData.length}
                  left={LeftContent2}
                  right={rigthContent}
                />
              </Card>
              </TouchableOpacity>
            </View>

            <View style={{ marginVertical: 10 }}>
              <Card>
                <Card.Title
                  title="Statistical Analysis"
                  subtitle="teachers/students/coursework"
                  left={LeftContent3}
                  right={rigthContent}
                />
              </Card>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };

  const MinistryComponent = () => {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <ScrollView style={{ padding: 20 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 10,
              marginTop: 20,
            }}
          >
            <Text style={{ fontSize: 18, fontFamily: "Inter_500Medium" }}>
              Hello ! {userInfo.username}
            </Text>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <ImageBackground
                source={require("../assets/images/tfa.jpeg")}
                style={{ width: 35, height: 35 }}
                imageStyle={{ borderRadius: 25 }}
              />
            </TouchableOpacity>
          </View>
          <View>
            <View style={{ marginVertical: 10 }}>
              <Card>
                <Card.Title
                  title="All Schools"
                  subtitle="200"
                  left={LeftContent}
                  right={rigthContent}
                />
              </Card>
            </View>

            <View style={{ marginVertical: 10 }}>
              <Card>
                <Card.Title
                  title="All Active Students"
                  subtitle="593"
                  left={LeftContent2}
                  right={rigthContent}
                />
              </Card>
            </View>

            <View style={{ marginVertical: 10 }}>
              <Card>
                <Card.Title
                  title="All Active Teachers"
                  subtitle="609"
                  left={LeftContent2}
                  right={rigthContent}
                />
              </Card>
            </View>

            <View style={{ marginVertical: 10 }}>
              <Card>
                <Card.Title
                  title="Statistical Analysis"
                  subtitle="Pass Rate"
                  left={LeftContent3}
                  right={rigthContent}
                />
              </Card>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
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

  // if((userInfo.is_student === true) && (userInfo.is_teacher === false) &&  (userInfo.is_head === false) &&  (userInfo.is_ministry === false)){

  if (userInfo.is_student === true) {
    return <StudentComponent />;
  }

  if (userInfo.is_teacher === true) {
    return <TeacherComponent />;
  }

  if (userInfo.is_head === true) {
    return <HeadComponent />;
  }

  if (userInfo.is_ministry === true) {
    return <MinistryComponent />;
  }
}
