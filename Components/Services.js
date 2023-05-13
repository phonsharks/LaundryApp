import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import React from "react";



const Services = () => {

  const svcs = [
    {
      id: "0",
      image: "https://cdn-icons-png.flaticon.com/128/3003/3003984.png",
      name: "Yıkama",
    },
    {
      id: "11",
      image: "https://cdn-icons-png.flaticon.com/128/2975/2975175.png",
      name: "Çamaşır",
    },
    {
      id: "12",
      image: "https://cdn-icons-png.flaticon.com/128/9753/9753675.png",
      name: "Kurutma/Ütü",
    },
    {
      id: "13",
      image: "https://cdn-icons-png.flaticon.com/128/995/995016.png",
      name: "Temizlik",
    },
  ];
  
  return (
    
    <View>

      <Text style={{ textAlign: "center", fontSize: 25, fontWeight: "bold" }}>
        Bulunan Hizmetler
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>

        {svcs.map((item, index) => (
          <Pressable
            key={index}
            style={{
              margin: 10,
              padding: 40,
              backgroundColor: "white",
              borderRadius: 35,
            }}
          >
            <Image
              source={{ uri: item.image }}
              style={{ width: 70, height: 70 }}
            />
            <Text style={{ textAlign: "center" ,marginTop:10}}>{item.name}</Text>
          </Pressable>
        ))}

      </ScrollView>

    </View>
  );
};

export default Services;

const styles = StyleSheet.create({});
