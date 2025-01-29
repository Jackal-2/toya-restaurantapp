import React from "react"
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native"
import { CreditCard, DollarSign, Landmark } from "lucide-react-native"

const PaymentMethodModal = ({ visible, onClose, onSelect }) => {
  const paymentOptions = [
    { type: "Cash", icon: <DollarSign size={24} color="#4CAF50" /> },
    { type: "Credit Card", icon: <CreditCard size={24} color="#2196F3" /> },
    { type: "Debit Card", icon: <Landmark size={24} color="#FF9800" /> },
  ]

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Payment Method</Text>
          {paymentOptions.map((option, index) => (
            <TouchableOpacity key={index} style={styles.modalOption} onPress={() => onSelect(option)}>
              {option.icon}
              <Text style={styles.modalOptionText}>{option.type}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    width: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
  },
  modalOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
  },
  modalOptionText: {
    marginLeft: 15,
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
})

export default PaymentMethodModal

