import { database } from "../../firebase";

export const createMarketItem = async (imageUrl, title, description, price) => {
  return new Promise(async (resolve, reject) => {
    try {
      const itemRef = database.collection("marketitems");
      const newitem = {
        imageUrl,
        title,
        description,
        price,
        createdAt: firebase.firestore.Timestamp.now(),
      };
      const postRef = await itemRef.add(newitem);
      newPost.id = postRef.id;
      resolve(newPost);
    } catch (err) {
      console.log("Failed to generate distances:" + JSON.stringify(err));
      reject(err);
    }
  });
};
