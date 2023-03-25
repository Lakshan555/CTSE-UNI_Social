import { database, storage } from "../../firebase";
import { v4 as uuid } from "uuid";

export const uploadFeedPhoto = async (blob) => {
  const storageRef = storage.ref();
  const id = uuid();
  const feedStorageRef = storageRef.child(`feed/images/${id}`);
  //
  return await feedStorageRef.put(blob).then((snapshot) => {
    return snapshot.ref.getDownloadURL().then(async (downloadURL) => {
      return downloadURL;
    });
  });
};

export const addFeedPost = async (post) => {
  const feedRef = database.collection("feed");
  //
  const res = await feedRef.add(post);
  return res;
};

export const getAllFeedPosts = async () => {
  console.log("getting data...");
  const feedRef = database.collection("feed");
  try {
    const snapshot = await feedRef.get();
    const posts = await snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return posts;
  } catch (error) {
    console.log(error);
    alert(error);
  }
};

export const deleteFeedPhoto = async (id) => {
  console.log('deleting data...');
  const feedRef = database.collection("feed");
  try {
    const postRef = feedRef.doc(id);
    await postRef.delete();
    console.log('deleted!');
  } catch (error) {
    alert(error);
  }
};

export const editFeedPost = async (id, updatedPost) => {
  console.log('editing data...');
  const feedRef = database.collection("feed");
  try {
    const postRef = feedRef.doc(id);
    await postRef.update(updatedPost);
    console.log('data updated successfully!');
  } catch (error) {
    alert(error);
  }
};