import Badge from "@material-ui/core/Badge";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";
import { Typography } from "@material-ui/core";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { selectRecord } from "../../actions/seikyusho";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  nested: {
    paddingLeft: theme.spacing.unit * 4
  },
  margin: {
    margin: theme.spacing.unit * 2
  }
});

function TreeLabel(props) {
  const { id, name, selectedId, nested, errorCount, classes } = props;
  const { selectRecord } = props;

  return (
    <ListItem
      button
      key={id}
      selected={id === selectedId}
      onClick={selectRecord.bind(this, id)}
      className={nested ? classes.nested : classes.notNested}
    >
      <Badge
        className={classes.badge}
        badgeContent={errorCount}
        color="secondary"
      >
        <ListItemText
          primary={
            <Typography color={name ? "default" : "error"}>
              {id + 1 + ". "}
              {name ? name.replace(/レコード/g, "") : "不正なレコード識別情報"}
            </Typography>
          }
        />
      </Badge>
    </ListItem>
  );
}

function mapStateToProps(state) {
  return {
    seikyusho: state.seikyusho,
    records: state.records,
    columns: state.columns
  };
}

function mapDispatchToProps(dispatch) {
  return { selectRecord: bindActionCreators(selectRecord, dispatch) };
}

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TreeLabel)
);
