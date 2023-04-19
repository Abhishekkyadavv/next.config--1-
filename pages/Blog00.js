import { useEffect, useState } from "react";
import { db } from '../firebase/clientApp';
import { collection, addDoc, getDocs } from 'firebase/firestore';


function UseBlogPosts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getPosts = async () => {
            const postsCollection = collection(db, "blogs");
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

    return posts;
}

export default UseBlogPosts;