import React from "react";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import FAQScreen from "../Screens/Q&A/FAQScreen";
import InquiryChat from "../Screens/Q&A/InquiryChat";
import AddFAQ from "../Screens/Q&A/AddFAQ";
import FAQView from "../Screens/Q&A/FAQView";
const Stack = createNativeStackNavigator();

function InquiryHelpNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          title: " Q&A Section",
          headerTintColor: "black",
          headerHideShadow: true,
          headerStyle: { backgroundColor: "#fbfbfb" },
        }}
        name="InquiryChat"
        component={InquiryChat}
      />

      <Stack.Screen
        options={{
          title: "FAQ",
          headerTintColor: "white",
          headerHideShadow: true,
          headerStyle: { backgroundColor: "#fbfbfb" },
        }}
        name="FAQ"
        component={FAQScreen}
      />
      <Stack.Screen
        options={{
          title: "",
          headerTintColor: "#999999",
          headerHideShadow: true,
          headerStyle: { backgroundColor: "#fbfbfb" },
        }}
        name="AddFAQ"
        component={AddFAQ}
      />
      <Stack.Screen
        options={{
          title: "",
          headerTintColor: "#999999",
          headerHideShadow: true,
          headerStyle: { backgroundColor: "#fbfbfb" },
        }}
        name="FAQView"
        component={FAQView}
      />
    </Stack.Navigator>
  );
}

export default InquiryHelpNavigation;
