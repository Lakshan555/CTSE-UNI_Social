import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Icon from "@expo/vector-icons/Ionicons";

const posts = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8&w=1000&q=80",
    description: "oinaosndasoindsa",
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
    description: "m joscu0wfaoifhaoda",
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
    description: "lorem Ipsum is kajsdhuaid  iasudhas9d sauidi iuadi iahdiuaosd ashduiuas saihdiuas asidhiuashuahuihh as shbdu ",
    author: {
      id: 3,
      name: "John Scena",
    },
    likeCount: 325,
    date: new Date().toDateString(),
  },
];
const Feed = () => {
  return (
    <View>
      {posts && !!posts.length && (
        <FlatList
          data={posts}
          renderItem={PostCardView}
          keyExtractor={(item) => item.id}
        />
      )}
      <TouchableOpacity style={styles.fabContainer}>
        <View style={styles.fab}>
          <Icon name="add" size={40} color="white" />
        </View>
      </TouchableOpacity>
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
        {/* <Icon name="heart-outline" size={40}/> */}
        <Icon name="heart" color="red" size={40} />
        <Text style={styles.date}>{date}</Text>
      </View>
      <Text style={styles.likeCount}>{likeCount} likes</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};
//
export default Feed;

const styles = StyleSheet.create({
  fabContainer: {
    position: "absolute",
    right: 15,
    bottom: 15,
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
  },
  description: {
    fontSize: 16,
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: "grey",
  },
  author: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 15,
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
