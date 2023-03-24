import { database } from "../../firebase";
const blogCollection = database.collection("blogs");

// Create a new blog in Firestore
const createPost = async (title, body) => {
  console.log("create post", title, body);
  try {
    await blogCollection.add({
      title,
      body,
    });
  } catch (error) {
    alert(error);
  }
};

// Get all blog for a specific user from Firestore
const getBlog = async () => {
  try {
    const snapshot = await blogCollection.get();
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    alert(error);
  }
};

// Update a blog  in Firestore
const updateBlog = async (id, title, body) => {
  console.log("updateBlog", id, title, body);
  try {
    const todoRef = blogCollection.doc(id);
    const updatedata = {
      title: title,
      body: body,
    };
    await todoRef.update(updatedata);
    console.log("Todo updated successfully!");
  } catch (error) {
    alert(error);
  }
};

// Delete a blog item from Firestore
const deleteBlog = async (id) => {
  console.log(id);
  try {
    const todoRef = blogCollection.doc(id);
    await todoRef.delete();
  } catch (error) {
    alert(error);
  }
};

export { createPost, getBlog, updateBlog, deleteBlog };
