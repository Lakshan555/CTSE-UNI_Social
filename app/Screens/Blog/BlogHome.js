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
import { getBlog } from "../../../backend/PostController/Postcontroller";
import Header from "../../components/Common/Header";

const BlogHome = ({ navigation }) => {
  const [blog, setBlogs] = useState([]);
  //refresh state
  const [refresh, setRefresh] = useState(false);

  const BlogDetailsHandler = (item) => {
    console.log("BlogDetailsHandler", item);
    navigation.navigate("blogDetails", {
      item,
    });
  };
  const BlogAddHandler = () => {
    navigation.navigate("blogForm");
  };

  const getAllList = async () => {
    const bogsData = await getBlog();
    setBlogs(bogsData);
  };

  useEffect(() => {
    getAllList();
  }, []);

  console.log("blog HOME", blog);
  //refresh handler
  const pullUp = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
      getAllList();
    }, 200);
  };

  return (
    <View style={styles.screen}>
      <Header prop1="BLOGS" />
      <View style={styles.body}>
        <View>
          <View style={styles.card}>
            <Image
              style={styles.coverImg}
              source={require("../../images/book.png")}
            />
          </View>

          <View
            style={{ marginTop: 35, marginBottom: 20, flexDirection: "row" }}
          >
            <View style={{ width: "50%" }}>
              <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                All blogs
              </Text>
            </View>
            {/* Add blog */}
            <View style={{ width: "50%", paddingLeft: 32 }}>
              <TouchableOpacity style={styles.button} onPress={BlogAddHandler}>
                <Text style={styles.buttonText}>Add blog</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={() => pullUp()} />
          }
        >
          <View style={styles.listView}>
            <FlatList
              data={blog}
              renderItem={({ item }) => (
                <View style={styles.cardList}>
                  {/* <Image
              style={styles.coverImg}
              source={require("../../images/book.png")}
            /> */}

                  <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                    {item.title}
                  </Text>
                  <Text style={{ fontSize: 16 }}>Author: {item.Author}</Text>
                  <Text style={{ fontSize: 16 }}>
                    {item.body && (
                      <Text style={{ fontSize: 16 }}>
                        {`${item.body.substring(0, 100)}...`}
                      </Text>
                    )}
                  </Text>

                  <View
                    style={{ flexDirection: "row", alignContent: "flex-start" }}
                  >
                    <View style={{ width: "50%" }}>
                      {/* <Text style={styles.buttonText}>Add blog</Text> */}
                    </View>
                    <View
                      style={{ width: "50%", paddingLeft: 60, paddingTop: 10 }}
                    >
                      <TouchableOpacity
                        style={styles.buttonRow}
                        onPress={() => BlogDetailsHandler(item)}
                      >
                        <Text style={styles.buttonText}>Explore </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
            />
          </View>
        </ScrollView>
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
    backgroundColor: "#FFDD83",
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
    backgroundColor: "#BCCEF8",
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
    flex: 1,
    paddingBottom: 200,
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

export default BlogHome;
