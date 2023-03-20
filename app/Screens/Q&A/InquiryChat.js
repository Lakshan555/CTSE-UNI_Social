import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import { useState } from "react";
import { BackgroundColor } from "../../components/Common/Colors";

const { height, width } = Dimensions.get("window");

const InquiryChat = () => {
  const [questions, setQuestions] = useState([]);
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Inquiry Chat</Text>
    </View>
  );
};

export default InquiryChat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    backgroundColor: BackgroundColor,
  },
  header:{
    justifyContent: "center",
    alignItems: "center",
  }
});
