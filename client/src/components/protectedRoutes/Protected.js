import React, { useContext } from "react";
import { userContext } from "../../contexts/UserContext";

function Protected() {
  const { userData } = useContext(userContext);
  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {userData ? (
        <div>
          <h1>
            Welcome
            <h2 style={{ color: "green", fontWeight: "bold" }}>
              {userData.username}
            </h2>
          </h1>
        </div>
      ) : (
        <div>
          <h1>Nope</h1>
        </div>
      )}
    </div>
  );
}

export default Protected;
