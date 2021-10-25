import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { userContext } from "../contexts/UserContext";
import "../styles/Nav.css";

function Nav({ itemOne, itemTwo, itemThree, itemFour }) {
  const { userData } = useContext(userContext);

  return (
    <nav className="navbar text-center navbar-expand-lg navbar-dark bg-dark ">
      <a className="navbar-brand " href="#">
        Brand
      </a>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mx-auto col-lg-8">
          <li className="nav-item  ">
            <a className="nav-link" href="#">
              {itemOne}
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              {itemTwo}
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              {itemThree}
            </a>
          </li>
          <li className="nav-item ">
            <a className="nav-link" href="#">
              {itemFour}
            </a>
          </li>
          <div className="mx-4">
            {userData.username !== undefined ? (
              <div className="d-flex justify-content-center ">
                <h6
                  style={{ color: "white" }}
                >{`Welcome, ${userData.username}`}</h6>
                <Link
                  className="btn btn-light mx-2"
                  id="logoutBtn"
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              </div>
            ) : (
              <>
                <Link className="btn btn-success mx-2" to="/user/signup">
                  Sign Up
                </Link>
                <Link className="btn btn-light mx-2" to="/user/login">
                  Login
                </Link>
              </>
            )}
          </div>
        </ul>
      </div>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
    </nav>
  );
}

export default Nav;