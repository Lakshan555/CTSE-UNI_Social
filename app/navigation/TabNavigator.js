import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import TabBar from "../components/TabBar";
import Home from "../components/Home";
import MarketPlaceNavigation from "./MarketPlaceNavigation";
import InquiryHelpNavigation from "./InquiryHelpNavigation";
import BlogHome from "../Screens/Blog/BlogHome";

//invoke navigation function. it will return a component
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen
        name="Home"
        component={Home}
        initialParams={{ icon: require("../images/FullImage.png") }}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Report"
        component={BlogHome}
        initialParams={{ icon: require("../images/OpenBook.png") }}
        options={{ headerShown: false }}
      />

      <Tab.Screen
        name="Prescription"
        component={Home}
        initialParams={{ icon: require("../images/Shop.png") }}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="MarketPlaceNavigation"
        component={MarketPlaceNavigation}
        initialParams={{ icon: require("../images/Questions.png") }}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="InquiryHelpNavigation"
        component={InquiryHelpNavigation}
        initialParams={{ icon: require("../images/QuestionAndAnswer.png") }}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
