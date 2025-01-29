import React, { useContext, useState, useCallback, useMemo } from "react"
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  TextInput,
  Modal,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { CartContext } from "./CartContext"
import { useNavigation } from "@react-navigation/native"
import { ShoppingCart, Minus, Plus, X, CreditCard, DollarSign, Smartphone, MessageSquare } from "lucide-react-native"
import TabBar from "../../components/Tabbar"

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, calculateTotal } = useContext(CartContext)
  const [promoCode, setPromoCode] = useState("")
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("Cash")
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [specialInstructions, setSpecialInstructions] = useState("")
  const navigation = useNavigation()

  const handleIncreaseQuantity = useCallback(
    (item) => {
      updateQuantity(item.id, item.quantity + 1)
    },
    [updateQuantity],
  )

  const handleDecreaseQuantity = useCallback(
    (item) => {
      if (item.quantity === 1) {
        removeFromCart(item.id)
      } else {
        updateQuantity(item.id, item.quantity - 1)
      }
    },
    [removeFromCart, updateQuantity],
  )

  const calculateItemTotal = useCallback((item) => {
    const price = Number.parseFloat(item.price.replace("$", ""))
    return (price * item.quantity).toFixed(2)
  }, [])

  const subtotal = useMemo(() => calculateTotal(), [calculateTotal])
  const deliveryCost = 20.0

  const handlePromoCode = useCallback(() => {
    if (promoCode.toLowerCase() === "discount10") {
      return 0.1 * subtotal
    }
    return 0
  }, [promoCode, subtotal])

  const discountAmount = handlePromoCode()
  const totalWithDiscount = subtotal - discountAmount + deliveryCost

  const renderItem = useCallback(
    ({ item }) => (
      <View style={styles.cartItem}>
        <Image source={item.image} style={styles.itemImage} />
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemTotal}>{`GHC ${calculateItemTotal(item)}`}</Text>
          <View style={styles.quantityControl}>
            <TouchableOpacity onPress={() => handleDecreaseQuantity(item)} style={styles.quantityButton}>
              <Minus size={16} color="#000" />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{item.quantity}</Text>
            <TouchableOpacity onPress={() => handleIncreaseQuantity(item)} style={styles.quantityButton}>
              <Plus size={16} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.removeButton}>
          <X size={20} color="#FF3B30" />
        </TouchableOpacity>
      </View>
    ),
    [handleDecreaseQuantity, handleIncreaseQuantity, removeFromCart, calculateItemTotal],
  )

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.keyboardAvoidingView}>
        <View style={styles.content}>
          <Text style={styles.title}>Cart</Text>

          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            ListEmptyComponent={<Text style={styles.emptyCart}>Your cart is empty</Text>}
            contentContainerStyle={styles.listContent}
          />


          <View style={styles.promoCodeContainer}>
            <TextInput
              value={promoCode}
              onChangeText={setPromoCode}
              placeholder="Enter Promo Code"
              style={styles.promoCodeInput}
            />
            <TouchableOpacity style={styles.applyButton}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => setIsModalVisible(true)} style={styles.paymentMethodButton}>
            <Text style={styles.paymentMethodButtonText}>{selectedPaymentMethod || "Select Payment Method"}</Text>
          </TouchableOpacity>

          <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={() => setIsModalVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Choose Payment Method</Text>
                {[
                  { method: "Cash", icon: <DollarSign size={24} color="#007AFF" /> },
                  { method: "Credit/Debit Card", icon: <CreditCard size={24} color="#007AFF" /> },
                  { method: "Mobile Money", icon: <Smartphone size={24} color="#007AFF" /> },
                ].map((option) => (
                  <TouchableOpacity
                    key={option.method}
                    onPress={() => {
                      setSelectedPaymentMethod(option.method)
                      setIsModalVisible(false)
                    }}
                    style={styles.paymentOption}
                  >
                    {option.icon}
                    <Text style={styles.paymentOptionText}>{option.method}</Text>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity onPress={() => setIsModalVisible(false)} style={styles.closeModalButton}>
                  <Text style={styles.closeModalButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <View style={styles.totalContainer}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Subtotal:</Text>
              <Text style={styles.totalValue}>{`GHC ${subtotal.toFixed(2)}`}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Delivery:</Text>
              <Text style={styles.totalValue}>{`GHC ${deliveryCost.toFixed(2)}`}</Text>
            </View>
            {discountAmount > 0 && (
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Discount:</Text>
                <Text style={[styles.totalValue, styles.discountText]}>{`- GHC ${discountAmount.toFixed(2)}`}</Text>
              </View>
            )}
            <View style={[styles.totalRow, styles.finalTotal]}>
              <Text style={[styles.totalLabel, styles.finalTotalLabel]}>Total:</Text>
              <Text style={[styles.totalValue, styles.finalTotalValue]}>{`GHC ${totalWithDiscount.toFixed(2)}`}</Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Delivery", {
                cartItems: cartItems,
                totalWithDiscount,
                selectedPaymentMethod,
                specialInstructions,
              })
            }
            style={styles.checkoutButton}
          >
            <ShoppingCart size={24} color="#FFF" />
            <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      <TabBar navigation={navigation} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F7",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000",
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  cartItem: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 15,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  itemTotal: {
    fontSize: 14,
    color: "black",
    marginBottom: 8,
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    backgroundColor: "#E5E5EA",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  removeButton: {
    padding: 5,
  },
  emptyCart: {
    textAlign: "center",
    fontSize: 18,
    color: "#8E8E93",
    marginTop: 20,
  },
  instructionsContainer: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  instructionSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  instructionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },
  instructionInput: {
    borderWidth: 1,
    borderColor: "#E5E5EA",
    borderRadius: 8,
    padding: 10,
    minHeight: 80,
    textAlignVertical: "top",
  },
  promoCodeContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  promoCodeInput: {
    flex: 1,
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginRight: 10,
  },
  applyButton: {
    backgroundColor: "#add624",
    borderRadius: 8,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  applyButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  paymentMethodButton: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
  },
  paymentMethodButtonText: {
    fontSize: 16,
    color: "#007AFF",
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
  },
  paymentOptionText: {
    fontSize: 18,
    marginLeft: 15,
  },
  closeModalButton: {
    marginTop: 20,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    padding: 15,
    alignItems: "center",
  },
  closeModalButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
  },
  totalContainer: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  totalLabel: {
    fontSize: 16,
    color: "#8E8E93",
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "600",
  },
  discountText: {
    color: "#34C759",
  },
  finalTotal: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#E5E5EA",
    paddingTop: 10,
  },
  finalTotalLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  finalTotalValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  checkoutButton: {
    backgroundColor: "#add624",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    marginBottom: 60
  },
  checkoutButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
})

export default Cart

