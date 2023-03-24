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

const BlogHome = ({ navigation }) => {
  const [blog, setBlogs] = useState([
    {
      id: 1,
      title: "Test long name for the title",
      Author: "Ishanka",
      blog: "Lorem ipsum is placeholders text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.",
    },
    {
      id: 2,
      title: "title1",
      Author: "Ishanka",
      blog: "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.",
    },
    {
      id: 3,
      title: "title2",
      Author: "Ishanka",
      blog: "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.",
    },
    { id: 4, title: "title3", Author: "Ishanka" },
    {
      id: 4,
      title: "title5",
      Author: "Ishanka",
      blog: "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.",
    },
    {
      id: 4,
      title: "title5",
      Author: "Ishanka",
      blog: "Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.",
    },
  ]);
  const BlogDetailsHandler = (item) => {
    console.log(item);
    navigation.navigate("blogDetails", {
      item: item,
    });
  };
  const BlogAddHandler = () => {
    navigation.navigate("blogForm");
  };

  return (
    <View style={styles.screen}>
      <Header prop1="sss" />
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
            <View style={{ width: "50%", paddingLeft: 32 }}>
              <TouchableOpacity style={styles.button}  onPress={BlogAddHandler}>
                <Text style={styles.buttonText}>Add blog</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <ScrollView>
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
                    {item.blog && (
                      <Text style={{ fontSize: 16 }}>
                        {`${item.blog.substring(0, 100)}...`}
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
