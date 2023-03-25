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
  Image,
  Linking,
} from "react-native";
import React from "react";

const CommunityScreen = () => {
  const handlePress = async () => {
    try {
      await Linking.openURL("fb://page/?fbid=545276284300476&set=a.545276270967144&__tn__=%3C"); 
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.communityContainer}>
        <Text style={styles.header}>
          Welcome to the Uni-Social community page!
        </Text>
        <Text style={styles.description}>
          This is the place where students, faculty, and staff can come together
          to connect, collaborate, and share their experiences at [name of
          university]. Whether you're looking for study buddies, club members,
          or just some new friends, this is the perfect platform to meet
          like-minded people.
        </Text>
        <Text style={styles.secondPara}>
          Connect and collaborate with your university community on [name of
          app]. Join groups, discover events, message others, and share updates
          all in one place. Stay connected with your peers and build meaningful
          relationships on campus.
        </Text>
        <Text style={styles.thirdPara}>
          Plus, easily connect your social media accounts to your [name of app]
          profile by adding your links to the dedicated section. Stay up-to-date
          with your friends' posts and share your own content seamlessly across
          platforms. Don't miss out on any important updates or events by
          integrating your social media feeds with the app.
        </Text>
        <Text style={styles.finalPara}>I hope this helps!</Text>
      </View>
      <View style={styles.socialIcons}>
        <TouchableOpacity onPress={handlePress}>
          <Image
            source={require("../../images/fb.png")}
            style={styles.socialIconView}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            source={require("../../images/instergram.png")}
            style={styles.socialIconView}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            source={require("../../images/twitter.png")}
            style={styles.socialIconView}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CommunityScreen;

const styles = StyleSheet.create({
  communityContainer: {},
  header: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 30,
  },
  description: {
    textAlign: "justify",
  },
  secondPara: {
    textAlign: "justify",
    marginTop: 10,
  },
  thirdPara: {
    textAlign: "justify",
    marginTop: 10,
  },
  finalPara: {
    marginTop: 10,
    textAlign: "justify",
  },
  socialIcons: {
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  socialIconView: {
    height: 50,
    width: 50,
    elevation: 10,
    shadowColor: "#bcbcbc",
  },
});
