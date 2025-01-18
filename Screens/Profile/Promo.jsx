import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const Promo = () => {
  const [promoCode, setPromoCode] = useState("");
  const [validPromoCodes] = useState(["DISCOUNT10", "FREESHIP", "WELCOME"]);
  const navigation = useNavigation(); // Initialize navigation

  const handleApplyPromoCode = () => {
    if (validPromoCodes.includes(promoCode)) {
      Alert.alert("Success", "Promo code applied successfully!", [
        {
          text: "OK",
          onPress: () => {
            setPromoCode(""); 
            navigation.navigate("Profile"); // Navigate to Profile page
          },
        },
      ]);
    } else {
      Alert.alert("Error", "Invalid promo code. Please try again.", [
        { text: "OK", onPress: () => setPromoCode("") },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Apply Promo Code</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter promo code"
        value={promoCode}
        onChangeText={(text) => setPromoCode(text)}
      />

      <TouchableOpacity style={styles.applyButton} onPress={handleApplyPromoCode}>
        <Text style={styles.buttonText}>Apply</Text>
      </TouchableOpacity>

      <Text style={styles.description}>
        Enter a valid promo code to receive discounts on your next purchase.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#343a40",
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 16,
  },
  applyButton: {
    backgroundColor: "#add624",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    width: "80%",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#6c757d",
    marginTop: 20,
    textAlign: "center",
  },
});

export default Promo;
