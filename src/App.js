import "./App.css";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Main from "../src/components/Main";
import Create from "../src/components/Create";
import Nav from "../src/components/Nav";

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
          <Route path={`/posts/+${9}`} exact component={Main} />
          <Route path="/create" component={Create} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
