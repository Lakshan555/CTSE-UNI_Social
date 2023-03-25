import { Button, Image, Modal, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import "react-native-get-random-values";
import {
  addFeedPost,
  uploadFeedPhoto,
} from "../../backend/FeedController/FeedController";
import { MaterialIcons } from "@expo/vector-icons";

const AddFeedPhoto = ({ isModalVisible, setIsModalVisible }) => {
  //
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  //
  const pickImage = async () => {
    //
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });
    //
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      const res = await fetch(result.assets[0].uri);
      const blob = await res.blob();
      const responseURL = await uploadFeedPhoto(blob);
      console.log(responseURL);
      setUrl(responseURL);
    }
  };
  //
  const addPost = async () => {
    const post = await addFeedPost({
      url,
      created: new Date().toISOString(),
      description,
      user: {
        id: 1,
        name: "Pasindu",
      },
    });
    console.log(post?.id);
  };
  //
  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={() => setIsModalVisible(false)}
      animationIn="fadeInUpBig"
      animationOut="fadeOutDownBig"
    >
      <View
        style={{
          width: '80%',
          backgroundColor: "white",
          borderRadius: 12,
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 30,
          paddingVertical: 10,
        }}
      >
        <Image
          source={{
            uri:
              image && url
                ? image
                : "https://us.123rf.com/450wm/koblizeek/koblizeek2001/koblizeek200100006/137486703-no-image-vector-symbol-missing-available-icon-no-gallery-for-this-moment.jpg?ver=6",
          }}
          style={{
            width: "100%",
            height: 300,
            marginBottom: 30,
            borderRadius: 12,
          }}
        />
        <Button title="Pick an image" onPress={pickImage} />
        <View style={styles.input}>
          <MaterialIcons name="email" size={25} color="#8189B0" />
          <TextInput
            style={styles.inputInside}
            onChangeText={setDescription}
            value={description}
            placeholder="Description"
          />
        </View>
          <Button title="ADD" onPress={addPost} />
      </View>
    </Modal>
  );
};

export default AddFeedPhoto;

const styles = StyleSheet.create({
    input: {
        flexDirection: "row",
        backgroundColor: "#F1F6FB",
        padding: 13,
        // paddingTop: 10,
        // paddingBottom: 100,
        margin: 15,
        marginTop: 20,
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
      inputInside: {
        paddingLeft: 10,
        width: '100%',
      },
});
