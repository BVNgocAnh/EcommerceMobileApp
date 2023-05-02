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
import Checkout from "./Screens/Checkout";
import PaymentSuccess from "./Screens/PaymentSuccess";
import Main from "./NavigationComponent/Main";
import Order from "./Screens/Order";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";
const Stack = createNativeStackNavigator();
const Navigation = () => {
  const { userInfo, isLoading } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <>
          {/* userInfo.token == null */}
          {userInfo.token == null ? (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Signup" component={Signup} />
            </>
          ) : (
            <>
              <Stack.Screen name="HomeScreen" component={HomeScreen} />
              <Stack.Screen name="Splash" component={Splash} />
              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name="MyAddress" component={MyAddress} />
              <Stack.Screen name="AddAddress" component={AddAddress} />
              <Stack.Screen name="ProductDetail" component={ProductDetail} />
              <Stack.Screen name="ShoppingCart" component={Cart} />
              <Stack.Screen name="Checkout" component={Checkout} />
              <Stack.Screen name="PaymentSuccess" component={PaymentSuccess} />
              <Stack.Screen name="Order" component={Order} />
            </>
          )}
        </>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
