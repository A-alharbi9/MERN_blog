import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const axios = require("axios");

function Main() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(3);

  useEffect(() => {
    let isMounted = false;

    async function fetchData() {
      await axios
        .get("http://localhost:5000/posts")
        .then((res) => setData(res.data))
        .then(() => setLoading(false))
        .catch((err) => console.log("Error: ", err.message));
    }

    fetchData();

    return () => {
      isMounted = true;
    };
  }, []);

  // console.log(data);

  const showMoreBtn = (e) => {
    e.preventDefault();
    let showMoreBtn = document.querySelector("#showMoreBtn");

    if (visible > data.length) {
      showMoreBtn.classList.add("d-none");
    }

    setVisible((prevState) => prevState + 3);
  };

  const handleReadMore = (id) => {};

  return (
    <div className="container">
      {data.length > 0 ? (
        data.slice(0, visible).map((post) => {
          return (
            <div className="card my-3 text-center" key={post._id}>
              <div className="card-body">
                <h4 className="card-title">{post.title}</h4>
                <p className="card-subtitle text-muted">{post.snippet}</p>
              </div>
              <button className="btn btn-primary" onClick={handleReadMore}>
                <Link
                  className="btn btn-primary"
                  key={post._id}
                  to={`/posts/${post._id}`}
                >
                  Read more
                </Link>
              </button>
            </div>
          );
        })
      ) : (
        <div
          className="text-center d-flex flex-column justify-content-center align-items-center"
          style={{ height: "87vh" }}
        >
          <div
            className="spinner-border "
            style={{ width: "3rem", height: "3rem" }}
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
      {loading ? (
        ""
      ) : (
        <button
          className="btn btn-primary hidden"
          id="showMoreBtn"
          onClick={showMoreBtn}
        >
          Show more
        </button>
      )}
    </div>
  );
}

export default Main;
