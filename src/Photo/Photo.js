import React from "react";
import { Container, Row, Breadcrumb, BreadcrumbItem, Col, Input, Button, Fa } from "mdbreact";
import axios, {post} from 'axios';

class Photo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {Title: '', Subtitle: '', Subject: '', files: ''};
    
        this.handleTitle = this.handleTitle.bind(this);
        this.handleSubtitle = this.handleSubtitle.bind(this);
        this.handleSubject = this.handleSubject.bind(this);
        this.previewFiles = this.previewFiles.bind(this);
        this.sendPost = this.sendPost.bind(this);
      }

      handleTitle(event) {
        this.setState({Title: event.target.value});
      }
      handleSubtitle(event) {
        this.setState({Subtitle: event.target.value});
      }
      handleSubject(event) {
        this.setState({Subject: event.target.value});
      }

      previewFiles(event) {

        var preview = document.querySelector('#preview');
        var files   = document.querySelector('input[type=file]').files;
      
        function readAndPreview(file) {
      
          if ( /\.(jpe?g|png|gif)$/i.test(file.name) ) {
            var reader = new FileReader();
      
            reader.addEventListener("load", function () {
              var image = new Image();
              image.append('image', file, file.name);
              image.height = 100;
              image.title = file.name;
              image.src = this.result;
              localStorage.setItem("images", JSON.stringify(image.src));
              preview.appendChild( image );
            }, false);
      
            reader.readAsDataURL(file);
          }
      
        }
        this.setState({files: event.image});
        if (files) {
          [].forEach.call(files, readAndPreview);
        }
      }

      sendPost(event) {
        var data = new FormData();
        var user_information = localStorage.getItem("user_information");
        var user_informationJSON = JSON.parse(user_information);
        var userid = user_informationJSON.id;
        const payload = {
            Title: this.state.Title,
            Subtitle: this.state.Subtitle,
            Subject: this.state.Subject,
            userid: userid,
            files: localStorage.getItem("images")
        };
        data.append("form", JSON.stringify(payload));
        const options = {
            method: 'POST',
            body: data,
            headers:{
              Accept: 'application/json',
            },
          };
          fetch('http://localhost:3003/photo_upload', options)
          .then(function(response) { return response.json(); })
          .then(function(data) {
              console.log(data);
          });
          this.state = {Title: '', Subtitle: '', Subject: ''};
        event.preventDefault();
      }

  render() {
    return (
      <Container>
        <Row>
            <Breadcrumb>
                <BreadcrumbItem>Home</BreadcrumbItem>
                <BreadcrumbItem active>Photo</BreadcrumbItem>
            </Breadcrumb>
        </Row>
        <Row>
        <Col md="2"></Col>
          <Col md="8">
          <form onSubmit={this.sendPost}>
            <Input type="text" label="Title" group icon="pencil" value={this.state.Title} onChange={this.handleTitle} validate error="wrong" success="right"/>
            <Input type="text" label="Subtitle" icon="pencil" value={this.state.Subtitle} onChange={this.handleSubtitle} group validate error="wrong" success="right"/>
            <Input type="textarea" rows="2" label="Subject" value={this.state.Subject} onChange={this.handleSubject} icon="pencil"/>
            <input id="browse" type="file" onChange={this.previewFiles}/>
            <div id="preview"></div>
            <Button outline color="secondary" type="submit">Send <Fa icon="paper-plane-o" className="ml-1"/></Button>
          </form>
          </Col>
          <Col md="2"></Col>
          </Row>
      </Container>
    );
  }
}

export default Photo;