import React, { Component } from "react";

import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import Fab from "@material-ui/core/Fab";
import InputDialog from "../../presentational/moleceules/InputDialog";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    textAlign: "center",
    minHeight: "93vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
    // fontSize: "calc(10px + 2vmin)"
    // display: "flex",
    // flexGrow: 1,
    // margin: theme.spacing.unit * 2
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
    zIndex: 10
  }
});

class Form extends Component {
  constructor(props) {
    super(props);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      open: false
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        {this.props.errors.length ? (
          <div className={classes.root}>
            <Typography variant="h6" gutterBottom>
              記録に致命的なエラーが出ているようなので修正してください。
            </Typography>
            <Button
              variant="outlined"
              color="error"
              onClick={this.handleClickOpen}
            >
              修正する
            </Button>
          </div>
        ) : (
          <div />
        )}
        {this.props.rawdata ? (
          <Fab
            color="secondary"
            aria-label="Edit"
            className={classes.fab}
            onClick={() => {
              this.handleClickOpen();
              this.props.handleClick();
            }}
          >
            <EditIcon />
          </Fab>
        ) : (
          <div className={classes.root}>
            <Typography variant="h4" gutterBottom>
              請求ファイルをドロップ
              <Typography variant="caption">はまだ実装してない...</Typography>
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              または
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              onClick={this.handleClickOpen}
            >
              レセプトを入力する
            </Button>
          </div>
        )}
        <InputDialog
          rawdata={this.props.rawdata}
          errors={this.props.errors}
          open={this.state.open}
          handleChange={this.props.handleChange}
          handleOpen={this.handleOpen}
          handleClose={this.handleClose}
        />
      </div>
    );
  }
}
export default withStyles(styles)(Form);
