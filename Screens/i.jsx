import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons, MaterialIcons, Entypo, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native"; // Import the hook

const { width, height } = Dimensions.get("window");

const Home = () => {
  const [location, setLocation] = useState("Accra, Ghana");
  const [favorites, setFavorites] = useState({});
  const navigation = useNavigation(); // Use the hook to access navigation

  const recommendedItems = [
    {
      id: 1,
      name: "Golden Spicy Chicken",
      image: require("../assets/b3.png"),
      description: "A cheeseburger.",
      price: "$12.99",
    },
    {
      id: 2,
      name: "Steak",
      image: require("../assets/b5.png"),
      description: "Juicy grilled steak.",
      price: "$19.99",
    },
    {
      id: 3,
      name: "Ice Cream",
      image: require("../assets/b2.png"),
      description: "Chilled and sweet.",
      price: "$5.49",
    },
    {
      id: 4,
      name: "Smoothie",
      image: require("../assets/b4.png"),
      description: "Fresh fruit blend.",
      price: "$4.99",
    },
    {
      id: 5,
      name: "Pizza",
      image: require("../assets/b3.png"),
      description: "Hot and cheesy.",
      price: "$15.99",
    },
    {
      id: 6,
      name: "Salad",
      image: require("../assets/b5.png"),
      description: "Healthy and fresh.",
      price: "$9.99",
    },
  ];

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: height * 0.02,
        paddingHorizontal: width * 0.05,
        alignItems: "center",
      }}
    >
      {/* Header */}
      <View
        style={{
          height: "6%",
          width: "100%",
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 25,
          paddingHorizontal: width * 0.03,
        }}
      >
        {/* Search Icon with Circular Background */}
        <TouchableOpacity>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: "white",
              justifyContent: "center",
              alignItems: "center",
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowRadius: 5,
              shadowOffset: { width: 0, height: 2 },
              elevation: 2,
            }}
          >
            <MaterialIcons name="search" size={30} color="black" />
          </View>
        </TouchableOpacity>

        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 12, color: "gray" }}>Location</Text>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 2,
            }}
            onPress={() => console.log("Open location dropdown")}
          >
            <Ionicons
              name="location-outline"
              size={20}
              color="black"
              style={{ marginRight: 5 }}
            />
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                color: "black",
              }}
            >
              {location}
            </Text>
            <Entypo
              name="chevron-down"
              size={20}
              color="black"
              style={{ marginLeft: 5 }}
            />
          </TouchableOpacity>
        </View>

        {/* Notification Icon with Circular Background */}
        <TouchableOpacity>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: "white",
              justifyContent: "center",
              alignItems: "center",
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowRadius: 5,
              shadowOffset: { width: 0, height: 2 },
              elevation: 2,
            }}
          >
            <Ionicons name="notifications-outline" size={30} color="black" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Section with Background Image */}
      <View
        style={{
          height: "25%",
          width: "95%",
          borderRadius: 30,
          overflow: "hidden",
        }}
      >
        <ImageBackground
          source={require("../assets/b1.jpg")}
          style={{
            flex: 1,
            justifyContent: "flex-start",
            paddingTop: 10,
          }}
        >
          <View style={{ padding: 20 }}>
            <Text
              style={{
                color: "white",
                fontSize: 25,
                fontWeight: "bold",
                textAlign: "left",
              }}
            >
              Free Delivery For
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: 25,
                fontWeight: "bold",
                textAlign: "left",
              }}
            >
              Spaghetti
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: 12,
                textAlign: "left",
              }}
            >
              Up to 3 times per day
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: "#add624",
                paddingVertical: 8,
                paddingHorizontal: 16,
                borderRadius: 20,
                marginTop: 20,
                alignItems: "center",
                width: 120,
              }}
              onPress={() => console.log("Order Now pressed")}
            >
              <Text style={{ color: "black", fontSize: 16, fontWeight: "bold" }}>
                Order Now
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>

      {/* Horizontal ScrollView */}
      <View style={{ height: 140, marginTop: 20 }}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {[
            { name: "Burger", image: require("../assets/b3.png") },
            { name: "Chicken", image: require("../assets/b5.png") },
            { name: "Fries", image: require("../assets/b2.png") },
            { name: "Drink", image: require("../assets/b4.png") },
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate("Details", { item })} // Pass item data to NewPage
            >
              <View
                style={{
                  width: 150,
                  height: 140,
                  backgroundColor: "#fefffc",
                  marginRight: 10,
                  borderRadius: 30,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={item.image}
                  style={{ width: 100, height: 100, borderRadius: 10 }}
                />
                <Text style={{ fontWeight: "bold" }}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Recommended for You */}
      <View
        style={{
          width: "100%",
          marginTop: 20,
          marginBottom: 10,
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: width * 0.02,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Recommended for you</Text>
        <TouchableOpacity>
          <Text>See more</Text>
        </TouchableOpacity>
      </View>

      {/* Vertical ScrollView Section */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          paddingHorizontal: width * 0.02,
          marginBottom: 100,
        }}
      >
        {recommendedItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={{
              width: "48%",
              marginBottom: 15,
              position: "relative",
            }}
            onPress={() => navigation.navigate("Details", { item })} // Pass item data to NewPage
          >
            <View
              style={{
                width: "100%",
                height: 200,
                backgroundColor: "#fefffc",
                borderRadius: 20,
                padding: 10,
                justifyContent: "space-between",
                position: "relative",
              }}
            >
              {/* Heart Icon */}
              <TouchableOpacity
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  zIndex: 1,
                }}
                onPress={() => toggleFavorite(item.id)}
              >
                <AntDesign
                  name={favorites[item.id] ? "heart" : "hearto"}
                  size={20}
                  color={favorites[item.id] ? "red" : "black"}
                />
              </TouchableOpacity>

              <Image
                source={item.image}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 10,
                  alignSelf: "center",
                }}
              />
              <Text
                style={{
                  fontWeight: "bold",
                  textAlign: "center",
                  marginTop: 5,
                }}
              >
                {item.name}
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  textAlign: "center",
                  marginTop: 5,
                }}
              >
                {item.description}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 10,
                }}
              >
                <Text style={{ color: "black", fontSize: "20" }}>
                  {item.price}
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#add624",
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      borderRadius: 10,
                    }}
                  >
                    <Text style={{ color: "white", fontSize: 14 }}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Bottom Tab Bar */}
      <View
        style={{
          position: "absolute",
          bottom: 8,
          left: 0,
          right: 0,
          height: 60,
          backgroundColor: "white",
          borderTopWidth: 1,
          borderTopColor: "#ddd",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <TouchableOpacity>
          <Ionicons name="home-outline" size={25} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="heart-outline" size={25} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons name="list" size={25} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="bag-remove-outline" size={25} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="person-outline" size={25} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Home;
