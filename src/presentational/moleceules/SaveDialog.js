import React, { Component } from "react";

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
import encoding from "encoding-japanese";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({});
class SaveDialog extends Component {
  constructor(props) {
    super(props);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      isOpen: false,
      fileName: ""
      // TODO: extensionのstate化
    };
  }

  handleOpen = () => {
    this.setState({ isOpen: true });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  handleChange = e => {
    this.setState({ fileName: e.target.value });
  };

  handleDownload = () => {
    const element = document.createElement("a");
    const shiftJisCodeList = encoding.convert(
      this.props.rawdata
        .split("")
        .map((c, index) => this.props.rawdata.codePointAt(index)),
      "sjis",
      "unicode"
    );
    const uInt8List = new Uint8Array(shiftJisCodeList);
    const file = new Blob([uInt8List], {
      type: "text/plain"
    });
    element.href = URL.createObjectURL(file);
    element.download =
      this.state.fileName +
      getExtension(
        this.props.seikyusho.tensuHyouCode,
        this.props.seikyusho.isHenrei
      );
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Tooltip title="請求ファイルダウンロード">
          <div>
            <IconButton
              color="inherit"
              className={classes.button}
              aria-label="save"
              disabled={!this.props.rawdata}
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
                    {getExtension(
                      this.props.seikyusho.tensuHyouCode,
                      this.props.seikyusho.isHenrei
                    )}
                  </InputAdornment>
                }
                inputProps={{
                  "aria-label": "file-name",
                  label: "ファイル名"
                }}
                onChange={this.handleChange}
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
                this.handleDownload();
              }}
              color="primary"
              disabled={!this.state.fileName}
            >
              保存
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

const getExtension = (tensuHyouCode, isHenrei) => {
  if (tensuHyouCode === 1 || tensuHyouCode === 3) {
    if (isHenrei) {
      return ".UKS";
    } else {
      return ".UKE";
    }
  } else if (tensuHyouCode === 3) {
    if (isHenrei) {
      return ".CYS";
    } else {
      return "CYO";
    }
  }
};

export default withStyles(styles)(SaveDialog);
