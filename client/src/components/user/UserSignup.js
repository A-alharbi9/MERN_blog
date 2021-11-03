import React, { useState, useContext } from "react";
import swal from "@sweetalert/with-react";
import { signUp } from "../../api/index";
import { userContext } from "../../contexts/UserContext";
import { useHistory } from "react-router";

function UserSignup() {
  const { setUserData } = useContext(userContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    let newSigning = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };

    console.log("FFFFF: ", newSigning);

    signUp(newSigning)
      .then((res) => {
        console.log("res: ", res);
        console.log("data: ", res.data);
        setUserData(res.data);
      })
      .then(() => {
        swal({
          title: "Submitted Successfully",
          icon: "success",
        });

        history.push("/user/login");
      })
      .catch((err) => {
        swal({
          title: "An error occurred",
          text: err.response.message,
          icon: "error",
        });
        console.log("Error: ", err.msg);
      });

    // e.target.reset();

    setFormData({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <div
      className="container d-flex flex-column justify-content-center my-5 p-5"
      style={{ height: "70vh" }}
    >
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstNameInput">First Name:</label>
          <input
            type="text"
            className="form-control text-center"
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
            className="form-control text-center"
            id="lastNameInput"
            name="lastName"
            placeholder="Please enter your last name"
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            className="form-control text-center"
            id="username"
            name="username"
            placeholder="Please enter your user name"
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
        </div>
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

export default UserSignup;
