import React, { useState } from "react";
import "./styles/App.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Offline, Online } from "react-detect-offline";
import Main from "./components/Main";
import Create from "./components/Create";
import Nav from "./components/Nav";
import Post from "./components/Post";
import Footer from "./components/Footer";
import UserSignup from "./components/user/UserSignup";
import UserLogin from "./components/user/UserLogin";
import { userContext } from "./contexts/UserContext";

function App() {
  const [userData, setUserData] = useState({});

  console.log(userData);

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
              <Route path="/user/signup" component={UserSignup} />
              <Route path="/user/login" component={UserLogin} />
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
