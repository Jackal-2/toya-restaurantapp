import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";

const Privacy = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* Page Title */}
        <Text style={styles.title}>Privacy Policy</Text>

        {/* Last Updated Section */}
        <Text style={styles.updatedText}>Last updated: January 17, 2025</Text>

        {/* Privacy Policy Content */}
        <Text style={styles.sectionTitle}>1. Introduction</Text>
        <Text style={styles.sectionText}>
          Welcome to Toya. This Privacy Policy explains how we collect, use, and
          protect your information when you use our services. Your privacy is
          of utmost importance to us.
        </Text>

        <Text style={styles.sectionTitle}>2. Information We Collect</Text>
        <Text style={styles.sectionText}>
          We collect the following types of information:
          {"\n"}- Personal Information: Name, email address, phone number, etc.
          {"\n"}- Usage Data: Details of your interactions with our app.
          {"\n"}- Location Data: If you enable location services.
        </Text>

        <Text style={styles.sectionTitle}>
          3. How We Use Your Information
        </Text>
        <Text style={styles.sectionText}>
          We use your information to:
          {"\n"}- Provide and improve our services.
          {"\n"}- Process payments and orders.
          {"\n"}- Send important notifications and updates.
        </Text>

        <Text style={styles.sectionTitle}>4. Data Sharing</Text>
        <Text style={styles.sectionText}>
          We do not sell your personal information. However, we may share your
          data with trusted partners to provide certain services, such as
          payment processing and delivery.
        </Text>

        <Text style={styles.sectionTitle}>5. Security</Text>
        <Text style={styles.sectionText}>
          We take reasonable measures to protect your information from
          unauthorized access or disclosure. However, no system is completely
          secure, and we cannot guarantee the security of your data.
        </Text>

        <Text style={styles.sectionTitle}>6. Your Rights</Text>
        <Text style={styles.sectionText}>
          You have the right to:
          {"\n"}- Access the information we have about you.
          {"\n"}- Request corrections to your data.
          {"\n"}- Delete your account and associated data.
        </Text>

        <Text style={styles.sectionTitle}>7. Contact Us</Text>
        <Text style={styles.sectionText}>
          If you have any questions about this Privacy Policy, please contact
          us at:
          {"\n"}Email: support@toya.com
        </Text>

        {/* Footer */}
        <Text style={styles.footerText}>© 2025 Toya. All rights reserved.</Text>
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
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#343a40",
    textAlign: "center",
    marginBottom: 20,
  },
  updatedText: {
    fontSize: 14,
    color: "#6c757d",
    textAlign: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#343a40",
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    color: "#6c757d",
    marginBottom: 20,
    lineHeight: 24,
  },
  footerText: {
    fontSize: 14,
    color: "#6c757d",
    textAlign: "center",
    marginTop: 20,
  },
});

export default Privacy;
