import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "./Common/Header";

const Home = ({ navigation }) => {
  return (
    <View style={styles.screen}>
      <Header prop1="UniSocial" />
      <View style={styles.body}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    flex: 8,
    backgroundColor: "#14141405",
    padding: 10,
    width: "100%",
  },
});

export default Home;
