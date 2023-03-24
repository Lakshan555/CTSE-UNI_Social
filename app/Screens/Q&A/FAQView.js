import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Platform,
  UIManager,
  ScrollView,
  ActivityIndicator,
  Alert,
  TextInput,
  Image,
} from "react-native";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { updateFaq } from "../../../backend/FAQController/FAQController";

const { height, width } = Dimensions.get("window");

const FAQView = ({ navigation, route }) => {
  const { setIsEdit, selecedRecord, uID } = route.params;
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [id, setId] = useState("");


  useEffect(() => {
    if (selecedRecord) {
      setQuestion(selecedRecord.question);
      setAnswer(selecedRecord.answer);
      setId(selecedRecord.id);
    }
  }, []);

  const onSubmit = async () => {
    setIsEdit(false);
    if (question && answer && id) {
      await updateFaq(id, question, answer);
      setTimeout(() => {
        navigation.navigate("InquiryChat");
      }, 200);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <View style={styles.headerText}>
          <Text style={styles.header}>Edit FAQ</Text>
          <Text style={styles.subText}>Edit Current FAQ</Text>
        </View>
        <View style={styles.headeImageView}>
          <Image
            source={require("../../images/thinking_big_question.png")}
            style={styles.headeImage}
          />
        </View>
      </View>
      <View style={styles.body}>
        <View style={styles.form}>
          <View style={styles.input}>
            <AntDesign name="questioncircleo" size={25} color="#8189B0" />
            <TextInput
              style={styles.inputInside}
              keyboardType="default"
              placeholder="Enter Question"
              onChangeText={setQuestion}
              value={question}
              multiline={true}
            />
          </View>
          <View style={styles.input}>
            <MaterialIcons name="question-answer" size={25} color="#8189B0" />
            <TextInput
              style={styles.inputInside}
              keyboardType="default"
              placeholder="Enter Answer"
              onChangeText={setAnswer}
              value={answer}
              multiline={true}
            />
          </View>

          <TouchableOpacity onPress={onSubmit}>
            <LinearGradient
              colors={["#150099", "#98C1FF"]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Save Changes</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FAQView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 0,
    backgroundColor: "#FFFFFF",
    position: "relative",
  },
  headerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {},
  headeImageView: {
    right: 10,
    top: 30,
  },
  headeImage: {
    height: 100,
    width: 180,
  },
  header: {
    top: 10,
    padding: 15,
    fontSize: 25,
    fontWeight: "bold",
  },
  subText: {
    paddingLeft: 15,
    marginTop: 5,
    color: "#5b5b5b",
  },
  body: {
    position: "absolute",
    elevation: 10,
    backgroundColor: "#EEEEEE",
    shadowColor: "#999999",
    height: "80%",
    width: "100%",
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  form: {
    top: height / 40,
    width: width,
    padding: 25,
  },
  input: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: 13,
    margin: 15,
    marginTop: 0,
    borderRadius: 10,
    shadowColor: "#bcbcbc",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 5,
  },
  inputInside: {
    paddingLeft: 10,
    width: width/1.5,
    textAlign: "justify",
    fontSize: 14,
  },
  button: {
    alignItems: "center",
    padding: 15,

    margin: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 0,
  },
  buttonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 15,
  },
});
