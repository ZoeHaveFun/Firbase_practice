import { useRef, useState } from 'react';
import './App.css';
import { initializeApp } from "firebase/app";
import { collection, addDoc, getDocs, getFirestore} from "firebase/firestore";

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

const Title = ({titleRef}) => {
  return (
    <>
      <label htmlFor="text" className="">Title</label>
      <input type="text" id="title" ref={titleRef}/>
    </>
  )
}

const Content = ({contentRef}) =>{
  return (
    <>
      <label htmlFor="text" className="">Content</label>
      <textarea type="text" id="content" ref={contentRef}/>
    </>
  )
}

const Tags = ({selectTag, setSelectTag}) => {
  return (
    <>
      <label htmlFor="text" className="">Tags</label>
      <div id="toggel">
        <span 
        className={ `tag ${selectTag === "Beauty" ? "active" : ""}`} 
        onClick={(e) => setSelectTag(e.target.textContent)}>Beauty</span>
        <span 
        className={ `tag ${selectTag === "Gossiping" ? "active" : ""}`} 
        onClick={(e) => setSelectTag(e.target.textContent)}>Gossiping</span>
        <span 
        className={ `tag ${selectTag === "SchoolLife" ? "active" : ""}`} 
        onClick={(e) => setSelectTag(e.target.textContent)}>SchoolLife</span>
      </div>
    </>
  )
}

const App = () => {
  const [selectTag, setSelectTag] = useState("Beauty")
  const titleRef = useRef(null)
  const contentRef = useRef(null)

  const handleTime = () => {
    const timestamp  = new Date()
    // const timestamp  = Date.now()
    // const date = new Date(timestamp);
    // const created_time = date.getDate()+
    // "/"+ (date.getMonth()+1)+
    // "/"+ date.getFullYear()+
    // " "+ date.getHours()+
    // ":"+ date.getMinutes()+
    // ":"+ date.getSeconds()
    return timestamp
  }

  const postArticle = () => {
    console.log(handleTime());
    try {
      addDoc(collection(db, "article"), {
        author_id: "Zoe",
        title: titleRef.current.value,
        content: contentRef.current.value,
        tag: selectTag,
        created_time:handleTime()
      }) 
      .then(async() => {
        const querySnapshot = await getDocs(collection(db, "article"));
        querySnapshot.forEach((doc) => {
          console.log(`${doc.id} =>`, doc.data());
        });
      })
      .then(()=> {
        titleRef.current.value=""
        contentRef.current.value=""
      })
    
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  return(
    <>
      <h1>Publish Article</h1>
      <Title titleRef={titleRef}/>
      <Content contentRef={contentRef}/>
      <Tags selectTag={selectTag} setSelectTag={setSelectTag}/>
      <button onClick={postArticle}>POST</button>
    </>
  )
}

export default App;
