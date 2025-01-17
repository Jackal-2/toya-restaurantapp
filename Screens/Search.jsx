import React, { useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, Dimensions, SafeAreaView, Image } from "react-native";

const { width, height } = Dimensions.get("window");

const Search = ({ route }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const { items } = route.params;

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: height * 0.02 }}>
      {/* Search Header */}
      <View
        style={{
          marginBottom: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingHorizontal: width * 0.05, // Increased padding
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Search Items</Text>
      </View>

      {/* Search Input */}
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          borderRadius: 8,
          paddingLeft: 10,
          fontSize: 16,
          marginHorizontal: width * 0.05, // Added margin to the sides
          marginBottom: 20, // Added margin to give space below the input field
        }}
        placeholder="Search for food, drinks, etc."
        value={searchQuery}
        onChangeText={handleSearchChange}
      />

      {/* Display Filtered Results */}
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              padding: 15,
              backgroundColor: "#fefffc",
              marginVertical: 8,
              borderRadius: 8,
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowRadius: 5,
              shadowOffset: { width: 0, height: 2 },
              elevation: 3,
              flexDirection: "row", // Ensures image and text are aligned horizontally
              alignItems: "center", // Centers the items vertically
              marginHorizontal: width * 0.02, // Added margin to the sides for each item
            }}
            onPress={() => console.log(`${item.name} pressed`)}
          >
            {/* Image on the left */}
            <Image
              source={item.image}
              style={{
                width: 60,  // Set width for image
                height: 60, // Set height for image
                borderRadius: 10,
                marginRight: 15, // Add spacing between image and text
              }}
            />
            
            {/* Text Container for Title and Description */}
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item.name}</Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "gray",
                  marginTop: 5,
                }}
                numberOfLines={1} // Limits the description to a single line
                ellipsizeMode="tail" // Add ellipsis if the description is too long
              >
                {item.description}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={{ fontSize: 16, textAlign: "center", marginTop: 20 }}>No items found</Text>}
      />
    </SafeAreaView>
  );
};

export default Search;
