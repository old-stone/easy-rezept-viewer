import React, { Component } from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Refresh from "@material-ui/icons/Refresh";
import Tooltip from "@material-ui/core/Tooltip";
import { bindActionCreators } from "redux";
import { changeRawdata } from "../../actions/rawdata";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({});

class RefreshButton extends Component {
  constructor(props) {
    super(props);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      isOpen: false
    };
  }

  handleClickOpen = () => {
    this.setState({ isOpen: true });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const { rawdata, changeRawdata, classes } = this.props;

    // データがないかエラーの場合は何も表示しない
    return (
      <div>
        <Tooltip title="やり直し">
          <div>
            <IconButton
              color="inherit"
              className={classes.button}
              aria-label="refresh"
              onClick={this.handleClickOpen}
              disabled={!rawdata.text}
            >
              <Refresh />
            </IconButton>
          </div>
        </Tooltip>

        <Dialog
          open={this.state.isOpen}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">最初からやり直す</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              保存されていないデータは消えます。
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              キャンセル
            </Button>
            <Button
              onClick={() => {
                this.handleClose();
                changeRawdata("");
              }}
              color="primary"
              autoFocus
            >
              はい
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    rawdata: state.rawdata
  };
}

function mapDispatchToProps(dispatch) {
  return { changeRawdata: bindActionCreators(changeRawdata, dispatch) };
}

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(RefreshButton)
);
