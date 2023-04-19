import { addDoc, collection, query, where, getDocs, getDoc, doc, updateDoc } from 'firebase/firestore';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import Link from "next/link";
import { db } from '../../firebase/clientApp';

const PageAdd = () => {
    const [Jsondata, sedtJsonData] = useState(
        []
    );

    function addArray(type) {
        var pushData = {
            "id": 5,
            "type": type,
            "heading": type == "heading" ? "" : null,
            "para": type == "text" ? "" : null,
            "media": type == "media" || type == "video" || type == "image" ? {
                "url": "",
                "thumbnail": ""
            } : null,
        }

        sedtJsonData(prevItems => [...prevItems, pushData]);


    }
    console.log("json", Jsondata);
    const handleChange = (index, value, type) => {
        const newData = [...Jsondata];
        if (type == "Heading") {
            newData[index].heading = value;
            sedtJsonData(newData);
        }
        if (type == "Image") {
            newData[index].media.url = value;
            sedtJsonData(newData);
        }
        if (type == "Video") {
            newData[index].media.url = value;
            sedtJsonData(newData);
        }
        if (type == "Text") {
            newData[index].text = value;
            sedtJsonData(newData);
        }

    }




    const router = useRouter();
    const [post, setPost] = useState(null);

    const getBlogPost = async () => {
        const pageQuery = router.query.val.toString();
        const blogRef = collection(db, "blog");
        const q = query(blogRef, where("pageName", "==", pageQuery));
        const querySnapshot = await getDocs(q);
        const blogPost = querySnapshot.docs.map((doc) => {
            return {
                id: doc.data().id,
                title: doc.data().title,
                data: doc.data().data,

                createAt: doc.data().createAt,
                para: doc.data().para,
                imgThumnai: doc.data().imgThumnai,


            };
        });
        { blogPost }
        sedtJsonData(blogPost[0].data);
        setPost(blogPost);
    };
    const [loader, setLoader] = useState(false)
    function updateFunction(id) {
        setLoader(true)
        const docRef = doc(db, 'blog', id);
        updateDoc(docRef, {
            data: Jsondata,
        }).then((res) => {
            setLoader(false)

        })
    }

    useEffect(() => {
        if (router.query.val) {
            getBlogPost();
        }
    }, [router.query.val]);


    if (!post) {
        return <div>Loading...</div>;
    }
    console.log("postpostpostfffff", post)

    return (
        <>
            <h1>Blog Application</h1>
            <h3>{post && post[0].title}</h3>
            <>
                <input type='text' placeholder='Enter Title' />
                {Jsondata && Jsondata.map((res, index) => {
                    console.log(res.type)
                    return <div key={index}>
                        {/* <h1>Blog Application</h1> */}
                        {res.type == "heading" ?
                            <input type='text' defaultValue={res.heading} onChange={(e) => handleChange(index, e.target.value, "Heading")} placeholder='Heading' /> : ""}
                        {res.type == "image" ?
                            <input type='text' defaultValue={res.media.url} onChange={(e) => handleChange(index, e.target.value, "Image")} placeholder='Image' /> : ""}
                        {res.type == "video" ?
                            <input type='text' defaultValue={res.media.url} onChange={(e) => handleChange(index, e.target.value, "Video")} placeholder='Video' /> : ""}
                        {res.type == "text" ?
                            <input type='text' defaultValue={res.heading} onChange={(e) => handleChange(index, e.target.value, "Text")} placeholder='Text' /> : ""}

                    </div>

                })}
            </>
            <br></br> <button onClick={() => addArray("video")}>Video</button><br></br>
            <button onClick={() => addArray("image")}>Image</button><br></br>
            <button onClick={() => addArray("text")}>Text</button><br></br>
            <button onClick={() => addArray("heading")}>Heading</button><br></br>
            {/* <Button onClick={() => SubmitBtn()}>Submit</Button><br></br> */}
            {loader ? "Loading..." :
                <>
                    <button onClick={() => updateFunction(post[0].id)}>SUBMIT</button><br></br>

                </>
            }
        </>

    )
}

export default PageAdd