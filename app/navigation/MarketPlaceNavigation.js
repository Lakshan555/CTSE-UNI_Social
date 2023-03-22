import React from "react";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import AddNewMarketItem from "../Screens/AddNewMarketItem";
import MarketPlace from "../Screens/MarketPlace";
import MarketPlaceViewDetails from "../Screens/MarketPlaceViewDetails";
import MyMarketItems from "../Screens/MyMarketItems";
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
      <Stack.Screen
        options={{
          title: "Add Market Item",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#39367e" },
        }}
        name="AddNewMarketItem"
        component={AddNewMarketItem}
      />
      <Stack.Screen
        options={{
          title: "My Market Items",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#39367e" },
        }}
        name="MyMarketItems"
        component={MyMarketItems}
      />
    </Stack.Navigator>
  );
}

export default MarketPlaceNavigation;
