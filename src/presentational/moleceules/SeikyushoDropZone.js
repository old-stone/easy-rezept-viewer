import Button from "@material-ui/core/Button";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { bindActionCreators } from "redux";
import { changeFileName } from "../../actions/file";
import { changeRawdata } from "../../actions/rawdata";
import { connect } from "react-redux";
import encoding from "encoding-japanese";
import lightGreen from "@material-ui/core/colors/lightGreen";
import { openForm } from "../../actions/form";
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
  const { openForm, changeRawdata, changeFileName } = props;

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: ".uke,.uks,.cyo,.cys",
    noKeyboard: true,
    noClick: true,
    onDrop: acceptedFiles => {
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
        changeFileName(acceptedFiles[0].name.split(/\.(?=[^.]+$)/)[0]);
        changeRawdata(encoding.codeToString(shiftJisCodeList));
      };
    }
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
        onClick={openForm}
      >
        レセプトを入力する
      </Button>
    </div>
  );
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    openForm: bindActionCreators(openForm, dispatch),
    changeFileName: bindActionCreators(changeFileName, dispatch),
    changeRawdata: bindActionCreators(changeRawdata, dispatch)
  };
}

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SeikyushoDropZone)
);
