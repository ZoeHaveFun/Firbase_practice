import './App.css';
import { useEffect, useRef, useState } from 'react';
import { firebaseFun } from './firebase.js';

const Title = ({titleRef}) => {
  return (
    <>
      <label htmlFor="text" className="">Title</label>
      <input type="text" id="title" placeholder="Enter title..." ref={titleRef}/>
    </>
  )
}

const Content = ({contentRef}) =>{
  return (
    <>
      <label htmlFor="text" className="">Content</label>
      <textarea type="text" id="content" placeholder="Enter content..." ref={contentRef}/>
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
  const [articles, setArticles] = useState([])
  const titleRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const handleUpdate = (data) => {
      const newData = handleArticles(data)
      setArticles(newData)
    }
    return firebaseFun.postSnapshot(handleUpdate)
  }, [])

  const handleArticles = (data) => {
    let newData = []
    data.forEach((doc) => {
      let object = doc.data()
      object.id = doc.id
      newData.push(object);
    });
    console.log(newData);
    return newData
  }

  const handleTime = () => {
    const timestamp  = Date.now()

    const date = new Date(timestamp);
    const created_time = date.getDate()+
    "/"+ (date.getMonth()+1)+
    "/"+ date.getFullYear()+
    " "+ String(date.getHours()).padStart(2, '0') +
    ":"+ String(date.getMinutes()).padStart(2, '0')+
    ":"+ String(date.getSeconds()).padStart(2, '0')

    return created_time
  }

  const handlePost = () => {
    if (!titleRef.current.value || !contentRef.current.value) {
      return
    }
    const postData = {}
    postData.author_id = "Zoe"
    postData.title = titleRef.current.value
    postData.content = contentRef.current.value
    postData.tag = selectTag
    postData.created_time = handleTime()

    firebaseFun.post(postData)

    titleRef.current.value=""
    contentRef.current.value=""
  }

  return(
    <>
      <div className='postform'>
        <h1>I WANNA POST </h1>
        <Title titleRef={titleRef}/>
        <Content contentRef={contentRef}/>
        <Tags selectTag={selectTag} setSelectTag={setSelectTag}/>
        <button onClick={handlePost}>POST</button>
      </div>
      <div className='articles'></div>
    </>
  )
}

export default App;
