import React, { useState, useEffect } from "react";
import "./styles/App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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
import { checkSessionStatus } from "./api/session";

function App() {
  const [userData, setUserData] = useState(getCookie("user"));
  const [userLoginData, setUserLoginData] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  // console.log(userData);

  useEffect(() => {
    setUserData(getCookie("user"));
    checkSessionStatus()
      .then((res) => {
        console.log(res.data.expired === true, ".........");
        console.log(res.data.expired, ".........");
        console.log(res.data.user, ".........");
        if (res.data.expired === false) {
          setLoggedIn(true);
          setUserLoginData({
            username: res.data.user.username,
            email: res.data.user.email,
          });
        } else {
          setLoggedIn(false);
          setUserLoginData({
            username: "",
            email: "",
          });
        }
      })
      .catch((error) => {
        console.log(error.response, ".........");
        console.log(error.response.data.expired === true, ".........");
      });
  }, []);

  console.log("lo D: ", userLoginData);

  return (
    <Router>
      <div className="App">
        <userContext.Provider value={{ userData, loggedIn, setLoggedIn }}>
          <Nav
            itemOne="Home"
            itemTwo="Posts"
            itemThree="Contact"
            itemFour="About"
          />
          <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/posts/:id" exact component={Post} />
            <Route path="/create" component={Create} />
            <Route path="/user/signup" component={UserSignup} />
            <Route path="/user/login" component={UserLogin} />
            <Route path="/protected" component={Protected} />
          </Switch>
          <Footer />
        </userContext.Provider>
      </div>
    </Router>
  );
}

export default App;
