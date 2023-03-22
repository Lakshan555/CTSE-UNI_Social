import React from "react";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import AddNewMarketItem from "../Screens/AddNewMarketItem";
import MarketPlace from "../Screens/MarketPlace";
import MarketPlaceViewDetails from "../Screens/MarketPlaceViewDetails";
import MyItemDetails from "../Screens/MyItemDetails";
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
          title: "My Market",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#39367e" },
        }}
        name="MyMarketItems"
        component={MyMarketItems}
      />
      <Stack.Screen
        options={{
          title: "My Market Item",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#39367e" },
        }}
        name="MyItemDetails"
        component={MyItemDetails}
      />
    </Stack.Navigator>
  );
}

export default MarketPlaceNavigation;
