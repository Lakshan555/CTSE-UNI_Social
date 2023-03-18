import { StyleSheet, Text, View } from "react-native";
import Constants from "expo-constants";

const Header = ({prop1, prop2 }) => {

  return (
    <View style={styles.header}>
      <Text style={styles.textStyleHeaderType}>{prop1}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: "white",
    width: "100%",
    paddingTop: Constants.statusBarHeight,
    justifyContent: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    zIndex: 5,
  },
  textStyleHeaderType: {
    padding: 15,
    fontSize: 18,
    fontWeight: "900",
  },
});
