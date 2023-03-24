import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    FlatList,
    Platform,
    UIManager,
    ScrollView,
    ActivityIndicator,
    Alert,
  } from "react-native";
  import React from "react";
  import { useState, useEffect } from "react";
  import { BackgroundColor } from "../../components/Common/Colors";
  import { AccordionList, AccordionItem } from "react-native-accordion-list-view";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import { AntDesign, MaterialIcons } from "@expo/vector-icons";


const CommunityScreen = () => {
  return (
    <View>
      <Text>CommunityScreen</Text>
    </View>
  )
}

export default CommunityScreen

const styles = StyleSheet.create({})