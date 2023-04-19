
import { setDoc, collection, doc, getDocs, } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
// import { Button } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import Link from 'next/link';
// import Posts from '@layouts/partials/Posts';
// import UseBlogPosts from './page/GetPosts';
import 'bootstrap/dist/css/bootstrap.min.css';

import { db } from '../firebase/clientApp';
import Header from './Header';

const FirstPage = () => {
  const [bodyData, sedbodyData] = useState(
    [{
      "id": "",
      "pageName": "",
      "createAt": new Date().toDateString(),
      "title": "",
      "imgThumnai": "",
      "para": ""
    }]
  );
  const [loader, setLoader] = useState(false);
  const [open, setOpen] = useState(false);

  const SubmitBtn = async (value) => {
    setLoader(true);
    const uniqueId = uuidv4();
    const boddy = bodyData;
    const boddt = bodyData;
    boddy[0].id = uniqueId
    boddt[0].data = "";
    const docRef = doc(db, 'blogs', uniqueId);

    const docRef2 = doc(db, 'blog', uniqueId);
    // var pushData2 = {

    // }
    // sedbodyData(prevItems => [...prevItems, pushData2]);


    setDoc(docRef, boddy[0])
      .then(() => {
        setDoc(docRef2, boddt[0])
        setOpen(false)
        setLoader(false);


      })
      .catch((error) => {
        setOpen(false)
        setLoader(false);

        console.error("Error adding document: ", error);
      });

  };
  const handleChange = (value, type) => {

    const newData = [...bodyData];
    console.log("newData", newData)
    console.log("val", value)
    if (type == "Url") {
      bodyData[0].imgThumnai = value;
      sedbodyData(newData);
    }
    if (type == "Title") {


      bodyData[0].title = value;
      bodyData[0].pageName = value;

      sedbodyData(newData);
    }

    if (type == "Text") {
      bodyData[0].para = value;
      sedbodyData(newData);
    }

  }
  console.log("bodyData", bodyData)
  const [posts, setPosts] = useState([]);
  var postData;

  useEffect(() => {
    const getPosts = async () => {
      const postsCollection = collection(db, "blog");
      const postsSnapshot = await getDocs(postsCollection);
      const postsList = postsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsList);
      console.log("gg", postsList)
    };
    getPosts();

  }, []);
  console.log("postsposts", posts);
  return (
    <>

      <Header />
      <button onClick={() => setOpen(true)}
      >Add</button><br></br>

      {open ?
        <div className="popup-container">
          <div className='addform'>
            <h2 className='titleis'>Add Data</h2>
            <a href='#' className='cross' onClick={() => setOpen(false)}>X</a>
            <input type='text' placeholder='Url' onChange={(e) => handleChange(e.target.value, "Url")} />
            <input type='text' placeholder='Title' onChange={(e) => handleChange(e.target.value, "Title")} />
            <input type='text' placeholder='Text' onChange={(e) => handleChange(e.target.value, "Text")} />
            {loader ? "Loading..." : <><button onClick={SubmitBtn}>Submit</button><br></br><br></br><br></br></>}
          </div>
        </div>
        : ""}

      {posts && posts.map((data, i) => {
        return <div className='showtext' key={i}>
          <p className='dateshow'>{data.createAt}</p>
          <Link href={`/blog/PageAdd?val=${data.title}`}><h3 className='titleshow'>{data.title}</h3></Link><br></br><br></br><br></br>

          {/* <p>{data.pageName}</p> */}
          <p className='para'>{data.para}</p>
        </div>
      })}
    </>

  )
}

export default FirstPage


