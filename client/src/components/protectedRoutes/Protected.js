import React, { useContext } from "react";
import { userContext } from "../../contexts/UserContext";
import { getCookie } from "../../utils/userCookie";

function Protected() {
  const { userData, loggedIn } = useContext(userContext);

  let user = userData;

  console.log(user);

  return (
    <div
      style={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {loggedIn ? (
        <div>
          <h1>
            Welcome
            <h2 style={{ color: "green", fontWeight: "bold" }}>
              {user.username}
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
