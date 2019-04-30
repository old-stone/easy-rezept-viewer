import React from "react";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  }
});

function Form(props) {
  const { classes } = props;
  return (
    <TextField
      id="outlined-textarea"
      label="電子レセプト"
      placeholder="IR,,13,1,1234567............."
      multiline
      className={classes.textField}
      margin="normal"
      variant="outlined"
      value={props.rawdata}
      onChange={e => props.handleChange(e)}
    />
  );
}

export default withStyles(styles)(Form);
