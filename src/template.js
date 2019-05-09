import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({});

class hoge extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      fuga: 0
    };
  }
  handleClick = (e, piyo) => {
    this.setState({ fuga: piyo });
  };

  render() {
    const { classes } = this.props;

    return <div />;
  }
}

export default withStyles(styles)(Results);
