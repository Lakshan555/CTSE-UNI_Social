import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import { useDispatch } from "react-redux";
import { Login } from "../store/actions";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const { height, width } = Dimensions.get("window");
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  auth,
  logInWithEmailAndPassword,
  getUserRoleByEmail,
  registerWithEmailAndPassword,
} from "../../backend/userController";

const RegisterScreen = ({ navigation, route }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const dispatch = useDispatch();

  const onSubmit = async () => {
    if (username && email && password) {
      const user = await registerWithEmailAndPassword(
        username,
        email,
        role,
        password
      );
      if (user) {
        const res = await getUserRoleByEmail(user.email);
        // console.log(res);
        await AsyncStorage.setItem("userData", JSON.stringify(res));
        dispatch(Login(username, password));
        navigation.navigate("tabNavigator");
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.logo}>
        <Image size={80} source={require("../images/logo.png")} />
      </View>
      <View style={styles.textInputContainer}>
        <View style={styles.input}>
          <MaterialIcons name="people" size={25} color="#8189B0" />
          <TextInput
            style={styles.inputInside}
            onChangeText={setUsername}
            value={username}
            placeholder="Username"
          />
        </View>
        <View style={styles.input}>
          <MaterialIcons name="email" size={25} color="#8189B0" />
          <TextInput
            style={styles.inputInside}
            onChangeText={setEmail}
            value={email}
            placeholder="Email"
          />
        </View>
        <View style={styles.input}>
          <MaterialCommunityIcons
            name="form-textbox-password"
            size={24}
            color="#8189B0"
          />
          <TextInput
            secureTextEntry={true}
            style={styles.inputInside}
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
          />
        </View>
        <View>
          <TouchableOpacity
            // style={styles.button}
            onPress={onSubmit}
          >
            <LinearGradient
              colors={["#150099", "#98C1FF"]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        <View style={styles.newAcc}>
          <Text>Already registered? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text style={styles.newAccText}>logged in to account.</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: width / 17,
    paddingTop: height / 13,
    backgroundColor: "white",
  },
  logo: {
    justifyContent: "center",
    alignItems: "center",
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
    width: width,
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
  buttonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 15,
  },
  textInputContainer: {
    width: "100%",
    height: "20%",
    marginTop: "10%",
  },
  forget: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 15,
  },
  forgetText: {
    color: "#150099",
  },
  newAcc: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  newAccText: {
    color: "#150099",
  },

  usernameContainer: {
    width: "100%",
    height: "50%",
    flexDirection: "row",
  },
  passwordContainer: {
    width: "100%",
    height: "50%",
    flexDirection: "row",
  },
  textInputStyle: {
    width: "100%",
    height: "55%",
    borderRadius: 9,
    borderWidth: 1,
  },
  iconStyles: {
    width: "10%",
    height: "100%",
  },
  textInputViewStyle: {
    width: "90%",
    marginLeft: "2%",
  },
  textStyleHeader: {
    fontSize: 25,
    fontWeight: "bold",
    color: "gray",
  },
  textStyleHeaderType: {
    fontSize: 80,
    marginBottom: "19%",
    fontWeight: "bold",
    color: "gray",
  },
  touchableOpacityStyle: {
    width: "100%",
    height: "22%",
    borderColor: "#39367e",
    borderRadius: 9,
    borderWidth: 1,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
  },
  touchableOpacityView: {
    width: "100%",
    alignItems: "center",
  },
  touchableTextStyle: {
    fontWeight: "bold",
    fontSize: 18,
  },
  inputboxCon: {
    width: "100%",
    height: "35%",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: "4%",
  },
  labelCon: {
    width: "30%",
    backgroundColor: "#39367e",
    borderTopLeftRadius: 9,
    borderBottomLeftRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  inputFieldCon: {
    width: "70%",
  },
  labelName: {
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  textInputStyle: {
    width: "100%",
    height: "100%",
    borderTopRightRadius: 9,
    borderBottomRightRadius: 9,
    borderWidth: 1,
    borderColor: "#39367e",
  },
  needAcctxt: {
    marginTop: "8%",
  },
});
