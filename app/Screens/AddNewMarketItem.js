import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from "react-native";
import React from "react";
const { height, width } = Dimensions.get("window");
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { createMarketItem } from "../../backend/PostController/MarketItemController";
import * as Firebase from "firebase";
import { firebaseConfig } from "../../firebase";

const AddNewMarketItem = () => {
  const [title, setTilte] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState();
  const [uploading, setUploading] = useState(false);
  const [downloadURL, setDownloadURL] = useState(null);
  const [imageUploaded, setImageUploaded] = useState(false);

  const onSubmit = async () => {
    await createMarketItem(downloadURL, title, description, price)
      .then((res) => {
        Alert.alert("Successful", "Item Added successful", [{ text: "OK" }]);
      })
      .catch((err) => {
        console.log("err : " + err);
        Alert.alert("Failed", "Item Added Failed", [{ text: "OK" }]);
      });
  };

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
    <View style={styles.container}>
      <Text style={styles.topic}>New Market Item Details</Text>
      <View style={styles.imageConatiner}>
        <TouchableOpacity style={styles.addImagebtn} onPress={uploadImage}>
          <Image
            source={
              image === null
                ? require("../images/add_image.png")
                : { uri: image }
            }
            style={styles.locationImage}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.inputCon}>
        <View style={styles.input}>
          <MaterialIcons name="app-registration" size={25} color="#8189B0" />
          <TextInput
            style={styles.inputInside}
            onChangeText={setTilte}
            // value={driverName}
            placeholder="Item Name"
          />
        </View>
        <View style={styles.input}>
          <MaterialIcons name="article" size={25} color="#8189B0" />
          <TextInput
            style={styles.inputInside}
            multiline={true}
            onChangeText={setDescription}
            // value={driverName}
            placeholder="Description"
          />
        </View>
        <View style={styles.input}>
          <MaterialIcons name="money" size={25} color="#8189B0" />
          <TextInput
            style={styles.inputInside}
            keyboardType="number"
            onChangeText={setPrice}
            // value={driverName}
            placeholder="Price"
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
              <Text style={styles.buttonText}>Add to market</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AddNewMarketItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width / 23,
    paddingTop: height / 60,
  },
  topic: {
    fontSize: 20,
    fontWeight: "bold",
  },
  imageConatiner: {
    width: "100%",
    height: "40%",
    elevation: 15,
    borderRadius: 9,
  },
  inputInside: {
    paddingLeft: 10,
  },
  input: {
    flexDirection: "row",
    backgroundColor: "#F1F6FB",
    padding: 13,
    // paddingTop: 10,
    // paddingBottom: 100,
    margin: 15,
    marginTop: 0,
    borderRadius: 4,
    borderColor: "#8189B0",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 0,
  },
  button: {
    alignItems: "center",
    // backgroundColor:
    //   linear - gradient("92.44deg, #FFA803 -164.05%, #FFD12E 98.37%"),
    padding: 15,

    margin: 15,
    borderRadius: 4,
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
  inputCon: {
    width: "100%",
  },
  locationImage: {
    width: "100%",
    height: "100%",
  },
  addImagebtn: {
    width: "100%",
    height: "100%",
  },
});
