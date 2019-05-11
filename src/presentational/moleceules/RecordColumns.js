import React, { Component } from "react";

import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({});

class RecordColumns extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      record: props.record
    };
  }

  handleChange = (e, index) => {
    e.persist();
    this.setState(function(prevState, props) {
      prevState.record[index] = e.target.value;
      return { record: prevState.record };
    });
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ record: nextProps.record });
  }

  render() {
    const { classes } = this.props;

    return this.props.columns.map((column, index) => (
      <TableRow hover key={index}>
        <TableCell align="right">{index + 1}</TableCell>
        <TableCell align="left">{column.name}</TableCell>
        <TableCell align="left">{column.type}</TableCell>
        <TableCell align="right">{column.max_bytes}</TableCell>
        <TableCell align="left">
          {column.is_fixed ? "固定長" : "可変長"}
        </TableCell>
        <TableCell align="left">
          {this.props.record[index] === undefined ? ( // 空文字は許容する
            <Typography color="error">項目不足</Typography>
          ) : index === 0 ? (
            // レコード識別だけは変更させない
            this.props.record[index]
          ) : (
            <TextField
              id="standard-bare"
              className={classes.textField}
              value={this.props.record[index]}
              margin="dense"
              onChange={e => this.handleChange(e, index)}
              fullWidth
            />
          )}
        </TableCell>
      </TableRow>
    ));
  }
}

export default withStyles(styles)(RecordColumns);
