import Grid from "@material-ui/core/Grid";
import React from "react";
import RecordTable from "../presentational/moleceules/RecordTable";
import Tree from "../presentational/moleceules/Tree";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    margin: theme.spacing.unit
  }
});

function Results(props) {
  const { seikyusho, classes } = props;

  // データがないかエラーの場合は何も表示しない
  if (!seikyusho.isActive) {
    return null;
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={8}>
        <Grid item xs={12} sm={12} md={3} lg={2}>
          <Tree />
        </Grid>
        <Grid item xs={12} sm={12} md={9} lg={10}>
          <RecordTable />
        </Grid>
      </Grid>
    </div>
  );
}

function mapStateToProps(state) {
  return { seikyusho: state.seikyusho };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Results)
);
