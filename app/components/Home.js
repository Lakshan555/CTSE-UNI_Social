import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "./Common/Header";

const Home = ({ navigation }) => {
  return (
    <View style={styles.screen}>
      <Header prop1="sss" />
      <View style={styles.body}>
        <View style={styles.card}>
          <Text>Don’t you have account?</Text>
        </View>
      </View>
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
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 20,
    width: "100%",
  },
  card: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
});

export default Home;
