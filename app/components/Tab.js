import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { AntDesign, Feather, Fontisto } from "@expo/vector-icons";
const Tab = ({ color, tab, onPress, icon, tabIcon }) => {
  // console.log(tab && tab.name.filter((s)=>(s)));
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {icon && <Image size={120} source={icon} />}
      {tabIcon && <Fontisto name={tabIcon} size={20} color={color} />}
      {/* <Text style={{ color }}> {tab.name} </Text> */}
    </TouchableOpacity>
  );
};

export default Tab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 18,
  },
});
