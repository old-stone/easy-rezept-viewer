import Button from "@material-ui/core/Button";
import React from "react";
import Typography from "@material-ui/core/Typography";
import encoding from "encoding-japanese";
import lightGreen from "@material-ui/core/colors/lightGreen";
import { useDropzone } from "react-dropzone";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    margin: "5vh",
    padding: "5vh",
    minHeight: "80vh",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    border: "3px dashed",
    boxSizing: "border-box",
    borderRadius: 25,
    borderColor: theme.palette.grey[400]
  }
});

function SeikyushoDropZone(props) {
  const { classes } = props;

  const onDrop = acceptedFiles => {
    const reader = new FileReader();
    reader.readAsBinaryString(acceptedFiles[0]);
    reader.onload = () => {
      const shiftJisCodeList = encoding.convert(
        reader.result
          .split("")
          .map((c, index) => reader.result.codePointAt(index)),
        "unicode",
        "sjis"
      );
      props.handleChange(encoding.codeToString(shiftJisCodeList));
    };
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: ".uke,.uks,.cyo,.cys",
    noKeyboard: true,
    noClick: true,
    onDrop
  });

  return (
    <div
      className={classes.root}
      style={isDragActive ? { borderColor: lightGreen[400] } : {}}
      {...getRootProps({})}
    >
      <input {...getInputProps()} />
      <Typography variant="h4" gutterBottom>
        請求ファイルをドロップ
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        または
      </Typography>
      <Button
        className={classes.button}
        variant="outlined"
        color="primary"
        onClick={props.handleClickOpen}
      >
        レセプトを入力する
      </Button>
    </div>
  );
}

export default withStyles(styles)(SeikyushoDropZone);
