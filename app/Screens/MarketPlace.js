import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { Octicons } from "@expo/vector-icons";
// import axios from "axios";
import { useDispatch } from "react-redux";
import { getAllMarketItems } from "../../backend/PostController/MarketItemController";
// import { setLocationDetials } from "../../Store/actions";
const { height, width } = Dimensions.get("window");

const CardComponent = ({
  title,
  image,
  description,
  price,
  navigation,
  id,
}) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("MarketPlaceViewDetails", {
          id: id,
          title: title,
          description: description,
          image: image,
          price: price,
        })
      }
    >
      <View style={styles.cardContent}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.cardImage} />

          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.price}>{price}</Text>
          <View style={styles.cardMoreDetails}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("MarketPlaceViewDetails", {
                  id: id,
                  title: title,
                  description: description,
                  image: image,
                  price: price,
                })
              }
            >
              <View style={styles.seeMoreContainer}>
                <Text style={styles.seeMoretext}>See more</Text>
                <Octicons
                  name="chevron-right"
                  size={11}
                  style={styles.seeMoreIcon}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

function MarketPlace({ navigation }) {
  const renderItem = ({ item }) => (
    <CardComponent
      title={item.title}
      image={item.imageUrl}
      price={item.price}
      description={item.description}
      navigation={navigation}
      id={item._id}
    />
  );

  const [marketItems, setMarketItmes] = useState([]);

  useEffect(() => {
    getAllMarketItems()
      .then((res) => {
        console.log("successfully fetched all items : ", res);
        setMarketItmes(res);
      })
      .catch((err) => {
        console.log("err : " + err);
        Alert.alert("Failed", "Item Added Failed", [{ text: "OK" }]);
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.myMarketContainer}>
        <TouchableOpacity
          style={styles.myBtn}
          onPress={() => navigation.navigate("MyMarketItems")}
        >
          <Text style={styles.addTxt}>My Market</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => navigation.navigate("AddNewMarketItem")}
        >
          <Text style={styles.addTxt}>+ Add</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={marketItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        style={styles.marketList}
      />
    </View>
  );
}

export default MarketPlace;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: width / 23,
    paddingTop: height / 60,
  },
  marketPlacePageTopic: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardContent: {
    width: width / 2.3,
    height: height / 5,
    marginTop: height / 45,
    borderRadius: 9,
    borderColor: "#8189B0",
    borderWidth: 0.4,
  },
  cardImage: {
    height: height / 10,
    width: "100%",
    borderTopRightRadius: 9,
    borderTopLeftRadius: 9,
  },
  imageContainer: {
    height: height / 8,
    width: "100%",
    borderTopRightRadius: 9,
    borderTopLeftRadius: 9,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  locationContainer: {
    flexDirection: "row",
    marginTop: height / 300,
  },
  cardMoreDetails: {
    paddingHorizontal: width / 46,
  },
  locationName: {
    fontSize: 12,
    marginLeft: width / 60,
  },
  seeMoreContainer: {
    flexDirection: "row",
    marginTop: height / 500,
    marginHorizontal: width / 40,
  },
  seeMoretext: {
    fontSize: 10,
    marginLeft: width / 60,
  },
  seeMoreIcon: {
    marginTop: height / 490,
    marginLeft: width / 90,
  },
  weatherConatiner: {
    width: "100%",
    height: "8%",
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "2%",
  },
  weatherTxt: {
    fontSize: 22,
    fontWeight: "bold",
  },
  backgroundVideo: {
    position: "absolute",
    height: "100%",
    width: "100%",
    borderRadius: 9,
  },
  marketList: {
    marginBottom: height / 8,
  },
  myMarketContainer: {
    width: "100%",
    height: "6%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  addBtn: {
    width: "20%",
    height: "90%",
    borderRadius: 9,
    padding: "2%",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#8189B0",
    borderWidth: 2,
  },
  myBtn: {
    width: "40%",
    height: "90%",
    borderRadius: 9,
    padding: "2%",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#8189B0",
    borderWidth: 2,
  },
  price: {
    fontSize: 12,
    textAlign: "center",
  },
});
