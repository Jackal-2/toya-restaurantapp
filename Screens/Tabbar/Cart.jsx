import React from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";

const { width } = Dimensions.get("window");

const Cart = ({ route, navigation }) => {
  const { cartItems } = route.params;

  return (
    <SafeAreaView style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Cart
      </Text>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {cartItems.map((item, index) => (
            <View
              key={index}
              style={{
                width: "48%",
                backgroundColor: "#f9f9f9",
                borderRadius: 10,
                padding: 10,
                marginBottom: 15,
                alignItems: "center",
              }}
            >
              <Image
                source={item.image}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 10,
                  marginBottom: 10,
                }}
              />
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                {item.name}
              </Text>
              <Text style={{ color: "gray", fontSize: 12, marginBottom: 5 }}>
                {item.price}
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: "#add624",
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  borderRadius: 10,
                }}
              >
                <Text style={{ color: "white", fontSize: 14 }}>Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Cart;
