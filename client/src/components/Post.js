import React, { useState, useEffect } from "react";
import "../styles/post.css";
const axios = require("axios");

function Post(props) {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isLoaded = false;

    const getData = () => {
      return axios
        .get(`/posts/${props.match.params.id}`)
        .then((res) => setPost(res.data))
        .then(() => setLoading(false))
        .catch((err) => console.log("Error: ", err.message));
    };

    getData();

    isLoaded = true;
  }, []);

  return (
    <div className="container-fluid" id="postContainer">
      {post ? (
        <div className="card my-3" id="card" key={post._id}>
          <div className="card-body body">
            <h1 className="card-title title" id="post postTitle">
              {post.title}
            </h1>
            <h4
              className="card-text d-flex flex-row justify-content-center  align-content-center "
              id="post postBody"
            >
              {post.body}
            </h4>
          </div>
        </div>
      ) : (
        <div
          class="text-center d-flex flex-column justify-content-center align-items-center"
          style={{ height: "87vh" }}
        >
          <div
            class="spinner-border "
            style={{ width: "3rem", height: "3rem" }}
            role="status"
          >
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Post;
