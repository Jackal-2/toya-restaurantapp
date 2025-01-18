import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Modal, StyleSheet } from "react-native";
import { Ionicons, AntDesign, MaterialCommunityIcons, Feather, FontAwesome } from "@expo/vector-icons";
import TabBar from "../../components/Tabbar";
import { useNavigation, useRoute } from "@react-navigation/native";

const Profile = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [user, setUser] = useState({
    name: "John Doe",
    phone: "+1234567890",
    balance: "$120.50",
    email: "john@example.com",
  });

  const [paymentMethod, setPaymentMethod] = useState({
    type: "Cash",
    icon: <Ionicons name="cash-outline" size={20} color="green" />,
  });
  const [isModalVisible, setModalVisible] = useState(false);

  const paymentOptions = [
    {
      type: "Cash",
      icon: <Ionicons name="cash-outline" size={20} color="green" />,
    },
    {
      type: "Credit Card",
      icon: <MaterialCommunityIcons name="credit-card-outline" size={20} color="blue" />,
    },
    {
      type: "Debit Card",
      icon: <MaterialCommunityIcons name="bank-outline" size={20} color="orange" />,
    },
  ];

  const changePaymentMethod = (method) => {
    setPaymentMethod(method);
    setModalVisible(false);
  };

  // Handle updates to user data from navigation params
  useEffect(() => {
    if (route.params?.updatedPhone) {
      setUser((prevUser) => ({
        ...prevUser,
        phone: route.params.updatedPhone,
      }));
    }
    if (route.params?.updatedEmail) {
      setUser((prevUser) => ({
        ...prevUser,
        email: route.params.updatedEmail,
      }));
    }
  }, [route.params?.updatedPhone, route.params?.updatedEmail]);

  return (
    <View style={styles.container}>
      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Greeting Section */}
        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>Hello, {user.name.split(" ")[0]}!</Text>
        </View>

        {/* Payments Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Payments</Text>
          <TouchableOpacity>
            <Text style={styles.editText}>Edit &gt;</Text>
          </TouchableOpacity>
        </View>

        {/* Payment Methods */}
        <View style={styles.paymentContainer}>
          {paymentMethod.icon}
          <View style={styles.paymentDetails}>
            <Text style={styles.paymentText}>{paymentMethod.type}</Text>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text style={styles.changeText}>Change</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Toya Balance */}
        <View style={styles.balanceContainer}>
          <AntDesign name="wallet" size={20} color="black" />
          <View style={styles.balanceDetails}>
            <Text style={styles.balanceText}>Toya Balance</Text>
            <Text style={styles.balanceText}>{user.balance}</Text>
          </View>
        </View>

        {/* Modal for Payment Method Selection */}
        <Modal visible={isModalVisible} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Payment Method</Text>
              {paymentOptions.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.modalOption}
                  onPress={() => changePaymentMethod(option)}
                >
                  {option.icon}
                  <Text style={styles.modalOptionText}>{option.type}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Profile Sections */}
        <View style={{ justifyContent: "space-between", flexDirection: "row", marginBottom: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#444" }}>Profile</Text>
        </View>

        {/* Name */}
        <View style={styles.profileItemContainer}>
          <View style={styles.profileItem}>
            <MaterialCommunityIcons name="account-outline" size={25} color="black" />
            <View style={styles.profileDetails}>
              <Text style={styles.profileText}>{user.name}</Text>
            </View>
          </View>
        </View>

        {/* Phone */}
        <TouchableOpacity
          style={styles.profileItemContainer}
          onPress={() => navigation.navigate("Phone", { phone: user.phone })}
        >
          <View style={styles.profileItem}>
            <Feather name="smartphone" size={21} color="black" />
            <View style={styles.profileDetails}>
              <Text style={styles.profileText}>{user.phone}</Text>
              <Text style={styles.editText}>Edit &gt;</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Email */}
        <TouchableOpacity
          style={styles.profileItemContainer}
          onPress={() => navigation.navigate("Email", { email: user.email })}
        >
          <View style={styles.profileItem}>
            <MaterialCommunityIcons name="email-check-outline" size={25} color="black" />
            <View style={styles.profileDetails}>
              <Text style={styles.profileText}>{user.email}</Text>
              <Text style={styles.editText}>Edit &gt;</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Other Sections */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Other</Text>
        </View>

        {/* Other Navigation Options */}
        {[
          { icon: <Ionicons name="ticket-outline" size={25} color="black" />, text: "Promo Codes", route: "Promo" },
          { icon: <AntDesign name="setting" size={21} color="black" />, text: "Account Settings", route: "Account" },
          { icon: <FontAwesome name="hand-stop-o" size={25} color="black" />, text: "Privacy", route: "Privacy" },
          { icon: <Ionicons name="information-circle-outline" size={25} color="black" />, text: "About", route: "About" },
          { icon: <Feather name="help-circle" size={25} color="black" />, text: "Support", route: "Support" },
        ].map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.profileItemContainer}
            onPress={() => navigation.navigate(item.route)}
          >
            <View style={styles.profileItem}>
              {item.icon}
              <View style={styles.profileDetails}>
                <Text style={styles.profileText}>{item.text}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* TabBar at the Bottom */}
      <TabBar navigation={navigation} style={styles.tabBar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 70,
  },
  greetingContainer: {
    paddingVertical: 20,
    marginTop: 50,
    marginBottom: 20,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#444",
  },
  editText: {
    fontSize: 15,
    color: "green",
  },
  paymentContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  paymentDetails: {
    flex: 1,
    paddingLeft: 10,
  },
  paymentText: {
    fontSize: 16,
    color: "black",
  },
  changeText: {
    fontSize: 14,
    color: "green",
  },
  balanceContainer: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  balanceDetails: {
    flexDirection: "row",
    flex: 1,
    paddingLeft: 10,
    justifyContent: "space-between",
  },
  balanceText: {
    fontSize: 16,
    color: "black",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    width: "80%",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  profileItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileItemContainer: {
    marginBottom: 20,
  },
  profileDetails: {
    flex: 1,
    paddingLeft: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  profileText: {
    fontSize: 18,
    color: "black",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalOption: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  modalOptionText: {
    fontSize: 16,
    marginLeft: 10,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#ccc",
  },
  closeButtonText: {
    fontSize: 16,
  },
  tabBar: {
    position: "absolute",
    bottom: 0,
  },
});

export default Profile
