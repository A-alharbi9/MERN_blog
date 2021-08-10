import React, { useEffect, useState } from "react";
const axios = require("axios");
const createPosts = require("../api/index");

function Create() {
  const [posts, setPosts] = useState({ title: "", snippet: "", body: "" });

  // useEffect(() => {
  //   const btn = document.querySelector("#btn");
  //   const titleVal = document.querySelector("#title");
  //   const snippetVal = document.querySelector("#snippet");
  //   const bodyVal = document.querySelector("#body");
  //   btn.addEventListener("click", () => {
  //     axios
  //       .post("/create", {
  //         title: titleVal,
  //         snippet: snippetVal,
  //         body: bodyVal,
  //       })
  //       .then(() => {
  //         console.log("Success!");
  //       })
  //       .catch((err) => {
  //         console.log("Error: ", err.name);
  //       });
  //   });
  // }, []);

  const handleSubmit = (e) => {
    const newPost = {
      title: posts.title,
      snippet: posts.snippet,
      body: posts.body,
    };

    e.preventDefault();
    axios
      .post("http://localhost:5000/posts", newPost)
      .then(() => console.log("Success"))
      .catch((err) => console.log("Error: ", err.message));

    // createPosts.createPost(posts);
    // // console.log(createPosts.createPost);
    console.log("Form");
  };

  return (
    <div className="container">
      <form
        className="d-flex flex-column"
        method="post"
        onSubmit={handleSubmit}
      >
        <h1>Create</h1>
        <input
          id="title"
          className="text-center my-2"
          type="text"
          placeholder="Title"
          required
          onChange={(e) => setPosts({ ...posts, title: e.target.value })}
        />
        <input
          id="snippet"
          className="text-center my-2"
          type="text"
          placeholder="Snippet"
          required
          onChange={(e) => setPosts({ ...posts, snippet: e.target.value })}
        />
        <textarea
          id="body"
          onChange={(e) => setPosts({ ...posts, body: e.target.value })}
        ></textarea>
        <button
          id="btn"
          type="submit"
          className="btn btn-primary btn-sm my-2 p-1 rounded w-30"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Create;
