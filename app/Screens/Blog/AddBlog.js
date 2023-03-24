import React, { useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../../components/Common/Header";

const AddBlog = ({ route, navigation }) => {

  return (
    <View style={styles.screen}>
      <Header prop1="Test Detols pAge" />
      <View style={styles.body}>
        <View>
          <View>
            <Text>Test</Text>
          </View>
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
    padding: 0,
    borderRadius: 10,
  },
  coverImg: {
    resizeMode: "cover",
    height: 200,
    width: 380,
    borderRadius: 10,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#FFAE00",
    // padding: 15,
    paddingTop: 8,
    paddingBottom: 8,
    width: 150,
    // margin: 10,
    // marginBottom: 30,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  buttonRow: {
    alignItems: "center",
    backgroundColor: "#FFAE00",
    // padding: 15,
    paddingTop: 8,
    paddingBottom: 8,
    width: 100,
    // margin: 10,
    // marginBottom: 30,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  buttonText: {
    color: "black",
    fontWeight: "900",
  },
  listView: {
    paddingTop: 25,
  },
  cardList: {
    margin: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
  },
});

export default AddBlog;


