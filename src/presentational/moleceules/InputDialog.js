import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({});
function InputDialog(props) {
  const { classes } = props;

  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      maxWidth="xl"
      fullWidth
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        {"レセプトを" + (props.rawdata ? "編集" : "入力") + "する"}
      </DialogTitle>
      <DialogContent>
        <TextField
          id="standard-multiline-static"
          label={(props.rawdata ? "編集" : "入力") + "欄"}
          placeholder="請求ファイル内のテキストを貼り付けてください。"
          multiline
          fullWidth
          rows="8"
          rowsMax="20"
          className={classes.textField}
          margin="normal"
          error={Boolean(props.errors.length)}
          value={props.rawdata}
          onChange={e => props.handleChange(e.target.value)}
          InputLabelProps={{
            shrink: true
          }}
        />
        {props.errors.map((error, index) => {
          return (
            <Typography key={index} variant="caption" color="error">
              {error}
            </Typography>
          );
        })}
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleClose} color="primary">
          閉じる
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default withStyles(styles)(InputDialog);
