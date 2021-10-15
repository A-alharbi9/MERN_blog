import React, { useState, useContext } from "react";
import swal from "@sweetalert/with-react";
import { login } from "../../api/index";
import { userContext } from "../../contexts/UserContext";

function UserLogin() {
  const { userData, setUserData } = useContext(userContext);

  console.log(userData);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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
        setUserData(res.data);
      })
      .then(() => {
        swal({
          title: "logged in Successfully",
          icon: "success",
        });
      })
      .catch((err) => {
        swal({
          title: "An error occurred",
          text: err.message,
          icon: "error",
        });
        console.log("Error: ", err.response.data);
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
              setFormData({ ...formData, email: e.target.value })
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
