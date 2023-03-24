import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Button,
} from "react-native";
import React, { useState } from "react";
import Icon from "@expo/vector-icons/Ionicons";
import Modal from "react-native-modal";
import * as ImagePicker from "expo-image-picker";
import { getFirestore, collection, addDoc } from "firebase/firestore/lite";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../../firebaseConfig";
import 'react-native-get-random-values';
import { v4 as uuid } from 'uuid';
//
const posts = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8&w=1000&q=80",
    description:
      "lorem Ipsum is kajsdhuaid  iasudhas9d sauidi iuadi iahdiuaosd ashduiuas saihdiuas asidhiuashuahuihh as shbdu oinaosndasoindsa",
    author: {
      id: 1,
      name: "Pasindu Bhasura",
    },
    likeCount: 22,
    date: new Date().toDateString(),
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8&w=1000&q=80",
    description:
      "m joscu0wfaoifhaoda lorem Ipsum is kajsdhuaid  iasudhas9d sauidi iuadi iahdiuaosd ashduiuas saihdiuas asidhiuashuahuihh as shbdu",
    author: {
      id: 2,
      name: "Kasun Kalhara",
    },
    likeCount: 8,
    date: new Date().toDateString(),
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8&w=1000&q=80",
    description:
      "lorem Ipsum is kajsdhuaid  iasudhas9d sauidi iuadi iahdiuaosd ashduiuas saihdiuas asidhiuashuahuihh as shbdu",
    author: {
      id: 3,
      name: "John Scena",
    },
    likeCount: 325,
    date: new Date().toDateString(),
  },
];
const Feed = () => {
  const screenHeight = Dimensions.get("screen").height;
  const windowHeight = Dimensions.get("window").height;
  const navbarHeight = screenHeight - windowHeight + StatusBar.currentHeight;
  //
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [image, setImage] = useState(null);
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
      const db = getFirestore(app);
      const storage = getStorage(app);
      const id = uuid();
      const imagesRef = ref(storage, `feed/images/${id}`);
      const res = await fetch(result.assets[0].uri);
      const blob = await res.blob();
      //
      uploadBytes(imagesRef, blob)
      .then(() => {
        getDownloadURL(imagesRef)
        .then(url => {
          const imagesCol = collection(db, "feed");
          addDoc(imagesCol, {
            url,
          }).then(() => {
            console.log("Image added!");
            console.log(url);
          });
        });
        ;
      });
    }
  };
  //
  return (
    <View>
      {posts && !!posts.length && (
        <FlatList
          data={posts}
          renderItem={PostCardView}
          keyExtractor={(item) => item.id}
        />
      )}
      <TouchableOpacity
        style={[styles.fabContainer, { bottom: navbarHeight + 15 }]}
        onPress={() => setIsModalVisible(true)}
      >
        <View style={[styles.fab]}>
          <Icon name="add" size={40} color="white" />
        </View>
      </TouchableOpacity>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}
        animationIn="fadeInUpBig"
        animationOut="fadeOutDownBig"
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            borderRadius: 12,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 30,
            paddingVertical: 10,
          }}
        >
          <Image
            source={{
              uri: image
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
          <Button title="Pick an image from camera roll" onPress={pickImage} />
        </View>
      </Modal>
    </View>
  );
};
//
const PostCardView = ({
  item: { id, url, description, author, likeCount, date },
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.author}>{author.name}</Text>
      <Image source={{ uri: url }} style={styles.image} />
      <View style={styles.iconContainer}>
        <TouchableOpacity>
          {/* <Icon name="heart-outline" size={40}/> */}
          <Icon name="heart" color="red" size={40} />
        </TouchableOpacity>
        <Text style={styles.likeCount}>{likeCount} likes</Text>
      </View>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.date}>{date}</Text>
    </View>
  );
};
//
export default Feed;

const styles = StyleSheet.create({
  fabContainer: {
    position: "absolute",
    right: 15,
  },
  fab: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: "blue",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 500,
    borderRadius: 12,
    resizeMode: "contain",
  },
  container: {
    width: "100%",
    padding: 15,
    backgroundColor: "white",
  },
  description: {
    fontSize: 16,
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: "grey",
  },
  likeCount: {
    fontWeight: "800",
  },
  author: {
    fontSize: 16,
    fontWeight: "800",
    marginTop: 10,
    marginBottom: 8,
  },
  iconContainer: {
    marginTop: 15,
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
