import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  StyleSheet,
  Animated,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { FontAwesome6, MaterialIcons, FontAwesome, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { GestureHandlerRootView, PanGestureHandler } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

const Delivery = ({ route }) => {
  const navigation = useNavigation();
  const { cartItems } = route.params;

  const [courierLocation, setCourierLocation] = useState({
    latitude: 37.7749,
    longitude: -122.4194,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  const [viewPosition, setViewPosition] = useState(height * 0.75);
  const [dragging, setDragging] = useState(false);
  const [deliveryProgress, setDeliveryProgress] = useState(0);

  const progressAnimation = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(progressAnimation, {
      toValue: deliveryProgress,
      duration: 1000,
      useNativeDriver: false,
    }).start();

    // Simulate delivery progress
    const interval = setInterval(() => {
      setDeliveryProgress((prev) => {
        const next = prev + 0.25;
        return next > 1 ? 1 : next;
      });
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, [deliveryProgress, progressAnimation]); // Added progressAnimation to dependencies

  const onGestureEvent = (event) => {
    const { translationY, state } = event.nativeEvent;
    const newPosition = Math.max(Math.min(viewPosition + translationY, height * 0.75), height * 0.55);
    setViewPosition(newPosition);
    setDragging(state !== 4);
  };

  const getStatusText = () => {
    if (deliveryProgress < 0.25) return "Order Confirmed";
    if (deliveryProgress < 0.5) return "Preparing Your Order";
    if (deliveryProgress < 0.75) return "Order Picked Up";
    return "Delivered";
  };

  const renderProgressIcon = (icon, index) => {
    const isCompleted = deliveryProgress * 4 > index;
    const iconColor = isCompleted ? "white" : "#ccc";
    const backgroundColor = isCompleted ? "#add624" : "#f0f0f0";

    return (
      <View key={icon} style={[styles.progressIcon, { backgroundColor }]}>
        <FontAwesome6 name={icon} size={20} color={iconColor} />
      </View>
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        region={courierLocation}
        onRegionChangeComplete={setCourierLocation}
        mapType="standard"
        showsCompass={false}
        showsTraffic={false}
        showsBuildings={false}
        showsIndoors={false}
      >
        <Marker coordinate={courierLocation} title="Courier Location" />
      </MapView>

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <FontAwesome6 name="less-than" size={15} color="black" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.locationButton}>
        <FontAwesome6 name="location-crosshairs" size={20} color="black" />
      </TouchableOpacity>

      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={[styles.bottomSheet, { height: height - viewPosition }]}>
          <View style={styles.handle} />

          <View style={styles.courierDetails}>
            <Image source={require("../assets/b9.png")} style={styles.courierImage} />
            <View style={styles.courierInfo}>
              <Text style={styles.courierName}>Coco Pops</Text>
              <Text style={styles.courierTitle}>Courier</Text>
            </View>
            <TouchableOpacity style={styles.actionButton}>
              <MaterialCommunityIcons name="message-text-outline" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Feather name="phone" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <View style={styles.contentOverlay}>
            <Text style={styles.estimatedTime}>Estimated Delivery: 25 mins</Text>
            <Text style={styles.statusText}>{getStatusText()}</Text>

            <View style={styles.progressContainer}>
              <Animated.View
                style={[
                  styles.progressBar,
                  {
                    width: progressAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["0%", "100%"],
                    }),
                  },
                ]}
              />
              {["clipboard-list", "hourglass-half", "truck-fast", "check-circle"].map(renderProgressIcon)}
            </View>

            <TouchableOpacity style={styles.detailsButton} onPress={() => navigation.navigate("Order Details")}>
              <Text style={styles.detailsButtonText}>View All Details</Text>
              <FontAwesome name="chevron-down" size={14} color="black" />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  backButton: {
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
  },
  locationButton: {
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
  },
  bottomSheet: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "black",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden",
  },
  handle: {
    height: 5,
    width: 50,
    backgroundColor: "white",
    borderRadius: 2.5,
    alignSelf: "center",
    marginVertical: 10,
  },
  courierDetails: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  courierImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  courierInfo: {
    flexDirection: "column",
    flex: 1,
  },
  courierName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  courierTitle: {
    fontSize: 14,
    color: "#ccc",
  },
  actionButton: {
    marginLeft: 15,
    backgroundColor: "white",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  contentOverlay: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    flex: 1,
  },
  estimatedTime: {
    fontSize: 20,
    color: "black",
    marginBottom: 5,
    alignSelf: "center",
    fontWeight: "bold",
  },
  statusText: {
    fontSize: 16,
    color: "#add624",
    marginBottom: 20,
    alignSelf: "center",
    fontWeight: "600",
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    marginBottom: 30,
    height: 40,
  },
  progressBar: {
    position: "absolute",
    height: 3,
    backgroundColor: "#add624",
    left: 0,
    top: 18.5,
    zIndex: 1,
  },
  progressIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  detailsButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  detailsButtonText: {
    fontSize: 14,
    color: "black",
    marginRight: 5,
  },
});

export default Delivery;