import { useEffect, useState } from "react";

import { collection, query, where, getDocs } from 'firebase/firestore';
import { useRouter } from "next/router";
import { db } from "../../firebase/clientApp";
import Header from "../Header";
import Head from "next/head";
import Baseof from "../Baseof";
import 'bootstrap/dist/css/bootstrap.min.css';

const PageNo = ({ title, description, meta_title, image, noindex, canonical, content }) => {

    const router = useRouter();

    const [posts, setPosts] = useState([]);
    const [val, setCValData] = useState([]);


    const getBlogPost = async () => {
        const pageQuery = router.query.pageNo.toString();
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
        setPosts(blogPost[0].data);
        setCValData(blogPost[0])
    };
    useEffect(() => {
        if (router.query.pageNo) {
            getBlogPost();
        }
    }, [router.query.pageNo]);

    console.log("wwwww", posts);
    return (



        <>

            <Baseof title={router.query.pageNo} content={`is${router.query.pageNo}`} key={router.query.pageNo} />

            <Header />
            {posts && posts.map((res) => {
                return <>
                    <h3>{res.type == "heading" ? res.heading : ""}</h3>
                    <img src={res.type == "image" ? res.media.url : ""} />
                    <p>{res.type == "text" ? res.text : ""}</p>

                </>
            })}
        </>






    )
}

export default PageNo