import React from "react";
import {Container, Row, Col, Input, Button} from "mdbreact";

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {name: '', email: '', password: '', country: '', LoginEmail: '', LoginPassword: ''};
    
        this.handleName = this.handleName.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleCountry = this.handleCountry.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLoginEmail = this.handleLoginEmail.bind(this);
        this.handleLoginPassword = this.handleLoginPassword.bind(this);
      }

      handleName(event) {
        this.setState({name: event.target.value});
      }
      handleEmail(event) {
        this.setState({email: event.target.value});
      }
      handlePassword(event) {
        this.setState({password: event.target.value});
      }
      handleCountry(event) {
        this.setState({country: event.target.value});
      }
      handleLoginEmail(event) {
        this.setState({LoginEmail: event.target.value});
      }
      handleLoginPassword(event) {
        this.setState({LoginPassword: event.target.value});
      }

      handleSubmit(event) {
        var data = new FormData();

        const payload = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            country: this.state.country
        };
        data.append("form", JSON.stringify(payload));
        if(this.state.email && this.state.password){
          fetch('http://localhost:3003/register', {
            method: 'POST',
            body: data,
            headers:{
              Accept: 'application/json',
            },
          })
          this.setState({name: '', email: '', password: '',country: ''});
        } else {
          alert("Email and Password are empty!");
        }
        event.preventDefault();
      }

      handleLogin(event) {
        var data = new FormData();
        const payload = {
          LoginEmail: this.state.LoginEmail,
          LoginPassword: this.state.LoginPassword
        };
        localStorage.setItem("user", JSON.stringify(payload));
        data.append("form", JSON.stringify(payload));
        const options = {
          method: 'POST',
          body: data,
          headers:{
            Accept: 'application/json',
          },
        };
        fetch('http://localhost:3003/login', options)
        .then(function(response) { return response.json(); })
        .then(function(data) {
          console.log(data)
        });
        event.preventDefault();
      }
  render() {
    return (
    <Container>
      <Row>
        <Col md="6" style={{marginTop: '6rem', marginbottom: '10rem'}}>
            <form onSubmit={this.handleLogin}>
              <p className="h5 text-center mb-4">Sign in</p>
              <div className="grey-text">
                <Input label="Type your email" icon="envelope" value={this.state.LoginEmail} onChange={this.handleLoginEmail} group type="text" validate error="wrong" success="right" />
                <Input label="Type your password" icon="lock" value={this.state.LoginPassword} onChange={this.handleLoginPassword} group type="password" validate/>
              </div>
              <div className="text-center">
                <Button type="submit" value="Submit">Login</Button>
              </div>
            </form>
          </Col>
          <Col md="6" style={{marginTop: '6rem', marginbottom: '10rem'}}>
            <form onSubmit={this.handleSubmit}>
              <p className="h5 text-center mb-4">Sign up</p>
              <div className="grey-text">
                <Input label="Your name" icon="user" value={this.state.name} onChange={this.handleName} group type="text" validate error="wrong" success="right"/>
                <Input label="Your email" icon="envelope" value={this.state.email} onChange={this.handleEmail} group type="email" validate error="wrong" success="right"/>
                <Input label="Your password" icon="lock" value={this.state.password} onChange={this.handlePassword} group type="password" validate/>
                <Input label="Your country" icon="country" value={this.state.country} onChange={this.handleCountry} group type="text" validate error="wrong" success="right"/>
              </div>
              <div className="text-center">
                <Button color="primary" type="submit" value="Submit">Register</Button>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Login;