import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { deleteBlog } from "../../../backend/PostController/Postcontroller";
import Header from "../../components/Common/Header";

const blogDetails = ({ route, navigation }) => {
  //refresh state
  const [refresh, setRefresh] = useState(false);

  console.log("blogDetails", route.params.item.id);
  const title = route.params.item.title;
  const body = route.params.item.body;
  const blogId = route.params.item.id;
  const [blog, setBlogs] = useState([]);
  const singleData = { title, body, blogId };

  //Edit handler
  const editHandler = () => {
    navigation.navigate("editForm", {
      singleData,
    });
  };

  //Delete handler
  const deleteHandler = async () => {
    await deleteBlog(blogId);
    navigation.navigate("blogHome");
  };

  //refresh handler
  const pullUp = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 200);
  };

  //   const blog = route.params.testblog
  return (
    <View style={styles.screen}>
      <Header prop1={title} />
      <View style={styles.body}>
        <View>
          {/* first card view */}
          <View style={styles.cardList}>
            <View style={{ flexDirection: "row" }}>
              {/* edit Button */}
              <View style={{ width: "35%" }}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => editHandler()}
                >
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
              </View>
              {/* Delete Button */}
              <View style={{ width: "50%" }}>
                <TouchableOpacity
                  style={styles.button2}
                  onPress={deleteHandler}
                >
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Second card view */}
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refresh} onRefresh={() => pullUp()} />
            }
          >
            <View style={{ flex: 1, paddingBottom: 300 }}>
              <View style={styles.cardList}>
                <Text style={styles.titleStyle}>{title}</Text>
                <View style={styles.card}>
                  <Image
                    style={styles.coverImg}
                    source={require("../../images/book.png")}
                  />
                </View>
                <Text style={styles.blogtextStyle}>{body}</Text>
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
  titleStyle: {
    fontSize: 25,
    paddingBottom: 15,
  },
  blogtextStyle: {
    textAlign: "justify",
    paddingTop: 20,
  },
  card: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: "white",
    padding: 8,

    borderRadius: 10,
  },
  card: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: "white",
    margin: 0,
    borderRadius: 10,
  },
  coverImg: {
    resizeMode: "cover",
    height: 200,
    width: 338,
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
