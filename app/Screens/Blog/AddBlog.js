import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { createPost } from "../../../backend/PostController/Postcontroller";
import Header from "../../components/Common/Header";

//for image
import * as Firebase from "firebase";
import * as ImagePicker from "expo-image-picker";

const AddBlog = ({ route, navigation }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  console.log(title);
  console.log(body);

  const onSubmit = async () => {
    if (title && body) {
      console.log(title);
      console.log(body);
      await createPost(title, body);
      setTimeout(() => {
        navigation.navigate("blogHome");
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

  const [image, setImage] = useState();
  const [uploading, setUploading] = useState(false);
  const [downloadURL, setDownloadURL] = useState(null);
  const [imageUploaded, setImageUploaded] = useState(false);

  const uploadImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.uri);
    }
    const imageUpload = await uploadToFirebase();
  };

  const uploadToFirebase = async () => {
    console.log("Uploading to Firebase...", image);
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", image, true);
      xhr.send(null);
    });

    const ref = Firebase.storage().ref().child(new Date().toString());
    const snapshot = ref.put(blob);

    snapshot.on(
      Firebase.storage.TaskEvent.STATE_CHANGED,
      () => {
        setUploading(true);
      },
      (error) => {
        setUploading(false);
        console.log("error - ", error);
        blob.close();
        return;
      },
      () => {
        snapshot.snapshot.ref.getDownloadURL().then((url) => {
          setUploading(false);
          console.log("Download url - ", url);
          setDownloadURL(url);
          setImageUploaded(true);
          blob.close();
          return url;
        });
      }
    );
  };

  return (
    <View style={styles.screen}>
      <Header prop1="Test Detols pAge" />
      <View style={styles.body}>
        <View>
          <View>
            {/* <MaterialIcons name="email" size={25} color="#8189B0" /> */}
            <TextInput
              style={styles.input}
              onChangeText={setTitle}
              value={title}
              placeholder="Title"
            />
          </View>
          <View>
            {/* <MaterialIcons name="email" size={25} color="#8189B0" /> */}
            <TextInput
              style={styles.input2}
              onChangeText={setBody}
              value={body}
              multiline
              placeholder="Tell your story…"
            />
          </View>
          <View style={styles.imageContainer}>
            <TouchableWithoutFeedback
              style={styles.addImagebtn}
              onPress={uploadImage}
            >
              <Image
                source={
                  image === null
                    ? require("../../../app/images/add_image.png")
                    : { uri: image }
                }
                style={styles.locationImage}
              />
            </TouchableWithoutFeedback>
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
  addImagebtn: {
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    width: "95%",
    height: "40%",
    margin: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    borderRadius: 9,
  },
  locationImage: {
    width: "100%",
    height: "100%",
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

export default AddBlog;
