import React, { useState, useEffect } from "react";
import "../styles/post.css";
const axios = require("axios");

function Post(props) {
  const [post, setPost] = useState([]);

  // const data = useCallback(() => fetchPostData(), [fetchPostData]);

  useEffect(() => {
    let isLoaded = false;
    const getData = () => {
      return axios
        .get(`/posts/${props.match.params.id}`)
        .then((res) => setPost(res.data))
        .catch((err) => console.log("Error: ", err.message));
    };

    // fetchPostData();
    getData();
    console.log(post);
    // return () => {
    //   isLoaded = true;
    // };
  }, [post._id]);

  // console.log(props);

  return (
    <div className="container-fluid" id="postContainer">
      {post ? (
        <div
          className="card d-flex flex-row justify-content-center  align-content-center my-3"
          id="card"
          key={post._id}
        >
          <div className="card-body body">
            <h1 className="card-title title">{post.title}</h1>
            <h4 className="card-text ">{post.body}</h4>
          </div>
        </div>
      ) : (
        "No post"
      )}
    </div>
  );
}

export default Post;
