import Button from "@material-ui/core/Button";
import React from "react";
import { bindActionCreators } from "redux";
import { changeRawdata } from "../../actions/rawdata";
import { connect } from "react-redux";
import sample from "../../static/recordDefinitions/rousai/sample.csv";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({});

function TryButton(props) {
  return (
    <Button
      color="inherit"
      onClick={() =>
        fetch(sample)
          .then(r => r.text())
          .then(text => {
            props.changeRawdata(text);
          })
      }
    >
      サンプルデータ投入
    </Button>
  );
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    changeRawdata: bindActionCreators(changeRawdata, dispatch)
  };
}

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TryButton)
);
