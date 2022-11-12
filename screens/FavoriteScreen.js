import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Linking
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

const LeftContent2 = (props) => (
  <FontAwesome name="book" size={24} color="#AD40AF" />
);

const rigthContent = (props) => (
  <MaterialIcons name="keyboard-arrow-right" size={24} color="#AD40AF" />
);

const FavoriteScreen = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setErrorFlag] = useState(false);
  const [elements, setElements] = useState([]);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const url = `${BASE_URL}/learning/`;
    const fetchElements = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(url, { cancelToken: source.token });
        //console.log(response.data)
        if (response.status === 200) {
          const fetched_data = response.data;
          const filted_elements = fetched_data.filter(c => c.school_id == 1);
          console.log('fetching.......................................')
          console.log(filted_elements);
          setElements(filted_elements);
          setIsLoading(false);
          return;
        } else {
          throw new Error("Failed to fetch data");
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
    fetchElements();
    return () => source.cancel("Data fetching cancelled");
  }, []);

  const openDoc = (url) => {
    return Linking.openURL(url);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        
    <ScrollView style={{ padding: 20 }}>
    <View>
    {isLoading && <Text style={{flex:1,justifyContent:'center',alignItems:'center'}}>Loading...</Text>}
      {!isLoading && (
      <View>
        <Text>Study material</Text>
        {elements.map(item => (
        
        
        <Card style={{ marginVertical: 10 }} key={item.id} onPress={() => {openDoc(item.document)}}>
              <Card.Title
                title={item.title}
                subtitle={item.session}
                left={LeftContent2}
                
                right={rigthContent}
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

export default FavoriteScreen