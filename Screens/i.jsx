import React, { useState, useEffect, useRef } from "react";
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
import { useNavigation } from "@react-navigation/native";
import TabBar from "../../components/Tabbar";
import { CartContext } from "../../Screens/Tabbar/CartContext";

const { width, height } = Dimensions.get("window");

const Home = () => {
  const [location, setLocation] = useState("Accra, Ghana");
  const [favorites, setFavorites] = useState({});
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);
  const { addToCart } = useContext(CartContext);

  const recommendedItems = [
    {
      id: 1,
      name: "Golden Cheese Burger",
      image: require("../../assets/b3.png"),
      description:
        "A cheese burger is a classic sandwich made with a juicy grilled or pan-seared beef patty, topped with a slice of melted cheese. It is typically served on a toasted bun and often includes additional toppings such as lettuce, tomatoes, onions, pickles, and condiments like ketchup, mustard, or mayonnaise.",
      price: "$12.99",
      nutrition: { kcal: 350, proteins: 25, carbo: 30, fats: 15 },
    },
    {
      id: 2,
      name: "Lemon Pepper Chicken",
      image: require("../../assets/b5.png"),
      description:
        "Lemon Pepper Chicken is a flavorful dish made with tender chicken seasoned with a zesty blend of lemon juice, freshly cracked pepper, and aromatic herbs. Often pan-seared or baked, the chicken is infused with a tangy citrus kick and a hint of spice.",
      price: "$19.99",
      nutrition: { kcal: 450, proteins: 35, carbo: 5, fats: 20 },
    },
    {
      id: 3,
      name: "Blueberry Ice Cream",
      image: require("../../assets/b6.png"),
      description:
        "A creamy dessert that blends the sweet and slightly tart flavor of blueberries into a rich, smooth base. Its vibrant purple hue and refreshing taste make it a delightful treat, especially during warm weather.",
      price: "$5.49",
      nutrition: { kcal: 200, proteins: 3, carbo: 25, fats: 10 },
    },
    {
      id: 4,
      name: "Coca-Cola",
      image: require("../../assets/b4.png"),
      description:
        "A timeless, effervescent soft drink with a signature balance of sweetness, zest, and refreshing carbonation. This iconic beverage features a unique blend of caramel, vanilla, and citrus undertones.",
      price: "$4.99",
      nutrition: { kcal: 150, proteins: 2, carbo: 35, fats: 0 },
    },
    {
      id: 5,
      name: "Pizza",
      image: require("../../assets/b7.png"),
      description:
        "A delicious and versatile dish featuring a crispy, golden crust topped with a rich tomato sauce, melted cheese, and a variety of fresh toppings like vegetables, meats, and herbs.",
      price: "$15.99",
      nutrition: { kcal: 300, proteins: 12, carbo: 40, fats: 10 },
    },
    {
      id: 6,
      name: "Salad",
      image: require("../../assets/b8.png"),
      description:
        "A refreshing and healthy dish made with a variety of fresh vegetables, greens, and often complemented with fruits, nuts, seeds, or protein like chicken or tofu.",
      price: "$9.99",
      nutrition: { kcal: 120, proteins: 5, carbo: 10, fats: 2 },
    },
    {
      id: 7,
      name: "Salad",
      image: require("../../assets/b8.png"),
      description:
        "A refreshing and healthy dish made with a variety of fresh vegetables, greens, and often complemented with fruits, nuts, seeds, or protein like chicken or tofu.",
      price: "$9.99",
      nutrition: { kcal: 120, proteins: 5, carbo: 10, fats: 2 },
    },
    {
      id: 8,
      name: "Golden Cheese Burger",
      image: require("../../assets/b3.png"),
      description:
        "A cheese burger is a classic sandwich made with a juicy grilled or pan-seared beef patty, topped with a slice of melted cheese. It is typically served on a toasted bun and often includes additional toppings such as lettuce, tomatoes, onions, pickles, and condiments like ketchup, mustard, or mayonnaise.",
      price: "$12.99",
      nutrition: { kcal: 350, proteins: 25, carbo: 30, fats: 15 },
    },
  ];

  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [id]: !prevFavorites[id],
    }));
  };

  // Auto-scroll function
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ x: width, animated: true }); // Scroll 1 screen width to the right
      }
    }, 2000); // Every 2 seconds

    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, []);

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
        <TouchableOpacity onPress={() => navigation.navigate("Search", { items: recommendedItems })}>
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
        <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
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

      {/* Scrollable Content */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}
      >
        {/* Section with Background Image */}
        <View
          style={{
            height: "18%",
            width: "95%",
            borderRadius: 30,
            overflow: "hidden",
          }}
        >
          <ImageBackground
            source={require("../../assets/b1.jpg")}
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
                  marginTop: 30,
                  alignItems: "center",
                  width: 120,
                }}
                onPress={() => console.log("Order Now pressed")}
              >
                <Text style={{ color: "black", fontSize: 16, fontWeight: "bold",}}>
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
              { name: "Burger", image: require("../../assets/b3.png") },
              { name: "Chicken", image: require("../../assets/b5.png") },
              { name: "Fries", image: require("../../assets/b2.png") },
              { name: "Drink", image: require("../../assets/b4.png") },
            ].map((item, index) => (
              <TouchableOpacity key={index}>
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
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Recommended for you
          </Text>
          <TouchableOpacity>
            <Text>See more</Text>
          </TouchableOpacity>
        </View>

        {/* Recommended Items */}
        <View
          style={{
            width: "100%",
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
              onPress={() => navigation.navigate("Details", { item })}
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
        </View>
      </ScrollView>

   
      <TabBar navigation={navigation} /> 

    </SafeAreaView>
  );
};

export default Home;