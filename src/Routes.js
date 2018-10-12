import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./Login/Login";
import Home from "./Home/Home";
import Admin from "./Admin/Admin";
import Video from "./Video/Video";
import Photo from "./Photo/Photo";
import Chat from "./Chat/Chat";

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/video" component={Video} />
        <Route exact path="/photo" component={Photo} />
        <Route exact path="/chat" component={Chat} />
      </Switch>
    );
  }
}

export default Routes;
