import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const TabBar = () => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        position: "absolute",
        bottom: 8,
        left: 0,
        right: 0,
        height: 70,
        backgroundColor: "white",
        borderTopWidth: 1,
        borderTopColor: "#ddd",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Ionicons name="home-outline" size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Favorites")}>
        <Ionicons name="heart-outline" size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("List")}>
        <MaterialIcons name="list" size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
        <Ionicons name="bag-remove-outline" size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <Ionicons name="person-outline" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default TabBar;
