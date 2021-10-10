import React, { useState } from "react";
import { useHistory } from "react-router";
import swal from "@sweetalert/with-react";
const axios = require("axios");

function Create() {
  const [posts, setPosts] = useState({ title: "", snippet: "", body: "" });
  const [success, setSuccess] = useState(true);

  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      title: posts.title,
      snippet: posts.snippet,
      body: posts.body,
    };

    axios
      .post("/posts", newPost)
      .then(() =>
        swal({
          title: "Submitted Successfully",
          icon: "success",
        })
      )
      .catch((err) => {
        swal({
          title: "An error occurred",
          text: err.response.data,
          icon: "error",
        });
        console.log("Error: ", err.response.data);
      });

    console.log(posts);

    history.push("/");
  };

  return (
    <div
      className="container d-flex flex-column justify-content-center "
      style={{ height: "87vh" }}
    >
      {success ? (
        <form
          className="d-flex flex-column "
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
            className="p-2 my-2"
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
