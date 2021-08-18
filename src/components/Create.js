import React, { useState } from "react";
import { useHistory } from "react-router";
const axios = require("axios");

function Create() {
  const [posts, setPosts] = useState({ title: "", snippet: "", body: "" });
  const [success, setSuccess] = useState(true);

  let history = useHistory();

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
    e.preventDefault();

    const newPost = {
      title: posts.title,
      snippet: posts.snippet,
      body: posts.body,
    };

    axios
      .post("/posts", newPost)
      .then(() => console.log("Success"))
      .catch((err) => console.log("Error: ", err.message));

    console.log(posts);

    history.push("/");
  };

  return (
    <div className="container">
      {success ? (
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
            rows="5"
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
      ) : (
        setSuccess(false)
      )}
    </div>
  );
}

export default Create;
