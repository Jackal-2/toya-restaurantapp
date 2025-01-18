import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Keyboard } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const Phone = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [phoneNumber, setPhoneNumber] = useState(route.params?.phone || ""); // Get the existing phone number from route params

  // Validate phone number (should be 10 digits)
  const isValidPhoneNumber = (number) => {
    const regex = /^[0-9]{10}$/; // Ensures it's a 10-digit number
    return regex.test(number);
  };

  // Handle save phone number
  const handleSavePhoneNumber = () => {
    if (!phoneNumber) {
      Alert.alert("Error", "Please enter a phone number.");
      return;
    }

    if (!isValidPhoneNumber(phoneNumber)) {
      Alert.alert("Error", "Please enter a valid phone number (10 digits).");
      return;
    }

    // If phone number is valid, display success message and navigate back
    Alert.alert("Success", "Your phone number has been updated.");
    Keyboard.dismiss(); // Dismiss keyboard

    // Navigate back to Profile with updated phone number
    navigation.navigate("Profile", { updatedPhone: phoneNumber });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change Phone Number</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your new phone number"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSavePhoneNumber}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>

      <Text style={styles.description}>
        Please enter a valid 10-digit phone number. This will update your account.
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
  saveButton: {
    backgroundColor: "#28a745",
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

export default Phone;
