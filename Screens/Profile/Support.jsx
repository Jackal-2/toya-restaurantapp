import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Linking,
  Modal,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Support = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = () => {
    if (!name || !email || !message) {
      setError("All fields are required.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
    }, 2000); // Simulate API delay
  };

  const openFAQ = () => {
    const faqUrl = "https://example.com/faq"; // Replace with actual FAQ URL
    Linking.openURL(faqUrl).catch(() =>
      alert("Unable to open FAQ page. Please try again later.")
    );
  };

  const openLiveChat = () => {
    alert("Opening Live Chat..."); // Simulate live chat functionality
    // Integrate with a live chat SDK or service here
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.header}>
            {/* Back arrow */}
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={30} color="#495057" />
            </TouchableOpacity>
            <Text style={styles.title}>We're Here to Help!</Text>
          </View>
          <Text style={styles.subtitle}>
            Get support for all your needs in just a few clicks.
          </Text>

          {/* Quick Contact Options */}
          <View style={styles.quickContact}>
            <TouchableOpacity style={styles.contactOption} onPress={openFAQ}>
              <Ionicons name="help-circle" size={28} color="#fff" />
              <Text style={styles.contactText}>FAQ</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.contactOption}
              onPress={() => Linking.openURL("tel:+123456789")}
            >
              <Ionicons name="call" size={28} color="#fff" />
              <Text style={styles.contactText}>Call Us</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.contactOption}
              onPress={openLiveChat}
            >
              <Ionicons name="chatbubbles" size={28} color="#fff" />
              <Text style={styles.contactText}>Live Chat</Text>
            </TouchableOpacity>
          </View>

          {/* Support Form */}
          <Text style={styles.formTitle}>Send us a Message</Text>
          <View style={styles.form}>
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TextInput
              placeholder="Your Name"
              value={name}
              onChangeText={setName}
              style={styles.input}
              placeholderTextColor="#aaa"
            />
            <TextInput
              placeholder="Your Email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              keyboardType="email-address"
              placeholderTextColor="#aaa"
            />
            <TextInput
              placeholder="Write your message here"
              value={message}
              onChangeText={setMessage}
              style={[styles.input, styles.textArea]}
              multiline
              placeholderTextColor="#aaa"
            />
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitText}>
                {loading ? "Sending..." : "Submit"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Loading Modal */}
        <Modal transparent visible={loading} animationType="fade">
          <View style={styles.modal}>
            <ActivityIndicator size="large" color="#000" />
            <Text style={styles.modalText}>Submitting...</Text>
          </View>
        </Modal>

        {/* Success Modal */}
        <Modal transparent visible={submitted} animationType="slide">
          <View style={styles.modal}>
            <Text style={styles.successText}>🎉 Message Sent Successfully!</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setSubmitted(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollView: {
    padding: 20,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginTop: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#343a40",
    textAlign: "center",
    flex: 1,
  },
  subtitle: {
    fontSize: 16,
    color: "#6c757d",
    textAlign: "center",
    marginVertical: 10,
  },
  quickContact: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 20,
  },
  contactOption: {
    alignItems: "center",
    backgroundColor: "#495057",
    padding: 15,
    borderRadius: 10,
  },
  contactText: {
    color: "#fff",
    fontSize: 14,
    marginTop: 8,
  },
  formTitle: {
    fontSize: 20,
    color: "#343a40",
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
  form: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ced4da",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    color: "#333",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  submitButton: {
    marginTop: 10,
    backgroundColor: "#add624",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modal: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalText: {
    color: "#fff",
    marginTop: 10,
    fontSize: 16,
  },
  successText: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#add624",
    padding: 10,
    borderRadius: 8,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  error: {
    color: "#ff5252",
    marginBottom: 10,
    fontSize: 14,
  },
});

export default Support;
