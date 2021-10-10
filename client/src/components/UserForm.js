import React, { useState } from "react";
import swal from "@sweetalert/with-react";
const axios = require("axios");
const { signUpUser } = require("../api/index");
const { signInUser } = require("../api/index");

function UserForm(props) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [signUp, setSignUp] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    let newSigning = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    };

    console.log(signUp);

    {
      signUp
        ? signUpUser(newSigning)
            .then((res) =>
              localStorage.setItem(
                "userProfile",
                JSON.stringify(res.data.token)
              )
            )
            .then(() =>
              swal({
                title: "Submitted Successfully",
                text: "You can login now",
                icon: "success",
              })
            )
            .catch((err) => {
              swal({
                title: "An error occurred",
                text: err.message.json,
                icon: "error",
              });
              console.log("Error: ", err);
            })
        : signInUser(newSigning)
            .then((res) => verifyToken(res))
            .then(() =>
              swal({
                title: "Submitted Successfully",
                icon: "success",
              })
            )
            .catch((err) => {
              swal({
                title: "An error occurred",
                text: err.message.json,
                icon: "error",
              });
              console.log("Error: ", err);
            });
    }

    // console.log(formData);
    // console.log(props);

    e.target.reset();

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
  };
  const handleClick = () => {
    const formValues = document.querySelectorAll("input");

    formValues.values = " ";
  };

  const verifyToken = (ele) => {
    try {
      if (!ele.data.token) {
        return "No Token Was Found!";
      }
      if (ele.data.token) {
        localStorage.setItem("userProfile", JSON.stringify(ele.data.token));
      }
    } catch (error) {
      swal({
        title: "An error occurred",
        text: error.message.json,
        icon: "error",
      });
      console.log(error);
    }
  };

  return (
    <div className="container my-5 p-5">
      <div className="p-2">
        <button
          className="btn btn-outline-secondary btn-lg btn-block active mx-2"
          id="formBtn"
          onClick={() => setSignUp((prevState) => !prevState)}
        >
          {signUp ? "Sign In" : "Sign Up"}
        </button>
      </div>
      <hr />
      <form onSubmit={handleSubmit}>
        {signUp ? (
          <>
            <div className="form-group">
              <label htmlFor="firstNameInput">First Name:</label>
              <input
                type="text"
                class="form-control text-center"
                id="firstNameInput"
                name="firstName"
                placeholder="Please enter your first name"
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastNameInput">Last Name:</label>
              <input
                type="text"
                class="form-control text-center"
                id="lastNameInput"
                name="lastName"
                placeholder="Please enter your last name"
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label htmlFor="emailInput">Email:</label>
              <input
                type="email"
                class="form-control text-center"
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
                type="passwprd"
                class="form-control text-center"
                id="passwordInput"
                name="password"
                placeholder="Please enter your password"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
            <button
              type="submit"
              id="subBtn"
              className="btn btn-primary"
              onClick={handleClick}
            >
              Submit
            </button>
          </>
        ) : (
          <>
            <div className="form-group">
              <label htmlFor="emailInput">Email:</label>
              <input
                type="email"
                class="form-control text-center"
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
                type="passwprd"
                class="form-control text-center"
                id="passwordInput"
                name="password"
                placeholder="Please enter your password"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
            <button
              type="submit"
              id="subBtn"
              className="btn btn-primary"
              onClick={handleClick}
            >
              Submit
            </button>
          </>
        )}
      </form>
    </div>
  );
}

export default UserForm;
