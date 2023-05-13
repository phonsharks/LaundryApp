import {
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Fİrebase";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [mail, setmail] = useState("");
  const [lock, setlock] = useState("");

  useEffect(() => {
    //sistemde kayıt olan hesap old durumda home sayfasına yönlendirme yapalım.
    const unsubs = auth.onAuthStateChanged((myUserUid) => {
      if (myUserUid) {
        navigation.navigate("Home");
      }
    });
    return unsubs;
  }, []);

  const login = () => {
    signInWithEmailAndPassword(auth, mail, lock).then((userCred) => {
      const user = userCred.user;
    });
  };

  return (
    <ScrollView style={{ backgroundColor: "white" }}>
      <KeyboardAvoidingView
        style={{ flexDirection: "column", alignItems: "center", marginTop: 80 }}
      >
        <View>
          <Text style={{ textAlign: "center", color: "blue", fontSize: 20 }}>
            Giriş Yap
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

        <Pressable
          onPress={login}
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
            Giriş
          </Text>
        </Pressable>

        <Pressable
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 20 }}>
            Hesabınız Yok mu? Kayıt olun
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
