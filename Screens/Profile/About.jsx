import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

const About = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* App Logo */}
        <Image
          source={require("../../assets/b10.jpg")} // Replace with your app logo path
          style={styles.logo}
        />

        {/* App Description */}
        <Text style={styles.title}>About Us</Text>
        <Text style={styles.description}>
          Welcome to Toya, your ultimate food delivery companion! At Toya,
          we’re on a mission to bring your favorite meals right to your
          doorstep. Whether you're craving fast food, gourmet dishes, or
          healthy options, we’ve got you covered.
        </Text>

        {/* Features Section */}
        <Text style={styles.subtitle}>Why Choose Toya?</Text>
        <View style={styles.features}>
          <View style={styles.featureItem}>
            <Image
              source={require("../../assets/b11.png")} // Replace with feature image path
              style={styles.featureIcon}
            />
            <Text style={styles.featureText}>Lightning-Fast Delivery</Text>
          </View>
          <View style={styles.featureItem}>
            <Image
              source={require("../../assets/b12.png")} // Replace with feature image path
              style={styles.featureIcon}
            />
            <Text style={styles.featureText}>Wide Variety of Cuisines</Text>
          </View>
          <View style={styles.featureItem}>
            <Image
              source={require("../../assets/b13.png")} // Replace with feature image path
              style={styles.featureIcon}
            />
            <Text style={styles.featureText}>Secure Payments</Text>
          </View>
          <View style={styles.featureItem}>
            <Image
              source={require("../../assets/b14.png")} // Replace with feature image path
              style={styles.featureIcon}
            />
            <Text style={styles.featureText}>Reliable Service</Text>
          </View>
        </View>

        {/* Version and Registered Text */}
        <Text style={styles.versionText}>Version 1.0.0</Text>
        <Text style={styles.registeredText}>© 2025 Toya. All rights reserved.</Text>
      </ScrollView>
    </SafeAreaView>
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
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#343a40",
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#6c757d",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 24,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#343a40",
    marginBottom: 10,
    textAlign: "center",
  },
  features: {
    width: "100%",
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  featureIcon: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  featureText: {
    fontSize: 16,
    color: "#495057",
  },
  versionText: {
    fontSize: 14,
    color: "#6c757d",
    textAlign: "center",
    marginTop: 20,
  },
  registeredText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#6c757d",
    textAlign: "center",
    marginTop: 5,
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    marginBottom: 10,
  },
  ctaDescription: {
    fontSize: 16,
    color: "#6c757d",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 24,
  },
  ctaButton: {
    backgroundColor: "#add624",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    width: "80%",
    marginTop: 10,
  },
  ctaButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default About;
