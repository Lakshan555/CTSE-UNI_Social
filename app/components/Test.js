import React from "react";
import { View, StyleSheet, Text } from "react-native";

const Test = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is Test!!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#76a6ef",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default Test;
