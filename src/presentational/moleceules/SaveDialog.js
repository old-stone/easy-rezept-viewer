import React, { Component } from "react";
import { changeFileName, saveFile } from "../../actions/file";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import Save from "@material-ui/icons/Save";
import Tooltip from "@material-ui/core/Tooltip";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({});
class SaveDialog extends Component {
  constructor(props) {
    super(props);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      isOpen: false
    };
  }

  handleOpen = () => {
    this.setState({ isOpen: true });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const { rawdata, seikyusho, file, classes } = this.props;
    const { changeFileName, saveFile } = this.props;

    return (
      <div>
        <Tooltip title="請求ファイルダウンロード">
          <div>
            <IconButton
              color="inherit"
              className={classes.button}
              aria-label="save"
              disabled={!seikyusho.isActive}
              onClick={this.handleOpen}
            >
              <Save />
            </IconButton>
          </div>
        </Tooltip>
        <Dialog
          open={this.state.isOpen}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">請求ファイルを保存</DialogTitle>
          <DialogContent>
            <FormControl>
              <InputLabel htmlFor="file-name">ファイル名</InputLabel>
              <Input
                id="file-name"
                type="text"
                fullWidth
                endAdornment={
                  <InputAdornment position="end">
                    {seikyusho.extention}
                  </InputAdornment>
                }
                value={file.fileName}
                inputProps={{
                  "aria-label": "file-name",
                  label: "ファイル名"
                }}
                onChange={e => changeFileName(e.target.value)}
              />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              キャンセル
            </Button>
            <Button
              onClick={() => {
                this.handleClose();
                saveFile(rawdata.text, file.fileName, seikyusho.extention);
              }}
              color="primary"
              disabled={!file.fileName}
            >
              保存
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    rawdata: state.rawdata,
    seikyusho: state.seikyusho,
    file: state.file
  };
}

function mapDispatchToProps(dispatch) {
  return {
    saveFile: bindActionCreators(saveFile, dispatch),
    changeFileName: bindActionCreators(changeFileName, dispatch)
  };
}

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SaveDialog)
);
