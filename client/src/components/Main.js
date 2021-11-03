import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const axios = require("axios");

function Main() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBtn, setShowBtn] = useState(false);
  const [visible, setVisible] = useState(3);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    await axios
      .get("/posts")
      .then((res) => {
        setData(res.data);
        if (res.data.length > 0) {
          setShowBtn(true);
        }
        console.log(res.data.length);
      })
      .then(() => setLoading(false))
      .catch((err) => console.log("Error: ", err.message));
  }

  const showMoreBtn = (e) => {
    e.preventDefault();
    let showMoreBtn = document.querySelector("#showMoreBtn");

    if (visible > data.length) {
      showMoreBtn.classList.add("d-none");
    }

    setVisible((prevState) => prevState + 3);
  };

  if (loading) {
    return (
      <div
        className="text-center d-flex flex-column justify-content-center align-items-center"
        style={{ minHeight: "87vh" }}
      >
        <div
          className="spinner-border "
          style={{ width: "3rem", height: "3rem" }}
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container " style={{ minHeight: "87vh" }}>
      {data.length > 0 ? (
        data.slice(0, visible).map((post) => {
          return (
            <div className="card my-3 text-center" key={post._id}>
              <div className="card-body">
                <h4 className="card-title">{post.title}</h4>
                <p className="card-subtitle text-muted">{post.snippet}</p>
              </div>
              <button className="btn btn-primary">
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
          className="alert alert-warning d-flex flex-column justify-content-center align-items-center align-content-center"
          role="alert"
          style={{ minHeight: "57vh" }}
        >
          <div className="text-center d-flex flex-column justify-content-center align-items-center">
            There are no posts.
          </div>
          <Link to="/create" type="button" class="btn btn-success">
            Add post
          </Link>
        </div>
      )}

      {showBtn && (
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
