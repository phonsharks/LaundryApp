import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
} from "react-native";
import React, { useState } from "react";
import HorizontalDatepicker from "@awrminkhodaei/react-native-horizontal-datepicker";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

const PickupScreen = () => {
  const [date, setdate] = useState([]);
  const [stime, ssettime] = useState([]);
  const [del, setdel] = useState([]);
  const navigation = useNavigation();
  //Öncelikle cart dizisine ulşmam gerek
  const cart = useSelector((state) => state.cart.cart); //öncelikle store daha sonra cartReducer cart elemanı..
  //Daha sonra ulaştığım cart dizisini bir değişkene bağlamam gerekmekte
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);

  const deliveryTime = [
    {
      id: "0",
      name: "2-3 Gün",
    },
    {
      id: "1",
      name: "3-4 Gün",
    },
    {
      id: "2",
      name: "4-5 Gün",
    },
    {
      id: "3",
      name: "5-6 Gün",
    },
    {
      id: "4",
      name: "Yarın",
    },
  ];

  const times = [
    {
      id: "0",
      time: "11:00 ",
    },
    {
      id: "1",
      time: "12:00 ",
    },
    {
      id: "2",
      time: "13:00 ",
    },
    {
      id: "2",
      time: "14:00 ",
    },
    {
      id: "4",
      time: "15:00",
    },
    {
      id: "5",
      time: "16:00 ",
    },
  ];

  const procecart = () => {
    //şimdilik işlev sışı oluyor

    /*  if (!setdate || !ssettime) {
      Alert.alert("Geçersiz işlev", "Lütfen geçerli işlev başlatınız", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }   */

    if (setdate || ssettime) {
      navigation.replace("Cart", {

        //backend işlerinde kullanacağım değişkenler
        selectedTime: ssettime,
        pickdate: setdate,
        //setdel ile değişim durumu olabilir.
        no_Of_days: del,
      });
    }
  };

  return (
    <>
      <ScrollView>

        <View>
          <Text style={{ paddingTop: 20, textAlign: "center" }}>
            Adresinizi Giriniz
          </Text>

          <TextInput
            style={{
              padding: 40,
              borderWidth: 2,
              borderColor: "gray",
              borderRadius: 5,
              margin: 10,
            }}
          />

          {/* Özeleştirilebilir bir bileşen*/}
          <Text style={{ paddingTop: 20, textAlign: "center" }}>
            Tarih Seçiniz
          </Text>
          <HorizontalDatepicker
            mode="gregorian"
            startDate={new Date("2020-08-20")}
            endDate={new Date("2020-08-31")}
            initialSelectedDate={new Date("2020-08-22")}
            onSelectedDateChange={(date) => setSelectedDate(date)}
            selectedItemWidth={170}
            unselectedItemWidth={38}
            itemHeight={38}
            itemRadius={10}
            selectedItemTextStyle={styles.selectedItemTextStyle}
            unselectedItemTextStyle={styles.selectedItemTextStyle}
            selectedItemBackgroundColor="#222831"
            unselectedItemBackgroundColor="#ececec"
            flatListContainerStyle={styles.flatListContainerStyle}
          />
        </View>

        {/*Zaman seçimi*/}
        <Text style={{ paddingTop: 20, textAlign: "center" }}>Zaman seçim</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {times.map((item, index) => (
            <Pressable
              onPress={() => {
                ssettime(item.time);
              }}
              style={
                stime.includes(item.time)
                  ? {
                      padding: 10,
                      margin: 10,
                      borderColor: "#088F8F",
                      borderWidth: 3,
                      borderRadius: 5,
                    }
                  : {
                      padding: 10,
                      margin: 10,
                      borderColor: "gray",
                      borderWidth: 1,
                      borderRadius: 5,
                    }
              }
            >
              <Text>{item.time}</Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Teslimat süresi */}
        <Text style={{ paddingTop: 20, textAlign: "center" }}>
          Teslimat Süresi
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {deliveryTime.map((item, index) => (
            <Pressable
              key={index}
              onPress={() => {
                setdate(item.name);
              }}
              style={
                date.includes(item.name)
                  ? {
                      padding: 10,
                      margin: 10,
                      borderColor: "#088F8F",
                      borderWidth: 3,
                      borderRadius: 5,
                    }
                  : {
                      padding: 10,
                      margin: 10,
                      borderColor: "gray",
                      borderWidth: 1,
                      borderRadius: 5,
                    }
              }
            >
              <Text>{item.name}</Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Durum kontrollü açılan bileşen */}
        {total == 0 ? null : (

          <Pressable

            style={{
              backgroundColor: "#088F8F",
              padding: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              margin: 15,
              borderRadius: 25,
            }}
          >
            <View>
              <Text style={{fontWeight:"bold",color:"white"}}>Ekstra fiyat uygulanabilinir</Text>
              <Text style={{textAlign:"center",color:"white",fontWeight:"bold"}}>{cart.length} adet seçilen var</Text>
            </View>

            <Pressable onPress={procecart}>
              <Text style={{fontWeight:"bold"}}>Kartlara devam et</Text>
            </Pressable>

          </Pressable>
        )}
      </ScrollView>
    </>
  );
};

export default PickupScreen;

const styles = StyleSheet.create({});
