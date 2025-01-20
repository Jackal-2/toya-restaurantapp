import React from "react";
import { View, Text, FlatList, TouchableOpacity, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const OrderSummary = ({ route }) => {
  const { cartItems } = route.params; // Get cartItems passed from Cart screen
  const navigation = useNavigation();

  // Calculate total price for all items in the cart
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price);
      const quantity = parseInt(item.quantity, 10);
      if (!isNaN(price) && !isNaN(quantity)) {
        return total + price * quantity;
      }
      return total;
    }, 0);
  };

  const total = calculateTotal();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", paddingTop: 50 }}>Order Summary</Text>

      {/* Order Summary List */}
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const price = parseFloat(item.price);
          const quantity = parseInt(item.quantity, 10);
          const itemTotal = price * quantity;
          return (
            <View style={{ flexDirection: "row", marginVertical: 10, borderBottomWidth: 1, paddingBottom: 10 }}>
              <View style={{ flex: 1 }}>
                <Text>{item.name}</Text>
                <Text>Quantity: {item.quantity}</Text>
              </View>
              <Text style={{ fontWeight: "bold" }}>{`GHC ${itemTotal.toFixed(2)}`}</Text>
            </View>
          );
        }}
      />

      {/* Total Price */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Total:</Text>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          {total ? `GHC ${total.toFixed(2)}` : "GHC 0.00"}
        </Text>
      </View>

      {/* Proceed to Payment Button */}
      <TouchableOpacity
        onPress={() => navigation.navigate("Payment")} // Navigate to payment page (can be added later)
        style={{
          backgroundColor: "#add624",
          paddingVertical: 12,
          paddingHorizontal: 20,
          borderRadius: 20,
          marginTop: 20,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>Proceed to Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrderSummary;
