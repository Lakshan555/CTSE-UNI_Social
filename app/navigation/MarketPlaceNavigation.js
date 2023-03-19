import React from "react";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import MarketPlace from "../Screens/MarketPlace";
import MarketPlaceViewDetails from "../Screens/MarketPlaceViewDetails";
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

      <Stack.Screen
        options={{
          title: "Find More",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#39367e" },
        }}
        name="MarketPlaceViewDetails"
        component={MarketPlaceViewDetails}
      />
    </Stack.Navigator>
  );
}

export default MarketPlaceNavigation;
