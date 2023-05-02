import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AdminLogin from "./src/Screens/AdminLogin";
import AddProduct from "./src/Screens/AddProduct";
import AccountPanel from "./src/Tabs/AccountPanel";
import UserStatistics from "./src/Tabs/UserStatistics";
import ProductStatistics from "./src/Tabs/ProductStatistics";
import Dashboard from "./src/Screens/Dashboard";
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="AddProduct" component={AddProduct} />
        <Stack.Screen name="AdminLogin" component={AdminLogin} />
        <Stack.Screen name="UserStatistics" component={UserStatistics} />
        <Stack.Screen name="AccountPanel" component={AccountPanel} />
        <Stack.Screen name="ProductStatistics" component={ProductStatistics} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
