import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import { Entypo } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import Carousel from "../Components/Carousel";
import Services from "../Components/Services";
import Dressitem from "../Components/Dressitem";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../productReducer";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const cart = useSelector((state) => state.cart.cart); //öncelikle store daha sonra cartReducer cart elemanı..
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);  //cart içine etkide oluşan toplam durumu
  const navigation = useNavigation();
  const [addresscur, setaddresscur] = useState("Yoğunluğu Görüntüleyeceğiz");
  const [enableadress, setenableadress] = useState(false);

  useEffect(() => {
    //checkLocation();
    //getLocation();
  }, []);
   

const checkLocation = async () => {
    let enabled = await Location.hasServicesEnabledAsync();
    if (!enabled) {
      Alert.alert(
        "Lokasyon servisi tanımlı değil",
        "",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
    } else {
      setenableadress(enabled);
    }
  }; 

  /* Hali hazırda bulunulan lokasyon */

const getLocation = async () => {
    let status = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "İzin alınamadı",
        "",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
    }
    const coords = await Location.getCurrentPositionAsync();
    console.log(coords);
    if (coords) {
      const { latitude, longidude } = coords;
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longidude,
      });
    }
    console.log(response);
    for (let item of response) {
      let address = `${item.name} ${item.city} ${item.postalcode}`;
      setaddresscur(address);
    }
  };
 


  const product = useSelector((state) => state.product.product); //store -> productReducer -> product kullanılacak elemanı seçtim
  const dispatch = useDispatch();

  useEffect(() => {
    if (product.length > 0) return;

    const fetchProduct = () => {
      //burada fonksiyon içi boş olursa resim görüntülemesi olamaz
      services.map((item) => dispatch(getProducts(item)));
    };
    fetchProduct();
  }, []); 
  
  //console.log(product);
  const services = [
    {
      id: "0",
      image: "https://cdn-icons-png.flaticon.com/128/4643/4643574.png",
      name: "shirt",
      quantity: 0,
      price: 10,
    },
    {
      id: "11",
      image: "https://cdn-icons-png.flaticon.com/128/892/892458.png",
      name: "T-shirt",
      quantity: 0,
      price: 10,
    },
    {
      id: "12",
      image: "https://cdn-icons-png.flaticon.com/128/9609/9609161.png",
      name: "dresses",
      quantity: 0,
      price: 10,
    },
    {
      id: "13",
      image: "https://cdn-icons-png.flaticon.com/128/599/599388.png",
      name: "jeans",
      quantity: 0,
      price: 10,
    },
    {
      id: "14",
      image: "https://cdn-icons-png.flaticon.com/128/9431/9431166.png",
      name: "Sweater",
      quantity: 0,
      price: 10,
    },
    {
      id: "15",
      image: "https://cdn-icons-png.flaticon.com/128/3345/3345397.png",
      name: "shorts",
      quantity: 0,
      price: 10,
    },
    {
      id: "16",
      image: "https://cdn-icons-png.flaticon.com/128/293/293241.png",
      name: "Sleeveless",
      quantity: 0,
      price: 10,
    },
  ];

  return (
    <>

      <ScrollView
        style={{ paddingTop: 20, backgroundColor: "#E8E8E8", flex: 1 }}
      >
        {/* Location ve profile */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 12,
            padding: 10,
          }}
        >
          <Entypo name="location-pin" size={30} color="#fd5c63" />

          <View>
            <Text style={{ fontSize: 20, fontWeight: "500" }}>Home</Text>
          </View>

          <Pressable>
            <Image
              style={{ width: 50, height: 50, borderRadius: 25 }}
              source={{
                uri: "https://wallpapers.com/images/hd/cool-profile-picture-ld8f4n1qemczkrig.jpg",
              }}
            />
          </Pressable>

        </View>

        {/* Arama Kutusu */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 12,
            borderColor: "red",
            borderWidth: 0.8,
          }}
        >
          <TextInput placeholder="Aramak için giriniz" />
          <Feather name="search" size={24} color="black" />
        </View>

        {/* Resim sağa-sola kaydırma ekranı */}
        <Carousel />

        {/* Servis ekranı */}
        <Services />

        {/* Tüm ürünler üzerine işlem */}
        
        {/* 
        1->Oluştuulan product disizinde veri depoluyorum ve daha sonra
        dizinin içine map ile nüfuz ediyorum. 
        
        */}
        {product.map((item, index) => (
          <Dressitem item={item} key={index} />
        ))}

      </ScrollView>

      
      {/* Burası ekleme yapılacağı zaman ortaya çıkan bileşen olmakta */}
      
      {total == 0 ? null : (
        <Pressable
          style={{
            backgroundColor: "#088F8F",
            padding: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            margin: 15,
            borderRadius:20,
          }}
        >
          <View>
            <Text style={{fontWeight:"bold",color:"white"}}>Ekstra fiyat uygulanabilinir</Text>
            <Text style={{textAlign:"center",fontWeight:"bold",color:"white"}}>{cart.length} items</Text>
          </View>

          <Pressable
            onPress={() => {
              navigation.navigate("Pick");
            }}
          >
            <Text style={{fontWeight:"bold"}}>Teslim almaya devam et</Text>
          </Pressable>
          
        </Pressable>
      )}
      
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
