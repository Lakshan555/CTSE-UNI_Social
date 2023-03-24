import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
const { height, width } = Dimensions.get("window");
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const MyItemDetails = ({ route }) => {
  const onUpdate = () => {
    console.log("onUpdate");
  };
  const onDelete = () => {
    console.log("onDelete");
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageConatiner}>
        {/* <Image source={{ uri: location.image }} style={styles.locationImage} /> */}
      </View>
      <View style={styles.inputCon}>
        <View style={styles.input}>
          <MaterialIcons name="app-registration" size={25} color="#8189B0" />
          <TextInput
            style={styles.inputInside}
            // onChangeText={setDriverName}
            // value={driverName}
            placeholder="Item Name"
          />
        </View>
        <View style={styles.input}>
          <MaterialIcons name="article" size={25} color="#8189B0" />
          <TextInput
            style={styles.inputInside}
            multiline={true}
            // onChangeText={setDriverName}
            // value={driverName}
            placeholder="Description"
          />
        </View>
        <View style={styles.input}>
          <MaterialIcons name="money" size={25} color="#8189B0" />
          <TextInput
            style={styles.inputInside}
            keyboardType="number"
            // onChangeText={setDriverName}
            // value={driverName}
            placeholder="Price"
          />
        </View>
        <View style={styles.btnCon}>
          <View>
            <TouchableOpacity
              // style={styles.button}
              onPress={onUpdate}
            >
              <LinearGradient
                colors={["#150099", "#98C1FF"]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Update Item</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              // style={styles.button}
              onPress={onDelete}
              style={styles.delbutton}
            >
              <Text style={styles.buttonText}>Delete Item</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MyItemDetails;

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
  delbutton: {
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
    backgroundColor: "red",
  },
  buttonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 15,
  },
  inputCon: {
    width: "100%",
  },
  btnCon: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
