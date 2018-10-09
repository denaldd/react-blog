import React from "react";
import {Container, Row, Col, Input, Button} from "mdbreact";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      handleChange(event) {
        this.setState({value: event.target.value});
      }

      handleSubmit(event) {
        var data = new FormData();

        const payload = {
            email: this.state.value
        };
        data.append("myjsonkey", JSON.stringify(payload));
        fetch('http://localhost:3003/login', {
            method: 'POST',
            body: data,
            mode: 'no-cors',
            headers:{
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
                },
        })
        event.preventDefault();
      }
  render() {
    return (
    <Container>
      <Row>
        <Col md="6" style={{marginTop: '6rem', marginbottom: '10rem'}}>
            <form onSubmit={this.handleSubmit}>
              <p className="h5 text-center mb-4">Sign in</p>
              <div className="grey-text">
                <Input label="Type your email" icon="envelope" value={this.state.value} onChange={this.handleChange} group type="text" validate error="wrong" success="right" />
                <Input label="Type your password" icon="lock" group type="password" validate/>
              </div>
              <div className="text-center">
                <Button type="submit" value="Submit">Login</Button>
              </div>
            </form>
          </Col>
          <Col md="6" style={{marginTop: '6rem', marginbottom: '10rem'}}>
            <form>
              <p className="h5 text-center mb-4">Sign up</p>
              <div className="grey-text">
                <Input label="Your name" icon="user" group type="text" validate error="wrong" success="right"/>
                <Input label="Your email" icon="envelope" group type="email" validate error="wrong" success="right"/>
                <Input label="Confirm your email" icon="exclamation-triangle" group type="text" validate error="wrong" success="right"/>
                <Input label="Your password" icon="lock" group type="password" validate/>
              </div>
              <div className="text-center">
                <Button color="primary">Register</Button>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Login;