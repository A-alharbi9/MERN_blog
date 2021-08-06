import React, { useState } from "react";

function Main() {
  const [posts, setPosts] = useState([]);
  return (
    <div className="container">
      {/* <h1>Main</h1> */}
      {posts.length > 0 ? posts.map((post) => {}) : "No posts"}
    </div>
  );
}

export default Main;
