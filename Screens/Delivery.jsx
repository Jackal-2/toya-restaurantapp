import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { FontAwesome6, MaterialIcons, FontAwesome, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { GestureHandlerRootView, PanGestureHandler } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

const Delivery = () => {
  const navigation = useNavigation();

  const [courierLocation, setCourierLocation] = useState({
    latitude: 37.7749,
    longitude: -122.4194,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  const [viewPosition, setViewPosition] = useState(height * 0.75); // Initial position of the sliding view
  const [dragging, setDragging] = useState(false);

  // Function to update position based on the gesture movement
  const onGestureEvent = (event) => {
    const { translationY, state } = event.nativeEvent;

    // Calculate new position, ensuring that the slider doesn't go too high or too low
    const newPosition = Math.max(Math.min(viewPosition + translationY, height * 0.75), height * 0.55);
    setViewPosition(newPosition); // Update the position dynamically with the drag

    // Handle the drag state
    if (state === 4) {
      setDragging(false); // Gesture has ended
    } else {
      setDragging(true); // Dragging is active
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Map Section */}
      <MapView
        style={{ flex: 1 }}
        region={courierLocation}
        onRegionChangeComplete={(region) => setCourierLocation(region)}
        mapType="standard" // Sets the map to a simple standard view
        showsCompass={false} // Hides the compass for simplicity
        showsTraffic={false} // Disables traffic display
        showsBuildings={false} // Simplifies the map further by hiding buildings
        showsIndoors={false} // Hides indoor maps for simplicity
      >
        <Marker coordinate={courierLocation} title="Courier Location" />
      </MapView>

      {/* Back Button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          position: "absolute",
          top: height * 0.06,
          left: width * 0.05,
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
      </TouchableOpacity>

      {/* Location Button */}
      <TouchableOpacity
        style={{
          position: "absolute",
          top: height * 0.06,
          right: width * 0.05,
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
      </TouchableOpacity>

      {/* Sliding Bottom Black View */}
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <View
          style={{
            position: "absolute",
            bottom: 0,
            height: height - viewPosition, // Dynamically adjust height based on slider position
            width: "100%",
            backgroundColor: "black",
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            overflow: "hidden",
            transition: dragging ? 'none' : 'all 0.3s ease-in-out', // Smooth transition when dragging ends
          }}
        >
          {/* Slider Handle */}
          <View
            style={{
              height: 5,
              width: 50,
              backgroundColor: "white",
              borderRadius: 2.5,
              alignSelf: "center",
              marginVertical: 10,
            }}
          />

          {/* Courier Details */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 10,
              paddingHorizontal: 20,
            }}
          >
            <Image
              source={require("../assets/b9.png")}
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                marginRight: 10,
              }}
            />
            <View style={{ flexDirection: "column", flex: 1 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                Issaka Ishmael
              </Text>
              {/* Courier Text under Name */}
              <Text
                style={{
                  fontSize: 14,
                  color: "#ccc", // Lighter color for "Courier"
                }}
              >
                Courier
              </Text>
            </View>

            <TouchableOpacity
              style={{
                marginRight: 15,
                backgroundColor: "white",
                width: 40,
                height: 40,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialCommunityIcons name="message-text-outline" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                width: 40,
                height: 40,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Feather name="phone" size={24} color="black" />
            </TouchableOpacity>
          </View>

          {/* White View Overlay */}
          <View
            style={{
              backgroundColor: "white",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 20,
              flex: 1,
            }}
          >
            {/* Estimated Delivery Time */}
            <Text
              style={{
                fontSize: 20,
                color: "black",
                marginBottom: 5,
                alignSelf: "center",
              }}
            >
              Estimated Delivery Time is 25 mins
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: "black",
                marginBottom: 20,
                alignSelf: "center",
              }}
            >
              Your order is already on its way to you!
            </Text>

            {/* Delivery Progress */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                position: "relative",
                marginBottom: 30,
              }}
            >
              {["clipboard-list", "hourglass-half", "truck-fast", "check-circle"].map(
                (icon, index) => (
                  <React.Fragment key={icon}>
                    <View
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        backgroundColor: "#add624",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <FontAwesome6 name={icon} size={20} color="white" />
                    </View>
                    {index < 3 && (
                      <View
                        style={{
                          height: 1,
                          backgroundColor: "black",
                          flex: 1,
                          marginHorizontal: 5,
                        }}
                      />
                    )}
                  </React.Fragment>
                )
              )}
            </View>

            {/* "View All Details" Button */}
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 20,
              }}
              onPress={() => console.log("View All Details Pressed")}
            >
              <Text style={{ fontSize: 14, color: "black", marginRight: 5 }}>
                View All Details
              </Text>
              <FontAwesome name="chevron-down" size={14} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

export default Delivery;
