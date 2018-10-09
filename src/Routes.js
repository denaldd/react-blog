import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./Login/Login";
import Home from "./Home/Home";

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
      </Switch>
    );
  }
}

export default Routes;
