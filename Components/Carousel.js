import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SliderBox } from "react-native-image-slider-box";

const Carousel = () => {
  const images = [
    "https://media.istockphoto.com/id/1247884083/vector/laundry-service-room-vector-illustration-washing-and-drying-machines-with-cleansers-on-shelf.jpg?s=612x612&w=0&k=20&c=myaNEKlqX7R--bzWGDoMI7PhdxG_zdQTKYEBlymJQGk=",
    "https://images.pexels.com/photos/5591581/pexels-photo-5591581.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://www.ucanlartemizlik.com/wp-content/uploads/2021/03/izmir-ev-temizlik-sirketi.jpg",
  ];
  return (
    <View>
      <SliderBox
        images={images}
        autoPlay
        circleLoop
        ImageComponentStyle={{
          borderRadius: 3,
          width: "95%",
        }}
      />
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({});
