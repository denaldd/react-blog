import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./Login/Login";
import Home from "./Home/Home";
import Admin from "./Admin/Admin";

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/admin" component={Admin} />
      </Switch>
    );
  }
}

export default Routes;
