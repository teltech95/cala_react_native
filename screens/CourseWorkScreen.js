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
import {
  AntDesign,
  Ionicons,
  Feather,
  MaterialIcons,
  Foundation,
  FontAwesome
} from "@expo/vector-icons";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { BASE_URL } from '../config';

const rigthContent = (props) => (
  <MaterialIcons name="keyboard-arrow-right" size={24} color="#AD40AF" />
);

const LeftContent2 = (props) => (
  <FontAwesome name="book" size={24} color="#AD40AF" />
);

const passContent = (props) => (
  <AntDesign name="caretup" size={20} color="#007bff" />
  
);

const failContent = (props) => (
  <AntDesign name="caretdown" size={20} color="red" />
);

const CourseWorkScreen = () =>{

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setErrorFlag] = useState(false);
  const [userCoursework, setUserCoursework] = useState([]);

  const check_mark = (mark) => {
    if(mark > 50){
      return passContent
    }else{
      return failContent
    }
  }
  //const userId = 2;
  useEffect(() => {
    const source = axios.CancelToken.source();
    const url = `${BASE_URL}/mark/`;
    const fetchCoursework = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(url, { cancelToken: source.token });
        //console.log(response.data)
        if (response.status === 200) {
          const fetched_data = response.data;
          const course_work = fetched_data.filter(c => c.user_id == 2);
          console.log('fetching.......................................')
          console.log(course_work);
          setUserCoursework(course_work);
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
    fetchCoursework();
    return () => source.cancel("Data fetching cancelled");
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        
      <ScrollView style={{ padding: 20 }}>
      <View>
      {isLoading && <Text style={{flex:1,justifyContent:'center',alignItems:'center'}}>Loading...</Text>}
        {!isLoading && (
        <View>
          <Text>Course work data</Text>
          {userCoursework.map(item => (
          
          
          <Card style={{ marginVertical: 10 }} key={item.id}>
                <Card.Title
                  title={item.subject}
                  subtitle={item.mark}
                  left={LeftContent2}
                  
                  right={check_mark(item.mark)}
                />
          </Card>
          ))}
        </View>
        
      )}
        
          
      </View>
      </ScrollView>
    </SafeAreaView>

  )
}

export default  CourseWorkScreen;