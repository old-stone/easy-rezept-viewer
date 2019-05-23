import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import Fab from "@material-ui/core/Fab";
import InputDialog from "../presentational/moleceules/InputDialog";
import React from "react";
import SeikyushoDropZone from "../presentational/moleceules/SeikyushoDropZone";
import Typography from "@material-ui/core/Typography";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { createRawdata } from "../actions/rawdata";
import { openForm } from "../actions/form";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    margin: "5vh",
    padding: "5vh",
    minHeight: "70vh",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
    zIndex: 10
  }
});

function Form(props) {
  const { rawdata, seikyusho, records, columns, classes } = props;
  const { openForm, createRawdata } = props;

  return (
    <div>
      {Boolean(rawdata.errors.length) && (
        <div className={classes.root}>
          <Typography variant="h6" gutterBottom>
            記録に致命的なエラーが出ているようなので修正してください。
          </Typography>
          <Button variant="outlined" color="secondary" onClick={openForm}>
            修正する
          </Button>
        </div>
      )}
      {seikyusho.isActive ? (
        <Fab
          color="secondary"
          aria-label="Edit"
          className={classes.fab}
          onClick={() => {
            openForm();
            createRawdata(records, columns);
          }}
        >
          <EditIcon />
        </Fab>
      ) : (
        <SeikyushoDropZone />
      )}
      <InputDialog />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    rawdata: state.rawdata,
    seikyusho: state.seikyusho,
    records: state.records,
    columns: state.columns,
    form: state.form
  };
}

function mapDispatchToProps(dispatch) {
  return {
    openForm: bindActionCreators(openForm, dispatch),
    createRawdata: bindActionCreators(createRawdata, dispatch)
  };
}

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Form)
);
