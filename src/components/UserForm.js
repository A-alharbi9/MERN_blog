import React, { useState } from "react";

function UserForm() {
  const [signUp, setSignUp] = useState(true);

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
      <form>
        {signUp ? (
          <>
            <div className="form-group">
              <label for="firstNameInput">First Name:</label>
              <input
                type="text"
                class="form-control text-center"
                id="firstNameInput"
                placeholder="Please enter your first name"
              />
            </div>
            <div className="form-group">
              <label for="lastNameInput">Last Name:</label>
              <input
                type="text"
                class="form-control text-center"
                id="lastNameInput"
                placeholder="Please enter your last name"
              />
            </div>
            <div className="form-group">
              <label for="emailInput">Email:</label>
              <input
                type="email"
                class="form-control text-center"
                id="emailInput"
                placeholder="Please enter your email"
              />
            </div>
            <div className="form-group">
              <label for="passwordInput">Password:</label>
              <input
                type="passwprd"
                class="form-control text-center"
                id="passwordInput"
                placeholder="Please enter your password"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </>
        ) : (
          <>
            <div className="form-group">
              <label for="emailInput">Email:</label>
              <input
                type="email"
                class="form-control text-center"
                id="emailInput"
                placeholder="Please enter your email"
              />
            </div>
            <div className="form-group">
              <label for="passwordInput">Password:</label>
              <input
                type="passwprd"
                class="form-control text-center"
                id="passwordInput"
                placeholder="Please enter your password"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </>
        )}
      </form>
    </div>
  );
}

export default UserForm;
