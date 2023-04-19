



// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";
// import UseBlogPosts from "../Blog00";
// import Header from "../Header";
// import Baseof from "../Baseof";
// import CustomNumberPagination from "../Pagination";
// const Blogg2 = ({ className }) => {
//     const getPosts = UseBlogPosts();

//     console.log("getPostsgetPostsgetPosts", getPosts)
//     const [itemsToShow, setItemsToShow] = useState(2);

//     const handleLoadMore = () => {
//         setItemsToShow(itemsToShow + 2);
//     };
//     return (
//         <div className={`row space-y-16 ${className}`}>
//             <Baseof title={"My blogs page"} content={"My page blogs"} key={"My blogs page"} />

//             <Header />
//             <CustomNumberPagination totalItems={getPosts && getPosts.length} itemsPerPage={2} />
//             {getPosts.slice(0, itemsToShow).map((post, i) => (
//                 <div
//                     key={`key-${i}`}
//                     className={i === 0 ? "col-12" : "col-12 sm:col-6"}
//                 >

//                     <img src={post.imgThumnai} />

//                     {/* <Image className="rounded-lg" src={post.imgThumnai} alt={"jjj"} width={i === 0 ? "925" : "445"}
//             height={i === 0 ? "475" : "230"}
//             priority={i === 0 ? true : false} /> */}

//                     <h3 className="mb-2">
//                         <Link href={`/blog/${post.pageName}`} className="block hover:text-primary">
//                             {post.title}

//                             {/* {post.frontmatter.title} */}
//                         </Link>
//                     </h3>
//                     <p className="text-text">
//                         {post.para && post.para}
//                     </p>
//                 </div>
//             ))}
//             {itemsToShow < getPosts.length && (
//                 <button className="btn btn-primary" onClick={handleLoadMore}>
//                     Load More
//                 </button>
//             )}
//         </div>
//     );
// };

// export default Blogg2;


import React, { useState } from "react";
import UseBlogPosts from "../Blog00";
import Header from "../Header";
import Baseof from "../Baseof";
import Link from "next/link";
import 'bootstrap/dist/css/bootstrap.min.css';

const CustomNumberPagination = () => {
    const getPosts = UseBlogPosts();
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate the total number of pages
    const totalPages = Math.ceil(getPosts.length / 2);

    // Calculate the index range for the current page
    const startIndex = (currentPage - 1) * 2;
    const endIndex = startIndex + 2;

    // Get the data for the current page
    const currentPageData = getPosts.slice(startIndex, endIndex);

    // Function to handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <div>
                {/* Render data for the current page */}
                <Baseof title={"My blogs page"} content={"My page blogs"} key={"My blogs page"} />

                <Header />
                {currentPageData.map((item, i) => (
                    <div
                        key={`key-${i}`}
                        className={i === 0 ? "col-12" : "col-12 sm:col-6"}
                    >

                        <img src={item.imgThumnai} />

                        {/* <Image className="rounded-lg" src={post.imgThumnai} alt={"jjj"} width={i === 0 ? "925" : "445"}
                       height={i === 0 ? "475" : "230"}
                       priority={i === 0 ? true : false} /> */}

                        <h3 className="mb-2 bloggg">
                            <Link href={`/blog/${item.pageName}`} className="block hover:text-primary">
                                {item.title}

                                {/* {post.frontmatter.title} */}
                            </Link>
                        </h3>
                        <p className="text-text">
                            {item.para && item.para}
                        </p>
                    </div>
                ))}
            </div>
            <div>
                <button
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    Previous
                </button>
                {/* Generate page numbers */}
                {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                    (page) => (
                        <button
                            key={page}
                            className={currentPage === page ? "active" : ""}
                            onClick={() => handlePageChange(page)}
                        >
                            {page}
                        </button>
                    )
                )}
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default CustomNumberPagination;

