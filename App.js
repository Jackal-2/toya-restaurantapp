import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Screens/Homescreen/Home";
import Details from "./Screens/Details";
import Delivery from "./Screens/Delivery";
import Favorites from "./Screens/Favorites";
import Search from "./Screens/Search";
import Notifications from "./Screens/Notifications/Notifications";
import NotificationDetails from "./Screens/Notifications/NotificationDetails";
import Profile from "./Screens/Tabbar/Profile";




const Stack = createStackNavigator();

const App = () => {
  return (

    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="Delivery" component={Delivery} />
        <Stack.Screen name="Favorites" component={Favorites} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="NotificationDetails" component={NotificationDetails} />
        <Stack.Screen name="Profile" component={Profile} />


      </Stack.Navigator>
    </NavigationContainer>

  );
};

export default App;