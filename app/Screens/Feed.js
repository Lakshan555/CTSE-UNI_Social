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
  TextInput,
} from "react-native";
import React, { useState } from "react";
import Icon from "@expo/vector-icons/Ionicons";
import Modal from "react-native-modal";
import * as ImagePicker from "expo-image-picker";
// import  from "firebase/firebase";
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";
import { database, storage } from "../../firebase";
import {
  addFeedPost,
  deleteFeedPhoto,
  editFeedPost,
  getAllFeedPosts,
  uploadFeedPhoto,
} from "../../backend/FeedController/FeedController";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect } from "react";
//
// const posts = [
//   {
//     id: 1,
//     url: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8&w=1000&q=80",
//     description:
//       "lorem Ipsum is kajsdhuaid  iasudhas9d sauidi iuadi iahdiuaosd ashduiuas saihdiuas asidhiuashuahuihh as shbdu oinaosndasoindsa",
//     author: {
//       id: 1,
//       name: "Pasindu Bhasura",
//     },
//     likeCount: 22,
//     date: new Date().toDateString(),
//   },
//   {
//     id: 2,
//     url: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8&w=1000&q=80",
//     description:
//       "m joscu0wfaoifhaoda lorem Ipsum is kajsdhuaid  iasudhas9d sauidi iuadi iahdiuaosd ashduiuas saihdiuas asidhiuashuahuihh as shbdu",
//     author: {
//       id: 2,
//       name: "Kasun Kalhara",
//     },
//     likeCount: 8,
//     date: new Date().toDateString(),
//   },
//   {
//     id: 3,
//     url: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8&w=1000&q=80",
//     description:
//       "lorem Ipsum is kajsdhuaid  iasudhas9d sauidi iuadi iahdiuaosd ashduiuas saihdiuas asidhiuashuahuihh as shbdu",
//     author: {
//       id: 3,
//       name: "John Scena",
//     },
//     likeCount: 325,
//     date: new Date().toDateString(),
//   },
// ];
const Feed = () => {
  const screenHeight = Dimensions.get("screen").height;
  const windowHeight = Dimensions.get("window").height;
  const navbarHeight = screenHeight - windowHeight + StatusBar.currentHeight;
  //
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [posts, setPosts] = useState([]);
  const [postToEdit, setPostToEdit] = useState({});
  //
  useEffect(() => {
    getPostsCalls();
  }, []);
  //
  const getPostsCalls = async () => {
    const response = await getAllFeedPosts();
    setPosts(response);
  };
  //
  const pickImage = async ({ edit }) => {
    //
    console.log(edit);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });
    //
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      const feedRef = database.collection("feed");

      const res = await fetch(result.assets[0].uri);
      const blob = await res.blob();

      const responseURL = await uploadFeedPhoto(blob);
      console.log(responseURL);
      if (edit) {
        setPostToEdit({
          ...postToEdit,
          url: responseURL,
        });
      } else {
        setUrl(responseURL);
      }
    }
  };
  //
  const addPost = async () => {
    const post = await addFeedPost({
      url,
      createdAt: new Date(),
      description,
      user: {
        id: 1,
        name: "Pasindu",
      },
      likes: [],
    });
    console.log(post?.id);
    const response = await getAllFeedPosts();
    setPosts(response);
    setDescription("");
    setUrl("");
    setIsModalVisible(false);
  };
  //
  const editPost = async (id) => {
    const { url, description } = postToEdit;
    const post = await editFeedPost(id, {
      url,
      description,
    });
    console.log(post?.id);
    const response = await getAllFeedPosts();
    setPosts(response);
    setDescription("");
    setUrl("");
    setPostToEdit({});
    setIsEditModalVisible(false);
  };
  //
  return (
    <View style={{ height: "100%" }}>
      {posts && !!posts.length && (
        <FlatList
          data={posts}
          renderItem={({ item }) =>
            PostCardView({
              item,
              getAllFeedPosts,
              setPosts,
              setIsEditModalVisible,
              postToEdit,
              setPostToEdit,
              editPost,
            })
          }
          keyExtractor={(item) => item.id}
        />
      )}
      <TouchableOpacity
        style={[styles.fabContainer, { bottom: navbarHeight + 15 }]}
        onPress={() => setIsModalVisible(true)}
      >
        <View style={styles.fab}>
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
            display: "flex",
            flexDirection: "column",
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
      {/* Edit modal */}
      <Modal
        isVisible={isEditModalVisible}
        onBackdropPress={() => setIsEditModalVisible(false)}
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
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Image
            source={{
              uri: postToEdit?.url
                ? postToEdit?.url
                : "https://us.123rf.com/450wm/koblizeek/koblizeek2001/koblizeek200100006/137486703-no-image-vector-symbol-missing-available-icon-no-gallery-for-this-moment.jpg?ver=6",
            }}
            style={{
              width: "100%",
              height: 300,
              marginBottom: 30,
              borderRadius: 12,
            }}
          />
          <Button
            title="Pick an image"
            onPress={() => pickImage({ edit: true })}
          />
          <View style={styles.input}>
            {/* <MaterialIcons name="email" size={25} color="#8189B0" /> */}
            <TextInput
              style={styles.inputInside}
              onChangeText={(e) =>
                setPostToEdit({
                  ...postToEdit,
                  description: e,
                })
              }
              value={postToEdit?.description}
              placeholder="Description"
            />
          </View>
          <Button title="EDIT" onPress={() => editPost(postToEdit?.id)} />
        </View>
      </Modal>
    </View>
  );
};
//
const PostCardView = ({
  item: { id, url, description, user, likeCount, createdAt, likes },
  getAllFeedPosts,
  setPosts,
  setIsEditModalVisible,
  setPostToEdit,
  postToEdit,
}) => {
  const USER_ID = 1;
  const deletePhoto = async (id) => {
    await deleteFeedPhoto(id);
    const res = await getAllFeedPosts();
    setPosts(res);
  };
  //
  const editPhoto = async (post) => {
    console.log(post);
    setPostToEdit(post);
    setIsEditModalVisible(true);
  };
  return (
    <View style={styles.container}>
      <View
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Text style={styles.author}>{user.name}</Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {user.id === USER_ID && (
            <>
              <TouchableOpacity onPress={() => deletePhoto(id)}>
                <Icon
                  name="close"
                  size={24}
                  color="black"
                  style={{ marginRight: 15 }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  editPhoto({
                    id,
                    url,
                    description,
                    user,
                    likeCount,
                    createdAt,
                  });
                }}
              >
                <Icon name="create-outline" size={24} color="black" />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
      <Image source={{ uri: url }} style={styles.image} />
      <View style={styles.iconContainer}>
        <TouchableOpacity
          onPress={async () => {
            if (!likes?.includes(USER_ID)) {
              //add like
              likes.push(USER_ID);
              const post = await editFeedPost(id, {
                likes,
              });
              console.log(post?.id);
              const response = await getAllFeedPosts();
              setPosts(response);
            } else {
              const updatedLikes = likes.filter((l) => l !== USER_ID);
              likes.push(USER_ID);
              const post = await editFeedPost(id, {
                likes: updatedLikes,
              });
              console.log(post?.id);
              const response = await getAllFeedPosts();
              setPosts(response);
            }
          }}
        >
          {!likes?.includes(USER_ID) && <Icon name="heart-outline" size={40} />}
          {likes?.includes(USER_ID) && (
            <Icon name="heart" color="red" size={40} />
          )}
        </TouchableOpacity>
        <Text style={styles.likeCount}>{likes.length} likes</Text>
      </View>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.date}>
        {createdAt.toDate().toDateString("en-US")}
      </Text>
    </View>
  );
};
//
export default Feed;

const styles = StyleSheet.create({
  fabContainer: {
    position: "absolute",
    right: 15,
    bottom: 25,
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
    width: "100%",
  },
});
