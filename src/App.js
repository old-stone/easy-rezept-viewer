import React, { Component } from "react";
import Navigation from "./Navigation";
import Form from "./Form";
import Rows from "./Rows";
// import Footer from "footer";
// import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      rawdata: ""
    };
  }

  handleChange(e) {
    this.setState({
      rawdata: e.target.value
    });
  }

  render() {
    return (
      <div className="App">
        <Navigation />
        <Form rawdata={this.state.rawdata} handleChange={this.handleChange} />
        <Rows rawdata={this.state.rawdata} />
        {/* <Footer /> */}
      </div>
    );
  }
}

export default App;
