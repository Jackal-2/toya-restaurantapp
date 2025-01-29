import React from "react"
import { View, Text, TouchableOpacity, Dimensions, Image, SafeAreaView, FlatList, StyleSheet } from "react-native"
import { Ionicons, AntDesign, MaterialCommunityIcons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { useFavorites } from "./context/FavoritesContext"
import TabBar from "../components/Tabbar"

const { width, height } = Dimensions.get("window")

const Favorites = () => {
  const navigation = useNavigation()
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites()

  const handleAddToCart = (item) => {
    // Implement add to cart functionality
    console.log("Added to cart:", item.name)
  }

  const renderItem = ({ item }) => {
    const isFavorite = favorites.some((fav) => fav.id === item.id)

    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => (isFavorite ? removeFromFavorites(item.id) : addToFavorites(item))}
        >
          <AntDesign name={isFavorite ? "heart" : "hearto"} size={20} color={isFavorite ? "red" : "black"} />
        </TouchableOpacity>

        <Image source={item.image} style={styles.itemImage} />
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDescription} numberOfLines={1} ellipsizeMode="tail">
          {item.description}
        </Text>
        <View style={styles.itemFooter}>
          <Text style={styles.itemPrice}>{item.price}</Text>
          <TouchableOpacity style={styles.addButton} onPress={() => handleAddToCart(item)}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Favorites</Text>
        <TouchableOpacity>
          <Ionicons name="search-outline" size={30} color="black" />
        </TouchableOpacity>
      </View>

      {favorites.length > 0 ? (
        <FlatList
          data={favorites}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <MaterialCommunityIcons name="heart-outline" size={80} color="#ccc" />
          <Text style={styles.emptyHeading}>No Favorites Yet</Text>
          <Text style={styles.emptySubtext}>Start adding some favorites and they'll appear here!</Text>
        </View>
      )}

      <View style={styles.tabBarContainer}>
        <TabBar navigation={navigation} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: height * 0.02,
    paddingHorizontal: width * 0.05,
  },
  header: {
    height: "6%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
    paddingHorizontal: width * 0.03,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  listContent: {
    paddingBottom: 80, // Adjust this value based on your TabBar height
  },
  itemContainer: {
    width: "95%",
    height: 200,
    backgroundColor: "#fefffc",
    borderRadius: 20,
    padding: 10,
    justifyContent: "space-between",
    marginBottom: 15,
    alignSelf: "center",
  },
  favoriteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    alignSelf: "center",
  },
  itemName: {
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
  },
  itemDescription: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 5,
  },
  itemFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  itemPrice: {
    color: "black",
    fontSize: 20,
  },
  addButton: {
    backgroundColor: "#add624",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  addButtonText: {
    color: "white",
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyHeading: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#333",
  },
  emptySubtext: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  tabBarContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
})

export default Favorites

