import React, { useEffect } from "react";
const axios = require("axios");

function Create() {
  useEffect(() => {
    const btn = document.querySelector("#btn");
    const titleVal = document.querySelector("#title");
    const snippetVal = document.querySelector("#snippet");
    const bodyVal = document.querySelector("#body");
    btn.addEventListener("click", () => {
      axios
        .post("/create", {
          title: titleVal,
          snippet: snippetVal,
          body: bodyVal,
        })
        .then(() => {
          console.log("Success!");
        })
        .catch((err) => {
          console.log("Error: ", err.name);
        });
    });
  }, []);

  return (
    <div className="container">
      <form className="d-flex flex-column">
        <h1>Create</h1>
        <input
          id="title"
          className="text-center my-2"
          type="text"
          placeholder="Title"
          required
        />
        <input
          id="snippet"
          className="text-center my-2"
          type="text"
          placeholder="Snippet"
          required
        />
        <textarea id="body"></textarea>
      </form>
      <button id="btn" type="submit" className="my-2 p-1 rounded">
        Submit
      </button>
    </div>
  );
}

export default Create;
