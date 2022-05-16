import './App.css';
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { collection, addDoc } from "firebase/firestore";

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
// const db = getFirestore(app);

const Title = () => {
  return (
    <>
      <label htmlFor="text" className="">Title</label>
      <input type="text" id="title" />
    </>
  )
}

const Content = () =>{
  return (
    <>
      <label htmlFor="text" className="">Content</label>
      <textarea type="text" id="content" />
    </>
  )
}

const Tags = () => {
  return (
    <>
      <label htmlFor="text" className="">Tags</label>
      <div id="toggel">
        <span className="tag">Beauty</span>
        <span className="tag active">Gossiping</span>
        <span className="tag">SchoolLife</span>
      </div>
    </>
  )
}

const App = () => {

  return(
    <>
      <h1>Publish Article</h1>
      <Title/>
      <Content/>
      <Tags />
      <button>POST</button>
    </>
  )
}

export default App;
