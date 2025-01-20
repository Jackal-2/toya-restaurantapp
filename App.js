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
import Profile from "./Screens/Profile/Profile";
import Cart from "./Screens/Tabbar/Cart";
import Support from "./Screens/Profile/Support";
import About from "./Screens/Profile/About";
import Privacy from "./Screens/Profile/Privacy";
import Account from "./Screens/Profile/Account";
import Promo from "./Screens/Profile/Promo";
import Phone from "./Screens/Profile/Phone";
import Email from "./Screens/Profile/Email";
import OrderDetails from "./Screens/Tabbar/OrderDetails";
import { CartProvider } from "./Screens/Tabbar/CartContext"; // Import CartProvider

const Stack = createStackNavigator();

const App = () => {
  return (
    <CartProvider>
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
          <Stack.Screen name="Cart" component={Cart} />
          <Stack.Screen name="Support" component={Support} />
          <Stack.Screen name="About" component={About} />
          <Stack.Screen name="Privacy" component={Privacy} />
          <Stack.Screen name="Account" component={Account} />
          <Stack.Screen name="Promo" component={Promo} />
          <Stack.Screen name="Phone" component={Phone} />
          <Stack.Screen name="Email" component={Email} />
          <Stack.Screen name="Order Details" component={OrderDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
};

export default App;
