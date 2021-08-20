import "./styles/App.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Main from "../src/components/Main";
import Create from "../src/components/Create";
import Nav from "../src/components/Nav";
import Post from "./components/Post";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="App">
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
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
