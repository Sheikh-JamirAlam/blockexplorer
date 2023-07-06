import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Home from "./components/Home";
import Block from "./components/Block";
import Transaction from "./components/Transaction";
import Address from "./components/Address";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/block/:block" component={Block} />
          <Route path="/tx/:tx" component={Transaction} />
          <Route path="/address/:address" component={Address} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </>
  );
}

export default App;
