import React from "react";
import { createNativeStackNavigator } from "react-native-screens/native-stack";
import FaqScreen from "../Screens/Q&A/FAQScreen";

import InquiryChat from "../Screens/Q&A/InquiryChat";
const Stack = createNativeStackNavigator();

function InquiryHelpNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          title: "Q&A Section",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#39367e" },
        }}
        name="InquiryChat"
        component={InquiryChat}
      />

      <Stack.Screen
        options={{
          title: "FAQ",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#39367e" },
        }}
        name="FAQ"
        component={FaqScreen}
      />
    </Stack.Navigator>
  );
}

export default InquiryHelpNavigation;
