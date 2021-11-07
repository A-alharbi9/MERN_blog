import React, { useState, useEffect } from "react";
import "./styles/App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Offline, Online } from "react-detect-offline";
import Main from "./components/Main";
import Create from "./components/Create";
import Nav from "./components/Nav";
import Post from "./components/Post";
import Footer from "./components/Footer";
import UserSignup from "./components/user/UserSignup";
import UserLogin from "./components/user/UserLogin";
import { userContext } from "./contexts/UserContext";
import { getCookie } from "./utils/userCookie";
import Protected from "./components/protectedRoutes/Protected";

function App() {
  const [userData, setUserData] = useState(getCookie("user"));

  console.log(userData);

  useEffect(() => {
    setUserData(getCookie("user"));
  }, []);

  return (
    <Router>
      <div className="App">
        <userContext.Provider value={{ userData }}>
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
              <Route path="/protected" component={Protected} />
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
        </userContext.Provider>
      </div>
    </Router>
  );
}

export default App;
