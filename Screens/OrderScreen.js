import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';

const OrderScreen = () => {
  return (
    <ScrollView>
        <LottieView source={require("../assets/thumbs.json")} style={{marginTop:30,height:300,width:300,justifyContent:"center"}} />
        <Text style={{marginTop:40,fontSize:20,fontWeight:"bold",textAlign:"center"}} >Siparişiniz Alındı</Text>
    </ScrollView>
  )
}

export default OrderScreen

const styles = StyleSheet.create({})