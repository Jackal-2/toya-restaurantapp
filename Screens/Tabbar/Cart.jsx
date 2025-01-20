import React, { useContext, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, TextInput, Modal, Button } from 'react-native';
import { CartContext } from './CartContext';
import { useNavigation } from "@react-navigation/native";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
  const [promoCode, setPromoCode] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Cash');
  const [isPaymentOptionsVisible, setIsPaymentOptionsVisible] = useState(false);  // State to toggle payment options visibility
  const [isModalVisible, setIsModalVisible] = useState(false);  // Modal visibility
  const navigation = useNavigation();

  const handleIncreaseQuantity = (item) => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecreaseQuantity = (item) => {
    if (item.quantity === 1) {
      removeFromCart(item.id);  // Remove item if quantity is 1
    } else {
      updateQuantity(item.id, item.quantity - 1);  // Decrease quantity if greater than 1
    }
  };

  // Calculate total price for all items in the cart
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price); // Ensure price is a number
      const quantity = parseInt(item.quantity, 10); // Ensure quantity is an integer
      if (!isNaN(price) && !isNaN(quantity)) {
        return total + (price * quantity);
      }
      return total; // If invalid, don't add to the total
    }, 0);
  };

  const total = calculateTotal();
  
  // Define delivery cost
  const deliveryCost = 20.00; // Flat rate delivery cost
  const promoDiscount = 0; // Default promo code discount
  
  // Handle Promo Code
  const handlePromoCode = () => {
    if (promoCode.toLowerCase() === 'discount10') {
      return 0.1 * total; // 10% discount for promo code
    }
    return 0;
  };

  const discountAmount = handlePromoCode();
  const totalWithDiscount = total - discountAmount + deliveryCost;

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", paddingTop: 50 }}>Cart</Text>
      
      {/* Promo Code Section */}
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 16 }}>Promo Code</Text>
        <TextInput
          value={promoCode}
          onChangeText={setPromoCode}
          placeholder="Enter Promo Code"
          style={{
            borderWidth: 1,
            borderColor: '#ddd',
            padding: 10,
            borderRadius: 5,
            marginTop: 10,
          }}
        />
      </View>

      {/* Payment Method Button to Show Modal */}
      <View style={{ marginTop: 20 }}>
        <TouchableOpacity
          onPress={() => setIsModalVisible(true)}  // Open modal to choose payment method
          style={{
            backgroundColor: '#add624',
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 5,
            marginTop: 10,
          }}
        >
          <Text style={{ color: 'white', fontSize: 16 }}>Select Payment Method</Text>
        </TouchableOpacity>

        {/* Modal for payment options */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 20 }}>Choose Payment Method</Text>

              <TouchableOpacity
                onPress={() => {
                  setSelectedPaymentMethod('Cash');
                  setIsModalVisible(false);
                }}
                style={{ marginBottom: 10 }}
              >
                <Text style={{ fontSize: 16 }}>Cash</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={() => {
                  setSelectedPaymentMethod('Credit/Debit Card');
                  setIsModalVisible(false);
                }}
                style={{ marginBottom: 10 }}
              >
                <Text style={{ fontSize: 16 }}>Credit/Debit Card</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setSelectedPaymentMethod('Mobile Money');
                  setIsModalVisible(false);
                }}
                style={{ marginBottom: 10 }}
              >
                <Text style={{ fontSize: 16 }}>Mobile Money</Text>
              </TouchableOpacity>

              <Button title="Close" onPress={() => setIsModalVisible(false)} />
            </View>
          </View>
        </Modal>
      </View>

      {/* Display Selected Payment Method */}
      {selectedPaymentMethod && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 16 }}>{selectedPaymentMethod}</Text>
        </View>
      )}

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const price = parseFloat(item.price); // Ensure price is a number
          const quantity = parseInt(item.quantity, 10); // Ensure quantity is an integer
          const itemTotal = !isNaN(price) && !isNaN(quantity) ? (price * quantity) : 0;

          return (
            <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 10 }}>
              <Image source={item.image} style={{ width: 50, height: 50, borderRadius: 10 }} />

              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text>{item.name}</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TouchableOpacity onPress={() => handleDecreaseQuantity(item)} style={{ backgroundColor: "#ddd", padding: 5, borderRadius: 5 }}>
                    <Text>-</Text>
                  </TouchableOpacity>
                  <Text style={{ marginHorizontal: 10 }}>{item.quantity}</Text>
                  <TouchableOpacity onPress={() => handleIncreaseQuantity(item)} style={{ backgroundColor: "#ddd", padding: 5, borderRadius: 5 }}>
                    <Text>+</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <Text>{`GHC ${(itemTotal).toFixed(2)}`}</Text>
            </View>
          );
        }}
      />
      
      {/* Total Breakdown */}
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
        <Text style={{ fontSize: 18 }}>Item Total:</Text>
        <Text style={{ fontSize: 18 }}>{`GHC ${total.toFixed(2)}`}</Text>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
        <Text style={{ fontSize: 18 }}>Delivery Cost:</Text>
        <Text style={{ fontSize: 18 }}>{`GHC ${deliveryCost.toFixed(2)}`}</Text>
      </View>

      {discountAmount > 0 && (
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
          <Text style={{ fontSize: 18 }}>Promo Discount:</Text>
          <Text style={{ fontSize: 18, color: 'green' }}>{`- GHC ${discountAmount.toFixed(2)}`}</Text>
        </View>
      )}

      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Total:</Text>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          {totalWithDiscount && !isNaN(totalWithDiscount) ? `GHC ${totalWithDiscount.toFixed(2)}` : 'GHC 0.00'}
        </Text>
      </View>

      {/* Proceed to Checkout */}
      <TouchableOpacity
        onPress={() => navigation.navigate("Delivery", { cartItems: cartItems, totalWithDiscount, selectedPaymentMethod })}
        style={{
          backgroundColor: "#add624",
          paddingVertical: 12,
          paddingHorizontal: 20,
          borderRadius: 20,
          marginTop: 20,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>Proceed to Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Cart;
