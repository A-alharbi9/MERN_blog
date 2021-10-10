import React, { useState } from "react";
import "./styles/App.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Offline, Online } from "react-detect-offline";
import Main from "../src/components/Main";
import Create from "../src/components/Create";
import Nav from "../src/components/Nav";
import Post from "./components/Post";
import Footer from "./components/Footer";
import UserForm from "./components/UserForm";
import { userContext } from "./Contexts/UserContext";

function App() {
  const [userData, setUserData] = useState({});
  const [userSignUp, setuserSignUp] = useState(false);

  return (
    <userContext.Provider value={{ userData, setUserData }}>
      <Router>
        <div className="App">
          <Nav
            itemOne="Home"
            itemTwo="Posts"
            itemThree="Contact"
            itemFour="About"
          />
          <Online>
            <Switch>
              <Route path="/" exact component={Main} />
              <Route path="/posts/:id" exact component={Post} />
              <Route path="/create" component={Create} />
              <Route path="/user" component={UserForm} />
            </Switch>
          </Online>
          <Offline>
            <div
              className="container d-flex flex-column justify-content-center"
              style={{ height: "87vh" }}
            >
              <h1>Offline</h1>
            </div>
          </Offline>
          <Footer />
        </div>
      </Router>
    </userContext.Provider>
  );
}

export default App;
