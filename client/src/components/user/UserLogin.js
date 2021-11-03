import React, { useState, useContext } from "react";
import swal from "@sweetalert/with-react";
import { login } from "../../api/index";
import { userContext } from "../../contexts/UserContext";
import { useHistory } from "react-router";
import Cookies from "js-cookie";

function UserLogin() {
  const { userData, setUserData } = useContext(userContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    let newLogin = {
      email: formData.email,
      password: formData.password,
    };

    console.log("LLLLL: ", newLogin);

    login(newLogin)
      .then((res) => {
        console.log("res: ", res);

        const user = JSON.stringify(res.data.user);

        setUserData(res.data.user);

        Cookies.set("user", user);
      })
      .then(() => {
        swal({
          title: "logged in Successfully",
          icon: "success",
        });

        history.push("/");
      })
      .catch((err) => {
        swal({
          title: "An error occurred",
          text: err.message,
          icon: "error",
        });

        console.log("Error: ", err.status);
      });

    // e.target.reset();

    // setFormData({
    //   firstName: "",
    //   lastName: "",
    //   email: "",
    //   password: "",
    // });
  };

  return (
    <div
      className="container d-flex flex-column justify-content-center my-5 p-5"
      style={{ height: "60vh" }}
    >
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="emailInput">Email:</label>
          <input
            type="email"
            className="form-control text-center"
            id="emailInput"
            name="email"
            placeholder="Please enter your email"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value.toLowerCase() })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="passwordInput">Password:</label>
          <input
            type="password"
            className="form-control text-center"
            id="passwordInput"
            name="password"
            placeholder="Please enter your password"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>
        <button type="submit" id="subBtn" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default UserLogin;
