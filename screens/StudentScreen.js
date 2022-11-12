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

import {
  Ionicons,
  Feather,
  MaterialIcons,
  Foundation,
  FontAwesome5
} from "@expo/vector-icons";
import axios from "axios";
import { BASE_URL } from '../config';
import { AuthContext } from "../context/AuthContext";
const LeftContent = (props) => (
  <FontAwesome5 name="user" size={24} color="#AD40AF" />
);

const rigthContent = (props) => (
  <MaterialIcons name="keyboard-arrow-right" size={24} color="#AD40AF" />
)

const StudentScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
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
          const filterByStudent = filterBySchool.filter(c => c.is_student == true);

          //console.log('fetching.......................................')
          //console.log(filterByStudent);
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
    {isLoading && <Text style={{flex:1,justifyContent:'center',alignItems:'center'}}>Loading...</Text>}
        {!isLoading && (
        <View style={{ marginVertical: 10}}>
        <Text>List of students</Text>
        {studentData.map(item => (
          <TouchableOpacity key={item.id}>
          <Card style={{ marginVertical: 10 }} >
                <Card.Title
                  title={item.username}
                  subtitle={item.email}
                  left={LeftContent}
                  
                  right={rigthContent}
                />
          </Card>
           </TouchableOpacity>
          ))}
        </View>
         )}
    </ScrollView>
  </SafeAreaView>
  )
}
export default StudentScreen