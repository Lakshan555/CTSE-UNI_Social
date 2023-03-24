import { auth, database } from "../firebase";

// Firestore collection
const usersCollection = database.collection("users");

// Firebase user login
const logInWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await auth.signInWithEmailAndPassword(
      email,
      password
    );
    const user = userCredential.user;
    const userData = await usersCollection.doc(user.uid).get();
    return { ...user, ...userData.data() };
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// Create new user in Firebase Firestore
const registerWithEmailAndPassword = async (
  userName,
  email,
  password,
  role
) => {
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(
      email,
      password
    );
    const user = userCredential.user;
    await usersCollection.doc(user.uid).set({
      userName: user.userName,
      email: user.email,
      uid: user.uid,
      role: user.role,
    });
    return user;
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const getUserRoleByEmail = async (email) => {
  try {
    const querySnapshot = await usersCollection
      .where("email", "==", email)
      .get();
    if (!querySnapshot.empty) {
      const user = querySnapshot.docs[0].data();
      return user;
    }
    return null;
  } catch (error) {
    alert(err.message);
  }
};

// logout
const logout = async () => {
  try {
    await auth.signOut();
    return true;
  } catch (error) {
    alert(err.message);
  }
};

export {
  auth,
  registerWithEmailAndPassword,
  logInWithEmailAndPassword,
  getUserRoleByEmail,
  logout,
};
