import { initializeApp } from "firebase/app";
import { collection, addDoc, getDocs, getFirestore, onSnapshot, query} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCF2Xq_9O1KeSoXu9aYlF6TrlW9j5N4qJw",
  authDomain: "fir-practice-g1.firebaseapp.com",
  projectId: "fir-practice-g1",
  storageBucket: "fir-practice-g1.appspot.com",
  messagingSenderId: "695933513514",
  appId: "1:695933513514:web:ec83e43e6d5266effc3853",
  measurementId: "G-NNZJEE34QC"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const firebaseFun = {
  tableName: "article",
  postSnapshot(callback) {
    return onSnapshot(collection(db, firebaseFun.tableName), callback)
  },
  post(postData) {
    try {
      addDoc(collection(db, firebaseFun.tableName), {
        author_id: postData.author_id,
        title: postData.title,
        content: postData.content,
        tag: postData.tag,
        created_time: postData.created_time
      }) 
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

}