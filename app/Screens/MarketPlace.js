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
// import { setLocationDetials } from "../../Store/actions";
const { height, width } = Dimensions.get("window");

const CardComponent = ({ title, navigation, id }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("ViewDetails", { id: id })}
    >
      <View style={styles.cardContent}>
        <View style={styles.imageContainer}>
          <Text style={styles.cardTitle}>{title}</Text>
          <View style={styles.cardMoreDetails}>
            <Pressable onPress={() => navigation.navigate("ViewDetails")}>
              <View style={styles.seeMoreContainer}>
                <Text style={styles.seeMoretext}>See more</Text>
                <Octicons
                  name="chevron-right"
                  size={11}
                  style={styles.seeMoreIcon}
                />
              </View>
            </Pressable>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

function MarketPlace({ navigation }) {
  const items = [
    {
      id: "1",
      title: "Laptop - Dell",
    },
    {
      id: "2",
      title: "Chocolates- kitkat",
    },
    {
      id: "3",
      title: "Laptop - Dell",
    },
    {
      id: "4",
      title: "Chocolates- kitkat",
    },
    {
      id: "5",
      title: "Laptop - Dell",
    },
    {
      id: "6",
      title: "Chocolates- kitkat",
    },
  ];
  const renderItem = ({ item }) => (
    <CardComponent title={item.title} navigation={navigation} id={item._id} />
  );

  const [locations, setLocations] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    // axios
    //   .get(
    //     `https://travel-buddy-research.herokuapp.com/locationDetails/location`
    //   )
    //   .then((result) => {
    //     setLocations(result.data);
    //     dispatch(setLocationDetials(result.data));
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
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
    borderColor: "#f7797d",
    borderWidth: 0.4,
  },
  // cardImage: {
  //     height: height / 8,
  //     width: "100%",
  //     borderTopRightRadius: 9,
  //     borderTopLeftRadius:9
  // },
  imageContainer: {
    height: height / 8,
    width: "100%",
    borderTopRightRadius: 9,
    borderTopLeftRadius: 9,
  },
  cardTitle: {
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
});