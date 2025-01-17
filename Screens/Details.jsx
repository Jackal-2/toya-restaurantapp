import React, { useState } from "react";
import {
  View,
  Text,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FontAwesome5, FontAwesome6, Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const Details = ({ route, navigation }) => {
  const { item } = route.params;

  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription((prevState) => !prevState);
  };

  const truncatedDescription = item.description.length > 100
    ? `${item.description.slice(0, 100)}...`
    : item.description;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Header */}
      <View
        style={{
          height: "6%",
          width: "100%",
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: width * 0.03,
        }}
      >
        {/* Search Icon with Circular Background */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
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
            <FontAwesome6 name="less-than" size={15} color="black" />
          </View>
        </TouchableOpacity>

        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 20, color: "grey" }}>Details</Text>
    
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
            <FontAwesome6 name="location-crosshairs" size={20} color="black" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Background Image */}
      <View style={{ height: height * 0.4, width: "100%" }}>
        <ImageBackground
          source={item.image}
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        />
      </View>

      {/* Main Content */}
      <View
        style={{
          flex: 1,
          backgroundColor: "#f9f9f9",
          padding: 10,
          paddingTop: 5
        }}
      >
        {/* Item Details */}
        <Text
          style={{
            color: "black",
            fontSize: 30,
            fontWeight: "bold",
            paddingTop: 20,
          }}
        >
          {item.name}
        </Text>

        <View
          style={{
            flexDirection: "row",
            marginVertical: 10,
            alignItems: "center",
          }}
        >
          <Ionicons
            name="location-outline"
            size={20}
            color="grey"
            style={{ marginRight: 5 }}
          />
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: "grey",
            }}
          >
            {item.location ? item.location : "Accra, Ghana"}
          </Text>
        </View>

        {/* Nutrition Information */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 20,
            width: "100%",
          }}
        >
          <View style={{ alignItems: "center", flex: 1 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "black" }}>
              {item.nutrition.kcal}
            </Text>
            <Text style={{ fontSize: 14, color: "gray" }}>kcal</Text>
          </View>
          <View style={{ alignItems: "center", flex: 1 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "black" }}>
              {item.nutrition.proteins}
            </Text>
            <Text style={{ fontSize: 14, color: "gray" }}>proteins</Text>
          </View>
          <View style={{ alignItems: "center", flex: 1 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "black" }}>
              {item.nutrition.carbo}
            </Text>
            <Text style={{ fontSize: 14, color: "gray" }}>carbo</Text>
          </View>
          <View style={{ alignItems: "center", flex: 1 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold", color: "black" }}>
              {item.nutrition.fats}
            </Text>
            <Text style={{ fontSize: 14, color: "gray" }}>fats</Text>
          </View>
        </View>

        <Text style={{ color: "black", fontSize: 20, fontWeight: "bold" }}>
          Description
        </Text>

        {/* Description Section */}
        <ScrollView
          style={{
            flex: 1,
          }}
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}
        >
          <Text
            style={{
              fontSize: 18,
              textAlign: "left",
              color: "grey",
            }}
          >
            {showFullDescription ? item.description : truncatedDescription}
          </Text>
          {!showFullDescription && (
            <TouchableOpacity onPress={toggleDescription}>
              <Text style={{ color: "black", fontSize: 16, marginTop: 5 }}>
                See More
              </Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>

      {/* Order Now Section */}
      <View
        style={{
          height: "10%",
          width: "100%",
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: width * 0.03,
          backgroundColor: "white",
        }}
      >
        <TouchableOpacity>
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: "white",
              justifyContent: "center",
              alignItems: "center",
              shadowColor: "#000",
              shadowOpacity: 0.1,
              marginTop: 10,
              shadowRadius: 5,
              shadowOffset: { width: 0, height: 2 },
              elevation: 2,
            }}
          >
            <Ionicons name="bag-remove-outline" size={30} color="black" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: "#add624",
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
            width: 340,
            height: 60,
            marginTop: 10,
          }}
          onPress={() => navigation.navigate("Delivery")}
        >
          <Text style={{ color: "black", fontSize: 16, fontWeight: "bold" }}>
            Order Now
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Details;
