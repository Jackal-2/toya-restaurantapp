import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  FlatList,
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useFavorites } from "./context/FavoritesContext";

const { width, height } = Dimensions.get("window");

const Favorites = () => {
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();

  // const [favorites, setFavorites] = useState({
  //   1: true,
  //   2: false,
  //   3: true,
  //   4: false,
  //   5: true,
  //   6: false,
  // });

  const recommendedItems = [
    {
      id: 1,
      name: "Golden Cheese Burger",
      image: require("../assets/b3.png"),
      description:
        "A cheese burger is a classic sandwich made with a juicy grilled or pan-seared beef patty, topped with a slice of melted cheese.",
      price: "$12.99",
    },
    {
      id: 2,
      name: "Lemon Pepper Chicken",
      image: require("../assets/b5.png"),
      description:
        "Lemon Pepper Chicken is a flavorful dish made with tender chicken seasoned with a zesty blend of lemon juice, freshly cracked pepper, and aromatic herbs.",
      price: "$19.99",
    },
    {
      id: 3,
      name: "Blueberry Ice Cream",
      image: require("../assets/b6.png"),
      description:
        "A creamy dessert that blends the sweet and slightly tart flavor of blueberries into a rich, smooth base.",
      price: "$5.49",
    },
    {
      id: 4,
      name: "Coca-Cola",
      image: require("../assets/b4.png"),
      description:
        "A timeless, effervescent soft drink with a signature balance of sweetness, zest, and refreshing carbonation.",
      price: "$4.99",
    },
    {
      id: 5,
      name: "Pizza",
      image: require("../assets/b7.png"),
      description:
        "A delicious and versatile dish featuring a crispy, golden crust topped with a rich tomato sauce, melted cheese, and a variety of fresh toppings.",
      price: "$15.99",
    },
    {
      id: 6,
      name: "Salad",
      image: require("../assets/b8.png"),
      description:
        "A refreshing and healthy dish made with a variety of fresh vegetables, greens, and often complemented with fruits, nuts, seeds, or protein like chicken or tofu.",
      price: "$9.99",
    },
  ];

  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [id]: !prevFavorites[id],
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
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Favorites</Text>
        <TouchableOpacity>
          <Ionicons name="search-outline" size={30} color="black" />
        </TouchableOpacity>
      </View>

      {/* ScrollView for Favorite Items */}
      <View
        contentContainerStyle={{
          width: "100%",
          paddingHorizontal: width * 0.02,
          marginBottom: 100,
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
        }}
        showsVerticalScrollIndicator={false}
      >
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => {
            const isFavorite = favorites.some((fav) => fav.id === item.id);

            return (
              <View
                style={{
                  width: "95%",
                  height: 200,
                  backgroundColor: "#fefffc",
                  borderRadius: 20,
                  padding: 10,
                  alignSelf: "center",
                }}
              >
                {/* Heart button */}
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    zIndex: 1,
                  }}
                  onPress={() =>
                    isFavorite
                      ? removeFromFavorites(item.id)
                      : addToFavorites(item)
                  }
                >
                  <AntDesign
                    name={
                      favorites.some((fav) => fav.id === item.id)
                        ? "heart"
                        : "hearto"
                    }
                    size={20}
                    color={
                      favorites.some((fav) => fav.id === item.id)
                        ? "red"
                        : "black"
                    }
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
                  style={{ fontSize: 12, textAlign: "center", marginTop: 5 }}
                  numberOfLines={1}
                  ellipsizeMode="tail"
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
                  <Text style={{ color: "black", fontSize: 20 }}>
                    {item.price}
                  </Text>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#add624",
                      paddingVertical: 5,
                      paddingHorizontal: 10,
                      borderRadius: 10,
                    }}
                    onPress={() => handleAddToCart(item)} // Add item to cart
                  >
                    <Text style={{ color: "white", fontSize: 14 }}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Favorites;

{
  /* {recommendedItems
          .filter((item) => favorites[item.id])
          .map((item) => (
            <TouchableOpacity
              key={item.id}
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#fefffc",
                padding: 10,
                borderRadius: 20,
                marginBottom: 15,
                shadowColor: "#000",
                shadowOpacity: 0.1,
                shadowRadius: 5,
                shadowOffset: { width: 0, height: 2 },
                elevation: 5,
              }}
              onPress={() => console.log("Item pressed")}
            >
              <Image
                source={item.image}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 10,
                  marginRight: 15,
                }}
              />
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                  {item.name}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: "gray",
                    marginBottom: 5,
                  }}
                >
                  {item.description.slice(0, 50)}...
                </Text>
                <Text style={{ fontWeight: "bold", fontSize: 14 }}>
                  {item.price}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => toggleFavorite(item.id)}
                style={{
                  backgroundColor: "white",
                  borderRadius: 50,
                  padding: 5,
                  alignItems: "center",
                  justifyContent: "center",
                  shadowColor: "#000",
                  shadowOpacity: 0.1,
                  shadowRadius: 5,
                  shadowOffset: { width: 0, height: 2 },
                  elevation: 2,
                }}
              >
                <AntDesign
                  name={favorites[item.id] ? "heart" : "hearto"}
                  size={20}
                  color={favorites[item.id] ? "red" : "black"}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          ))} */
}
