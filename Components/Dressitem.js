import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../CartReducer";
import { decrementQuantity, incrementQuantity } from "../productReducer";

const Dressitem = ({ item }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart); // Dressitem->store->cartReducer

  const addItem = () => {
    dispatch(addToCart(item)); //cart
    dispatch(incrementQuantity(item));
  };
  return (
    <View style={{ marginHorizontal: 6 }}>

      <Pressable
      
        style={{
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderRadius: 5,
          backgroundColor: "#F8F8F8",
          margin: 10,
        }}
      >
        <View>
          <Image
            style={{ width: 70, height: 70 }}
            source={{ uri: item.image }}
          />
        </View>

        <View>
          <Text
            style={{ textAlign: "center", fontSize: 18, fontWeight: "bold" }}
          >
            {item.name}
          </Text>
          <Text style={{ textAlign: "center", fontSize: 15 }}>
            {item.price}$
          </Text>
        </View>

        {/* some bir koşulu sağlayıp ya da sağlamamayı kontrol eder */}

        {cart.some((c) => c.id === item.id) ? (
          
          <Pressable
            style={{
              flexDirection: "row",
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}
          >
            <Pressable
              onPress={() => {
                dispatch(decrementQuantity(item)); // cart
                dispatch(decrementQuantity(item)); // product
              }}
              style={{
                width: 26,
                height: 26,
                borderRadius: 13,
                borderColor: "#BEBEBE",
                backgroundColor: "#E0E0E0",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 25,
                  color: "#088F8F",
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                -
              </Text>
            </Pressable>

            <Pressable>
              <Text
                style={{
                  fontSize: 19,
                  color: "#088F8F",
                  paddingHorizontal: 8,
                  fontWeight: "600",
                }}
              >
                {item.quantity}
              </Text>
            </Pressable>

            <Pressable
              onPress={() => {
                dispatch(incrementQuantity(item)); // cart
                dispatch(incrementQuantity(item)); //product
              }}
              style={{
                width: 26,
                height: 26,
                borderRadius: 13,
                borderColor: "#BEBEBE",
                backgroundColor: "#E0E0E0",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "#088F8F",
                  paddingHorizontal: 6,
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                +
              </Text>
            </Pressable>
            
          </Pressable>
        ) : 
        (

          <Pressable
            style={{
              borderColor: "gray",
              borderWidth: 1.2,
              borderRadius: 5,
              padding: 7,
            }}
            onPress={addItem}
          >
            <Text
              style={{
                color: "green",
                textAlign: "center",
                fontSize: 17,
                fontWeight: "bold",
              }}
            >
              Ekle
            </Text>
          </Pressable>

        )}

      </Pressable>
    </View>
  );
};

export default Dressitem;

const styles = StyleSheet.create({});
