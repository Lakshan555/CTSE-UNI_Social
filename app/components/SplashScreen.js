import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar, Button } from "react-native-paper";

const { height, width } = Dimensions.get("window");

const SplashScreen = ({ navigation, route }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.accTypeSelection}>
        <TouchableOpacity
          style={styles.optionPress}
          onPress={() => navigation.navigate("Login")}
        >
          <View style={styles.optionCon}>
            <Image size={120} source={require("../images/logo2.png")} />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: width / 17,
    // paddingBottom: height / 13,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  accTypeSelection: {
    width: "100%",
    height: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
  optionCon: {
    margin: "4%",
    justifyContent: "center",
    alignItems: "center",
  },
  accTypeTxt: {
    marginTop: "15%",
    fontSize: 20,
    fontWeight: "bold",
    color: "gray",
  },
});
