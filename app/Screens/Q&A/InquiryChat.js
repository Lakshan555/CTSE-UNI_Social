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
} from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { BackgroundColor } from "../../components/Common/Colors";
import { AccordionList, AccordionItem } from "react-native-accordion-list-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import {
  getFaqs,
  getAllFaqs,
  deleteFaq,
} from "../../../backend/FAQController/FAQController";
import AlertDialog from "../../components/Common/AlertDialog";

const { height, width } = Dimensions.get("window");

const InquiryChat = ({ navigation, route }) => {
  const [faqData, setFaqData] = useState([]);
  const [option, setOption] = useState("FAQs");
  const [isFAQ, setIsFAQ] = useState(false);
  const [isHelp, setIsHelp] = useState(false);
  const [isCommunity, setIsCommunity] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [model, setModel] = useState(false);
  const [recordID, setRecordID] = useState("");
  const [uID, setUID] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const getUserInfo = async () => {
    const userID = await AsyncStorage.getItem("userID");
    if (userID) {
      setUID(userID);
    }
  };

  useEffect(() => {
    getUserInfo();
    getUserData();
    fetchAllFaqs();
    if (Platform.OS === "android") {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }
    if (option === "FAQs") {
      setIsFAQ(true);
    } else {
      setIsFAQ(false);
    }
    if (option === "Help") {
      setIsHelp(true);
    } else {
      setIsHelp(false);
    }
    if (option === "Community") {
      setIsCommunity(true);
    } else {
      setIsCommunity(false);
    }
  }, [
    option,
    isFAQ,
    isHelp,
    isCommunity,
    isLoading,
    isAdd,
    isEdit,
    getUserInfo,
    getUserData,
    fetchAllFaqs,
  ]);

  const getUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem("userData");
      let userInfo = userData ? JSON.parse(userData) : null;
      if (userInfo) {
        if (userInfo.role === "admin") {
          setIsAdmin(true);
        }
      }
      // return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.log(error.message);
      return null;
    }
  };

  const fetchAllFaqs = async () => {
    setIsLoading(true);
    const faqList = await getAllFaqs();
    if (faqList.length > 0) {
      setFaqData(faqList);
      setIsLoading(false);
    }
  };

  const handleCreateView = () => {
    navigation.navigate("AddFAQ", { setIsAdd });
  };

  const handleEditView = (selecedRecord) => {
    navigation.navigate("FAQView", { selecedRecord, setIsEdit, uID });
  };

  const showAlert = (id) => {
    setIsAdd(false);
    setIsEdit(false);
    setModalVisible(true);
    setRecordID(id);
  };

  const handleCancel = () => {
    // Handle cancel logic here
    setModalVisible(false);
  };

  const hideAlert = () => {
    setModel(false);
  };

  const onDeleteToDo = async () => {
    console.log(recordID);
    setModalVisible(false);
    await deleteFaq(recordID);
  };

  // console.log(faqData)
  return (
    <View style={styles.container}>
      <View style={styles.buttonArray}>
        <TouchableOpacity
          style={styles.faqView}
          onPress={() => setOption("FAQs")}
        >
          <Text style={styles.faqText}>FAQs</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.helpView}
          onPress={() => setOption("Help")}
        >
          <Text style={styles.helpText}>Help</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.communityHelpView}
          onPress={() => setOption("Community")}
        >
          <Text style={styles.communityText}>Community</Text>
        </TouchableOpacity>
      </View>
      {isFAQ & isAdmin ? (
        <View style={styles.titleView}>
          <Text style={styles.title}>{option}</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              handleCreateView();
              setIsAdd(true);
              setIsEdit(false);
            }}
          >
            <AntDesign
              name="plus"
              size={14}
              color="black"
              style={styles.icon}
            />
            <Text style={styles.buttonText}>Add FAQ</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.commonTitleView}>
          <Text style={styles.title}>{option}</Text>
        </View>
      )}
      <View style={styles.chatList}>
        {isFAQ && faqData.length > 0 ? (
          !isAdmin ? (
            <View style={styles.listHeight}>
              <ScrollView style={styles.scrollContainer}>
                {faqData.map((item, index) => (
                  <AccordionItem
                    key={index}
                    data={faqData}
                    customTitle={() => (
                      <Text style={styles.faqTitle}>{item.question}</Text>
                    )}
                    customBody={() => <Text>{item.answer}</Text>}
                    animationDuration={400}
                    expandMultiple={true}
                    isOpen={false}
                    onPress={(isOpen) => console.log(isOpen)}
                  />
                ))}
              </ScrollView>
            </View>
          ) : (
            <View style={styles.listHeight}>
              <FlatList
                style={styles.faqListView}
                data={faqData}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      handleEditView(item);
                      setIsEdit(true);
                      setIsAdd(false);
                    }}
                    style={styles.itemButton}
                  >
                    <View style={styles.listItemView}>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={styles.itemTextView}
                      >
                        {item.question}
                      </Text>
                      <TouchableOpacity
                        onPress={() => showAlert(item.id)}
                        style={styles.deleteButton}
                      >
                        <MaterialIcons
                          name="delete-outline"
                          size={24}
                          color="red"
                          style={styles.deleteIcon}
                        />
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          )
        ) : (
          <Text>No data found</Text>
        )}

        {isLoading ? (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <View></View>
        )}
      </View>

      <AlertDialog
        visible={modalVisible}
        title="Confirm delete"
        message="Do you want to delete this FAQ?"
        cancelLabel="No"
        confirmLabel="Yes"
        onCancel={handleCancel}
        onConfirm={() => onDeleteToDo(recordID)}
      />
    </View>
  );
};

