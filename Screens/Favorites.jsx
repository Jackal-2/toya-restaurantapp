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
  StyleSheet,
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useFavorites } from "./context/FavoritesContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const Favorites = () => {
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();

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
        {favorites.length > 0 ? (
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
        ) : (
          <View style={styles.container}>
            <MaterialCommunityIcons
              name="heart-outline"
              size={80}
              color="#ccc"
            />
            <Text style={styles.heading}>No Favorites Yet</Text>
            <Text style={styles.subtext}>
              Start adding some favorites and they'll appear here!
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#333",
  },
  subtext: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});

export default Favorites;