import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Image,
} from "react-native";
import React, { useState } from "react";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

const { height, width } = Dimensions.get("window");

const HelpScreen = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  return (
    <View>
      <View style={styles.bottomView}>
        <TextInput
          placeholder="Message"
          onChangeText={setMessage}
          value={message}
          keyboardType="default"
          style={styles.input}
        />
        <TouchableOpacity style={styles.send}>
          <MaterialIcons name="send" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.imageViewer}>
        <Image source={require("../../images/help.png")} style={styles.image} />
      </View>
    </View>
  );
};

export default HelpScreen;

const styles = StyleSheet.create({
  bottomView: {
    width: 350,
    borderRadius: 10,
    height: 50,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#bcbcbc",
    padding: 10,
  },
  input: {
    width: 200,
    height: 40,
    shadowColor: "#000000",
    borderRadius: 10,
  },
  send: {},
  image: {
    width: 200,
    height: 150,
  },
  imageViewer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
});
