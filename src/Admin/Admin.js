import React from "react";
import { Container, Row } from "mdbreact";
import  { Redirect } from 'react-router-dom';

class Admin extends React.Component {

  render() {
    if (!localStorage.getItem("isLoggedIn")) {
        return <Redirect to='/login'/>;
    }
    return (
      <Container>
        <Row>

        </Row>
      </Container>
    );
  }
}

export default Admin;