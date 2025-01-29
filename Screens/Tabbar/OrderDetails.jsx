import React, { useContext } from "react"
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from "react-native"
import { CartContext } from "./CartContext"
import { ShoppingBag, Truck, CreditCard, MapPin, Clock, MessageSquare } from "lucide-react-native"

const OrderDetails = ({ route, navigation }) => {
  const { cartItems, calculateTotal } = useContext(CartContext)

  // Safely access route params with a default empty object
  const { specialInstructions = "" } = route?.params || {}

  const subtotal = calculateTotal()
  const deliveryFee = 5.0
  const total = subtotal + deliveryFee

  // Mock order details
  const orderNumber = "#FD-2023-06-15-001"
  const orderDate = new Date().toLocaleDateString()
  const estimatedDeliveryTime = "30-45 minutes"

  const renderOrderItem = (item) => (
    <View key={item.id} style={styles.orderItem}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemQuantity}>Qty: {item.quantity}</Text>
      </View>
      <Text style={styles.itemPrice}>
        GHC {(Number.parseFloat(item.price.replace("$", "")) * item.quantity).toFixed(2)}
      </Text>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Order Summary</Text>

        <View style={styles.orderInfo}>
          <Text style={styles.orderNumber}>{orderNumber}</Text>
          <Text style={styles.orderDate}>Order Date: {orderDate}</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <ShoppingBag color="#aad624" size={24} />
            <Text style={styles.sectionTitle}>Your Order</Text>
          </View>
          {cartItems.map(renderOrderItem)}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MessageSquare color="#aad624" size={24} />
            <Text style={styles.sectionTitle}>Special Instructions</Text>
          </View>
          <Text style={styles.specialInstructions}>{specialInstructions || "No special instructions provided."}</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <CreditCard color="#aad624" size={24} />
            <Text style={styles.sectionTitle}>Payment Summary</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text>Subtotal</Text>
            <Text>GHC {subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text>Delivery Fee</Text>
            <Text>GHC {deliveryFee.toFixed(2)}</Text>
          </View>
          <View style={[styles.summaryItem, styles.totalItem]}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalAmount}>GHC {total.toFixed(2)}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            // Handle order tracking
            console.log("Tracking order")
          }}
        >
          <Text style={styles.buttonText}>Return</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000",
  },
  orderInfo: {
    marginBottom: 20,
  },
  orderNumber: {
    fontSize: 18,
    fontWeight: "600",
    color: "gray",
  },
  orderDate: {
    fontSize: 14,
    color: "#8E8E93",
    marginTop: 5,
  },
  section: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 10,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: "500",
  },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "500",
  },
  itemQuantity: {
    fontSize: 14,
    color: "#8E8E93",
    marginTop: 5,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "600",
  },
  deliveryInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  deliveryText: {
    fontSize: 14,
    marginLeft: 10,
  },
  specialInstructions: {
    fontSize: 14,
    fontStyle: "italic",
  },
  summaryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  totalItem: {
    borderTopWidth: 1,
    borderTopColor: "#E5E5EA",
    paddingTop: 10,
    marginTop: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  button: {
    backgroundColor: "#aad624",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
})

export default OrderDetails

