import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, StyleSheet } from 'react-native';
import { Ionicons, AntDesign, MaterialCommunityIcons, Feather, FontAwesome } from '@expo/vector-icons';
import TabBar from "../../components/Tabbar"; 
import { useNavigation } from "@react-navigation/native";

const Profile = () => {
  const user = {
    name: "John Doe",
    phone: "+1234567890",
    balance: "$120.50",
    email: "john@example.com"
  };

  const navigation = useNavigation();

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
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#444' }}>Profile</Text>
      </View>

      <TouchableOpacity style={{marginBottom:10}}>
      <View
        style={{
          marginTop: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          
        }}
      >
        <MaterialCommunityIcons name="account-outline" size={25} color="black" />
        <View style={{ flexDirection: "row", flex: 1, paddingLeft: 10, justifyContent: "space-between",}}>
          <Text style={{ fontSize: 16, color: "black" }}>{user.name}</Text>
        </View>
        
      </View>
      </TouchableOpacity>

      <TouchableOpacity style={{marginBottom:10}} onPress={() => navigation.navigate("Phone")}>
      <View
        style={{
          marginTop: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          
        }}
      >
        <Feather name="smartphone" size={21} color="black" />
        <View style={{ flexDirection: "row", flex: 1, paddingLeft: 10, justifyContent: "space-between",}}>
          <Text style={{ fontSize: 16, color: "black" }}>{user.phone}</Text>
          <Text style={{ fontSize: 15, color: 'green' }}>Edit &gt;</Text>

        </View>
        
      </View>

      </TouchableOpacity>

      <TouchableOpacity style={{marginBottom:40}}>

      <View
        style={{
          marginTop: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          
        }}
      >
        <MaterialCommunityIcons name="email-check-outline" size={25} color="black" />
        <View style={{ flexDirection: "row", flex: 1, paddingLeft: 10, justifyContent: "space-between",}}>
          <Text style={{ fontSize: 16, color: "black" }}>{user.email}</Text>
          <Text style={{ fontSize: 15, color: 'green' }}>Edit &gt;</Text>
    
        </View>
        
      </View>
      </TouchableOpacity>


      <View style={{ justifyContent: "space-between", flexDirection: "row", marginBottom: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#444' }}>Other</Text>
      </View>

      <TouchableOpacity style={{marginBottom:10}} onPress={() => navigation.navigate("Promo")}>
      <View
        style={{
          marginTop: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          
        }}
      >
        <Ionicons name="ticket-outline" size={25} color="black" />
        <View style={{ flexDirection: "row", flex: 1, paddingLeft: 10, justifyContent: "space-between",}}>
          <Text style={{ fontSize: 16, color: "black" }}>Promo Codes</Text>
        </View>
        
      </View>
      </TouchableOpacity>

      <TouchableOpacity style={{marginBottom:10}} onPress={() => navigation.navigate("Account")}>
      <View
        style={{
          marginTop: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          
        }}
      >
        <AntDesign name="setting" size={21} color="black" />
        <View style={{ flexDirection: "row", flex: 1, paddingLeft: 10, justifyContent: "space-between",}}>
          <Text style={{ fontSize: 16, color: "black" }}>Account Settings</Text>

        </View>
        
      </View>

      </TouchableOpacity>

      <TouchableOpacity style={{marginBottom:10}} onPress={() => navigation.navigate("Privacy")}>

      <View
        style={{
          marginTop: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          
        }}
      >
        <FontAwesome name="hand-stop-o" size={25} color="black" />
        <View style={{ flexDirection: "row", flex: 1, paddingLeft: 10, justifyContent: "space-between",}}>
          <Text style={{ fontSize: 16, color: "black" }}>Privacy</Text>
    
        </View>
        
      </View>
      </TouchableOpacity>

      <TouchableOpacity style={{marginBottom:10}} onPress={() => navigation.navigate("About")}>

<View
  style={{
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    
  }}
>
  <Ionicons name="information-circle-outline" size={25} color="black" />
  <View style={{ flexDirection: "row", flex: 1, paddingLeft: 10, justifyContent: "space-between",}}>
    <Text style={{ fontSize: 16, color: "black" }}>About</Text>

  </View>
  
</View>
</TouchableOpacity>

<TouchableOpacity style={{marginBottom:10}} onPress={() => navigation.navigate("Support")}>

<View
  style={{
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    
  }}
>
  <Feather name="help-circle" size={25} color="black" />
  <View style={{ flexDirection: "row", flex: 1, paddingLeft: 10, justifyContent: "space-between",}}>
    <Text style={{ fontSize: 16, color: "black" }}>Support</Text>

  </View>
  
</View>
</TouchableOpacity>

      </ScrollView>

      {/* TabBar at the Bottom */}
      <TabBar navigation={navigation} style={styles.tabBar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 70, // Ensure content does not overlap with TabBar
  },
  greetingContainer: {
    paddingVertical: 20,
    marginTop: 50,
    marginBottom: 20,
  },
  greetingText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  sectionHeader: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#444',
  },
  editText: {
    fontSize: 15,
    color: '#444',
  },
  paymentContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  paymentDetails: {
    flexDirection: "column",
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '80%',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
  },
});

export default Profile;
