import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { bindActionCreators } from "redux";
import { changeRawdata } from "../../actions/rawdata";
import { closeForm } from "../../actions/form";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
const styles = theme => ({});

function InputDialog(props) {
  const { rawdata, form, classes } = props;
  const { closeForm, changeRawdata } = props;

  return (
    <Dialog
      open={form.isOpen}
      onClose={closeForm}
      maxWidth="xl"
      fullWidth
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        {"レセプトを" + (rawdata ? "編集" : "入力") + "する"}
      </DialogTitle>
      <DialogContent>
        <TextField
          id="standard-multiline-static"
          label={(rawdata ? "編集" : "入力") + "欄"}
          placeholder="請求ファイル内のテキストを貼り付けてください。"
          multiline
          fullWidth
          rows="8"
          rowsMax="20"
          className={classes.textField}
          margin="normal"
          error={Boolean(rawdata.errors.length)}
          value={rawdata.text}
          onChange={e => changeRawdata(e.target.value)}
          InputLabelProps={{
            shrink: true
          }}
        />
        {rawdata.errors.map((error, index) => {
          return (
            <Typography key={index} variant="caption" color="error">
              {error}
            </Typography>
          );
        })}
      </DialogContent>
      <DialogActions>
        <Button onClick={closeForm} color="primary">
          閉じる
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function mapStateToProps(state) {
  return {
    rawdata: state.rawdata,
    form: state.form
  };
}

function mapDispatchToProps(dispatch) {
  return {
    closeForm: bindActionCreators(closeForm, dispatch),
    changeRawdata: bindActionCreators(changeRawdata, dispatch)
  };
}

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(InputDialog)
);
