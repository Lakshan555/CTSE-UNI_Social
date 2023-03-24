import { database } from "../../firebase";


export const createPost = async (title, body) => {
  const postsRef = database.collection('posts');
  const newPost = {
    title: title,
    body: body,
    // userId: userId,
    createdAt: firebase.firestore.Timestamp.now(),
  };
  const postRef = await postsRef.add(newPost);
  newPost.id = postRef.id;
  return newPost;
};