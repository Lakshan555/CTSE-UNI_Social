import { database } from "../../firebase";
const itemRef = database.collection("marketitems");

export const createMarketItem = async (imageUrl, title, description, price) => {
  console.log(`createMarketItem :`, imageUrl, title, description, price);
  return new Promise(async (resolve, reject) => {
    try {
      const newitem = {
        imageUrl,
        title,
        description,
        price,
        uid: "xcyIXi4bQHb12kWaENLBdPbk3di2",
      };
      const postRef = await itemRef.add(newitem);
      newitem.id = postRef.id;
      resolve(newitem);
    } catch (err) {
      console.log("Failed to add new item:" + JSON.stringify(err));
      reject(err);
    }
  });
};

export const getAllMarketItems = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const snapshot = await itemRef.get();
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

export const getMyItems = async (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const snapshot = await itemRef.where("uid", "==", userId).get();
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      resolve(data);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

export const updateItem = async (id, imageUrl, title, description, price) => {
  console.log("update items : ", id, imageUrl, title, description, price);
  return new Promise(async (resolve, reject) => {
    try {
      const todoRef = itemRef.doc(id);
      const updatedata = {
        imageUrl,
        title,
        description,
        price,
      };
      const data = await todoRef.update(updatedata);
      console.log("Todo updated successfully!");
      resolve(data);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

export const deleteItem = async (id) => {
  return new Promise(async (resolve, reject) => {
    console.log("id: ", id);
    try {
      const todoRef = itemRef.doc(id);
      const data = await todoRef.delete();
      resolve(data);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
