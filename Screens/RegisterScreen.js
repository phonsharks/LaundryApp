import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Pressable,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../Fİrebase";
import { doc, setDoc } from "firebase/firestore";

const RegisterScreen = () => {
  const [mail, setmail] = useState("");
  const [lock, setlock] = useState("");
  const [phone, setphone] = useState("");
  const navigation = useNavigation();

  const register = () => {


    /* ilgili veriler boş olduğu durumlarda uyarı vermeliyim */
    if (mail === "" || lock === "" || phone === "") {
      Alert.alert("Gereksiz ayrıntılar", "Lütfen tüm detayları doldurun", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    } 

    /* Yeni kayıt oluşturmak için kullanılan firebase kullanımında  */
    createUserWithEmailAndPassword(auth,mail,lock).then((security)=>{
      const user = security._tokenResponse.mail; //
      const myUserUid=auth.currentUser.uid;   //
      setDoc(doc(db,"users",`${myUserUid}`),{
        mail:user,
        phone:phone
        })
    })
  };

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <KeyboardAvoidingView
        style={{ flexDirection: "column", alignItems: "center", marginTop: 80 }}
      >
        <View>
          <Text style={{ textAlign: "center", color: "blue", fontSize: 20 }}>
            Kayıt Ol
          </Text>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Yeni Hesap Oluştur
          </Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Entypo
            name="email"
            size={19}
            color="black"
            style={{ marginTop: 10 }}
          />
          <TextInput
            //value="mail"
            onChangeText={(text) => setmail(text)}
            placeholder="E-Posta"
            style={{
              borderBottomColor: "gray",
              borderBottomWidth: 1,
              width: 300,
              marginLeft: 10,
            }}
          />
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <FontAwesome5 name="key" size={19} color="black" />
          <TextInput
            //value="lock"
            onChangeText={(text) => setlock(text)}
            secureTextEntry={true}
            placeholder="Şifre"
            style={{
              borderBottomColor: "gray",
              borderBottomWidth: 1,
              width: 300,
              marginLeft: 10,
            }}
          />
        </View>

        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Feather name="phone" size={24} color="black" />
          <TextInput
            //value="lock"
            onChangeText={(text) => setphone(text)}
            placeholder="Şifre"
            style={{
              borderBottomColor: "gray",
              borderBottomWidth: 1,
              width: 300,
              marginLeft: 10,
            }}
          />
        </View>

        <Pressable
          //register fonksiyonu buraya bağladım
          onPress={register}
          style={{
            backgroundColor: "blue",
            borderRadius: 5,
            padding: 10,
            width: 200,
            marginTop: 20,
          }}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            Kayıt Ol
          </Text>
        </Pressable>

        <Pressable
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 20 }}>
            zaten bir hesabın mı var? Giriş yap
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
