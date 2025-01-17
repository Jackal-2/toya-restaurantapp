import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, AntDesign, MaterialCommunityIcons, Feather, MaterialIcons, FontAwesome } from '@expo/vector-icons';

const Profile = () => {
  const user = {
    name: "John Doe",
    phone: "+1234567890",
    addresses: ["123 Main Street, NY", "456 Elm Street, SF"],
    recentOrders: [
      { id: '1', restaurant: 'Pizza Hut', date: '2025-01-12', total: '$25.00' },
      { id: '2', restaurant: 'Sushi Place', date: '2025-01-10', total: '$40.00' },
    ],
    balance: '$120.50',
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fafafa', paddingHorizontal: 20 }}>
      {/* Greeting Section */}
      <View style={{ paddingVertical: 20, marginTop: 50, marginBottom: 20, }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#333' }}>
          Hello, {user.name.split(' ')[0]}!
        </Text>
      </View>

      {/* Payments Section */}
      <View style={{ justifyContent: "space-between", flexDirection: "row", marginBottom: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#444' }}>Payments</Text>
        <TouchableOpacity>
          <Text style={{ fontSize: 15, color: '#444' }}>Edit &gt;</Text>
        </TouchableOpacity>
      </View>

      {/* Payment Methods */}
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
        <TouchableOpacity>
          <Ionicons name="cash-outline" size={20} color="green" />
        </TouchableOpacity>
        <View style={{ flexDirection: "column", flex: 1, paddingLeft: 10 }}>
          <Text style={{ fontSize: 16, color: "black" }}>Cash</Text>
          <TouchableOpacity>
            <Text style={{ fontSize: 14, color: "green" }}>Change</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Toya Balance */}
      <View
        style={{
          marginTop: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 40
        }}
      >
        <AntDesign name="wallet" size={20} color="black" />
        <View style={{ flexDirection: "row", flex: 1, paddingLeft: 10, justifyContent: "space-between" }}>
          <Text style={{ fontSize: 16, color: "black" }}>Toya Balance</Text>
          <Text style={{ fontSize: 16, color: "black" }}>{user.balance}</Text>
        </View>
      </View>

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
          <Text style={{ fontSize: 15, color: 'green' }}>Edit &gt;</Text>
        </View>
        
      </View>
      </TouchableOpacity>

      <TouchableOpacity style={{marginBottom:10}}>
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
          <Text style={{ fontSize: 16, color: "black" }}>{user.name}</Text>
          <Text style={{ fontSize: 15, color: 'green' }}>Edit &gt;</Text>
    
        </View>
        
      </View>
      </TouchableOpacity>


      <View style={{ justifyContent: "space-between", flexDirection: "row", marginBottom: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#444' }}>Other</Text>
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
        <Ionicons name="ticket-outline" size={25} color="black" />
        <View style={{ flexDirection: "row", flex: 1, paddingLeft: 10, justifyContent: "space-between",}}>
          <Text style={{ fontSize: 16, color: "black" }}>Promo Codes</Text>
        </View>
        
      </View>
      </TouchableOpacity>

      <TouchableOpacity style={{marginBottom:10}}>
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

      <TouchableOpacity style={{marginBottom:10}}>

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

      <TouchableOpacity style={{marginBottom:10}}>

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

<TouchableOpacity style={{marginBottom:10}}>

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
  );
};

export default Profile;
