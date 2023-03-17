import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./app/navigation/TabNavigator";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
const Stack = createNativeStackNavigator();
import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./app/store/index";
import Login from "./app/components/LoginScreen";
import SplashScreen from "./app/components/SplashScreen";

const MyStack = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        options={{ headerShown: false }}
        component={SplashScreen}
        name="SplashScreen"
      />
      <Stack.Screen
        options={{ headerShown: false }}
        component={Login}
        name="Login"
      />
      <Stack.Screen
        name="tabNavigator"
        options={{ headerShown: false }}
        component={TabNavigator}
      />
    </Stack.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        component={SplashScreen}
        name="SplashScreen"
      />
      <Stack.Screen
        options={{ headerShown: false }}
        component={Login}
        name="Login"
      />
    </Stack.Navigator>
  );
};

const RootNavigation = () => {
  const token = useSelector((state) => state.AuthReducers.authToken);
  console.log("authToken", token);

  return (
    <NavigationContainer>
      {token === null ? <AuthStack /> : <MyStack />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
}
