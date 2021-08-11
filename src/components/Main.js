import React, { useEffect, useState } from "react";
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
  }, [data]);

  async function fetchData() {
    await axios
      .get("/posts")
      .then((res) => setData(res.data))
      .catch((err) => console.log("Error: ", err.message));
  }
  console.log(data);

  const showMoreBtn = (e) => {
    e.preventDefault();

    data.slice(0, visible);
  };

  const handleReadMore = () => {};

  return (
    <div className="container">
      {data.length > 0
        ? data.map((post) => {
            return (
              <div className="card my-3" key={post._id}>
                <div className="card-body">
                  <h3 className="card-title">{post.title}</h3>
                  <h6 className="card-subtitle text-muted">{post.snippet}</h6>
                </div>
                <button className="btn btn-primary" onClick={handleReadMore()}>
                  <a className="btn btn-primary" href="/posts" target="_blank">
                    Read more
                  </a>
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
