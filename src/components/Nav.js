import React from "react";
import "../styles/Nav.css";

function Nav({ itemOne, itemTwo, itemThree, itemFour }) {
  // const toggleIt = document.querySelector(".navbar-toggler");
  // const collapseIt = document.querySelector(".navbar-collapse");

  // console.log(toggleIt);

  // toggleIt.addEventListener("click", () => {
  //   console.log("clicked");
  //   collapseIt.classList.toggle(".show");
  // });
  document.addEventListener("click", (e) => {
    if (e.target.closest(".navbar-nav")) {
      e.target.classList.toggle(".active");
    }
  });

  return (
    <nav className="navbar text-center navbar-expand-lg navbar-dark bg-dark ">
      <a className="navbar-brand " href="#">
        Brand
      </a>
      <button
        className="navbar-toggler collapsed"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
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
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
