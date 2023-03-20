import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MarketPlace from "../Screens/MarketPlace";
const Stack = createNativeStackNavigator();

function MarketPlaceNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          title: "MarketPlace",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#39367e" },
        }}
        name="MarketPlace"
        component={MarketPlace}
      />
    </Stack.Navigator>
  );
}

export default MarketPlaceNavigation;
