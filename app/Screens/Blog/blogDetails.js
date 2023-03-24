import React, { useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../../components/Common/Header";

const blogDetails = ({ route, navigation }) => {
  console.log(route.params);
  const title = route.params.item.title;
  const blog = route.params.item.blog;
  //   const blog = route.params.testblog
  return (
    <View style={styles.screen}>
      <Header prop1="Test Detols pAge" />
      <View style={styles.body}>
        <View>
          {/* first card view */}
          <View style={styles.cardList}>
            <View style={{ flexDirection: "row" }}>
              {/* edit Button */}
              <View style={{ width: "35%" }}>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
              </View>
              {/* Delete Button */}
              <View style={{ width: "50%" }}>
                <TouchableOpacity style={styles.button2}>
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/* Second card view */}
          <ScrollView>
            <View style={{ flex: 1, paddingBottom: 300 }}>
              <View style={styles.cardList}>
                <Text>{title}</Text>
                <Text>{blog}</Text>
              </View>
            </View>
          </ScrollView>
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
    width: 100,
    // margin: 10,
    // marginBottom: 30,
    borderRadius: 10,
  },
  button2: {
    alignItems: "center",
    backgroundColor: "red",
    // padding: 15,
    paddingTop: 8,
    paddingBottom: 8,
    width: 100,
    // margin: 10,
    // marginBottom: 30,
    borderRadius: 10,
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
    color: "white",
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

export default blogDetails;
