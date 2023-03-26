import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  createPost,
  updateBlog,
} from "../../../backend/PostController/Postcontroller";
import Header from "../../components/Common/Header";

const EditBlog = ({ route, navigation }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [id, setIdUpdate] = useState("");
  // console.log({ id });

  // const blog = route.params.item.blog;
  // const blogId = route.params.item.id;
  console.log("EditBlog", route.params.singleData.blogId);

  useEffect(() => {
    const blogTitle = route.params.singleData.title;
    const blogBody = route.params.singleData.body;
    const id = route.params.singleData.blogId;

    setTitle(blogTitle);
    setBody(blogBody);
    setIdUpdate(id);
  }, []);

  const item = { title, body, id };

  const onSubmit = async () => {
    if (title && body) {
      console.log(title);
      console.log(body);
      await updateBlog(id, title, body);
      setTimeout(() => {
        navigation.navigate("blogDetails", {
          item,
        });
      }, 200);
    }
  };

  useEffect(async () => {
    const userID = await AsyncStorage.getItem("userID");
    console.log(userID, "userID");
    if (userID) {
      setId(userID);
    }
  }, []);

  return (
    <View style={styles.screen}>
      <Header prop1="EDIT BLOG" />
      <View style={styles.body}>
        <View>
          <View>
            {/* <MaterialIcons name="email" size={25} color="#8189B0" /> */}
            <TextInput
              style={styles.input}
              onChangeText={setTitle}
              value={title}
              placeholder="title"
            />
          </View>
          <View style={styles.input2}>
            {/* <MaterialIcons name="email" size={25} color="#8189B0" /> */}
            <TextInput
              style={styles.inputInside}
              onChangeText={setBody}
              value={body}
              multiline
              placeholder="Tell your story…"
            />
          </View>
          <View>
            <TouchableOpacity
              // style={styles.button}
              onPress={onSubmit}
            >
              <LinearGradient
                colors={["#150099", "#98C1FF"]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Post</Text>
              </LinearGradient>
            </TouchableOpacity>
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

  buttonText: {
    color: "black",
    fontWeight: "900",
  },
  input: {
    backgroundColor: "white",
    padding: 8,
    // paddingTop: 10,
    // paddingBottom: 100,
    margin: 10,
    marginTop: 10,
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
  input2: {
    backgroundColor: "white",
    padding: 15,
    // paddingTop: 10,
    paddingBottom: 100,
    margin: 10,
    marginTop: 10,
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
  button: {
    alignItems: "center",
    // backgroundColor:
    //   linear - gradient("92.44deg, #FFA803 -164.05%, #FFD12E 98.37%"),
    padding: 15,
    margin: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 0,
  },
  buttonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 15,
  },
});

export default EditBlog;
