import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "./Screens/Splash";
import Login from "./Component/Login";
import Signup from "./Component/Signup";
import HomeScreen from "./Screens/HomeScreen";
import MyAddress from "./Component/MyAddress";
import AddAddress from "./Component/AddAddress";
import Profile from "./NavigationComponent/Profile";
import ProductDetail from "./Component/ProductDetail";
import Cart from "./NavigationComponent/Cart";
const Stack = createNativeStackNavigator();
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Splash"
          component={Splash}
        ></Stack.Screen>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={Login}
        ></Stack.Screen>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Signup"
          component={Signup}
        ></Stack.Screen>
        <Stack.Screen
          options={{ headerShown: false }}
          name="HomeScreen"
          component={HomeScreen}
        ></Stack.Screen>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Profile"
          component={Profile}
        ></Stack.Screen>
        <Stack.Screen
          options={{ headerShown: false }}
          name="MyAddress"
          component={MyAddress}
        ></Stack.Screen>
        <Stack.Screen
          options={{ headerShown: false }}
          name="AddAddress"
          component={AddAddress}
        ></Stack.Screen>
        <Stack.Screen
          options={{ headerShown: false }}
          name="ProductDetail"
          component={ProductDetail}
        ></Stack.Screen>
        <Stack.Screen
          options={{ headerShown: false }}
          name="ShoppingCart"
          component={Cart}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
