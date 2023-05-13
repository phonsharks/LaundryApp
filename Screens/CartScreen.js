import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { incrementQuantity } from "../CartReducer";
import { decrementQuantity } from "../productReducer";

//item fonksiyın içine alacağım deneyeceğim
const CartScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const total = cart
    .map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);

    const pay=()=>{
      navigation.navigate("Order")
    }

  return (
    <>
      <ScrollView style={{ paddingTop: 10 }}>

        {total === 0 ? 
        (
          null
        ) : 
        (

          <>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingTop: 20,
                justifyContent: "space-between",
                paddingHorizontal: 20,
              }}
            >
              <AntDesign
                onPress={() => {
                  navigation.goBack();
                }}
                name="arrowleft"
                size={26}
                color="blue"
              />
              <Text>Senin sepetin</Text>
            </View>

            <Pressable
              style={{
                margin: 10,
                borderRadius: 17,
                backgroundColor: "#E5E4E5",
                padding: 10,
              }}
            >
              {cart.map((item, index) => (
                <View
                
                  key={index}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: 20,
                    padding: 10,
                  }}
                >
                  <Text style={{ width: 100, fontSize: 16, fontWeight: "500" }}>
                    {item.name}
                  </Text>

                  {/* - + button */}
                  <Pressable
                    style={{
                      flexDirection: "row",
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      alignItems: "center",
                      borderColor: "#BEBEBE",
                      borderWidth: 0.5,
                      borderRadius: 10,
                    }}
                  >

                    {/* - button */}

                    <Pressable
                      onPress={() => {
                        dispatch(decrementQuantity(item)); // cart
                        dispatch(decrementQuantity(item)); // product
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 20,
                          color: "#088F8F",
                          paddingHorizontal: 6,
                          fontWeight: "600",
                        }}
                      >
                        -
                      </Text>
                    </Pressable>

                    {/* Veri */}
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

                    {/* + button */}
                    <Pressable
                      onPress={() => {
                        dispatch(incrementQuantity(item)); // cart
                        dispatch(incrementQuantity(item)); //product
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 20,
                          color: "#088F8F",
                          paddingHorizontal: 6,
                          fontWeight: "600",
                        }}
                      >
                        +
                      </Text>
                    </Pressable>

                  </Pressable>

                  <Text style={{ fontSize: 16, fontWeight: "500" }}>
                    ${item.price * item.quantity}
                  </Text>

                </View>
              ))}

            </Pressable>

            <View style={{ marginHorizontal: 10 }}>

              <Text style={{ fontSize: 26, fontWeight: "bold", marginTop: 30,textAlign:"center" }}>
              Fatura Bilgileri
              </Text>

              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 7,
                  padding: 10,
                  marginTop: 15,
                }}
              >
                
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: "400", color: "gray" }}
                  >
                    Toplam Tutar
                  </Text>

                  <Text style={{ fontSize: 18, fontWeight: "400" }}>
                    {total} $
                  </Text>

                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 8,
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: "400", color: "gray" }}
                  >
                    Teslim Ücreti | 1.2KM
                  </Text>

                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "400",
                      color: "#088F8F",
                    }}
                  >
                    FREE
                  </Text>

                </View>
                
                {/* Alt alta iki adet alt çizgi oluşumu */}
                <View
                  style={{
                    borderColor: "gray",
                    height: 1,
                    borderWidth: 0.5,
                    marginTop: 20,
                  }}
                />

                <View
                  style={{
                    borderColor: "gray",
                    height: 1,
                    borderWidth: 0.5,
                    marginTop: 10,
                  }}
                />

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 8,
                  }}
                >
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    Ödeme yapmak İçin
                  </Text>

                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    {total + 10} $
                  </Text>

                </View>

              </View>

            </View>
          </>
          
        )}

      </ScrollView>

      {total == 0 ? null : (
        
        <Pressable
          style={{
            backgroundColor: "#088F8F",
            padding: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            margin: 15,
            borderRadius: 10,
          }}
        >
          <View>
            <Text style={{color:"white",fontWeight:"bold"}}>{cart.length} adet seçilen var</Text>
          </View>

          <Pressable onPress={pay}>
            <Text style={{fontWeight:"bold"}}>Ödeme Yap Ve işi Bitir :D</Text>
          </Pressable>

        </Pressable>
      )}

    </>
  );
};

export default CartScreen;

const styles = StyleSheet.create({});
