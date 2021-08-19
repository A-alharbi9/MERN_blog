import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const axios = require("axios");

function Main() {
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(3);

  useEffect(() => {
    let isMounted = false;

    fetchData();

    return () => {
      isMounted = true;
    };
  }, []);

  async function fetchData() {
    await axios
      .get("/posts")
      .then((res) => setData(res.data))
      .catch((err) => console.log("Error: ", err.message));
  }
  // console.log(data);

  const showMoreBtn = (e) => {
    e.preventDefault();

    data.slice(0, visible);
  };

  const handleReadMore = (id) => {};

  return (
    <div className="container">
      {data.length > 0
        ? data.map((post) => {
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
        : "No posts"}
      <button
        className="btn btn-primary"
        onClick={(prevState) => prevState + setVisible(3)}
      >
        Show more
      </button>
    </div>
  );
}

export default Main;