export default InquiryChat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 0,
    backgroundColor: "#FFFFFF",
  },
  buttonArray: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  faqView: {
    backgroundColor: "#7DB9B6",
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#52006A",
    padding: 10,
    height: 50,
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
  helpView: {
    backgroundColor: "#FFDD83",
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#52006A",
    padding: 10,
    height: 50,
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
  communityHelpView: {
    backgroundColor: "#BCCEF8",
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#52006A",
    padding: 10,
    height: 50,
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
  faqText: {
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 2,
  },
  helpText: {
    textAlign: "center",
    color: "#000000",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 2,
  },
  communityText: {
    textAlign: "center",
    fontWeight: "700",
    fontSize: 14,
  },
  titleView: {
    top: 10,
    marginLeft: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "#000000",
  },
  commonTitleView: {
    top: 10,
    marginLeft: 15,
  },
  chatList: {
    position: "absolute",
    bottom: 0,
    height: "73%",
    width: width,
    backgroundColor: BackgroundColor,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 10,
    // marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  listHeight: {
    height: "90%",
    bottom: 20,
  },
  faqTitle: {
    fontWeight: "700",
    top: 2,
    bottom: 2,
  },
  scrollContainer: {
    paddingVertical: "2%",
    paddingHorizontal: "3%",
    height: "50%",
    backgroundColor: BackgroundColor,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    marginTop: 20,
    width: width - 10,
  },
  faqListView: {
    marginBottom: height / 50,
    marginTop: 20,
  },
  itemButton: {
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "stretch",
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#bcbcbc",
    height: 50,
    margin: 8,
  },
  listItemView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    width: width,
  },
  itemTextView: {
    textAlign: "justify",
    // maxWidth: 200,
    maxWidth: width - 110,
  },
  loader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: {
    width: 100,
    height: 40,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#8189B0",
    borderWidth: 2,
    borderRadius: 10,
    right: 10,
  },
  buttonText: {},
  deleteButton: {
    backgroundColor: "#fff3f3",
    height: 40,
    width: 40,
    right: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  deleteIcon: {},
  alertTile: {
    justifyContent: "flex-start",
  },
  confirmButton: {
    backgroundColor: "#0066CC",
    color: "#FFFFFF",
  },
});
