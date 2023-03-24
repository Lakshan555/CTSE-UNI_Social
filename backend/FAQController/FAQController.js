import { database } from "../../firebase";

// Firestore collection
const faqCollection = database.collection("faqs");

// Create a new faq item in Firestore
const addFaq = async (question, answer) => {
  try {
    await faqCollection.add({
      question,
      answer,
    });
  } catch (error) {
    alert(error);
  }
};

// Get all Faqs from Firestore
const getAllFaqs = async () => {
  try {
    const snapshot = await faqCollection.get();
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    alert(error);
  }
};

// Get all Faq items for a specific user from Firestore
const getFaqs = async (userId) => {
  try {
    const snapshot = await faqCollection.where("userId", "==", userId).get();
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    alert(error);
  }
};

// Update a Faq item in Firestore
const updateFaq = async (id, newQuestion, newAnswer) => {
  try {
    const todoRef = faqCollection.doc(id);
    const updatedata = {
        question: newQuestion,
        answer: newAnswer
      };
    await todoRef.update(updatedata);
    console.log('Todo updated successfully!');
  } catch (error) {
    alert(error);
  }
};

// Delete a Faq item from Firestore
const deleteFaq = async (id) => {
  try {
    const todoRef = faqCollection.doc(id);
    await todoRef.delete();
  } catch (error) {
    alert(error);
  }
};

export { addFaq, getAllFaqs,getFaqs, updateFaq, deleteFaq };
