import Badge from "@material-ui/core/Badge";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import React from "react";
import { Typography } from "@material-ui/core";
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
  const { classes } = props;

  const recordName = getRecordName(props.master, props.recordShikibetsuInfo);

  return (
    <ListItem
      button
      key={props.index}
      selected={props.selectedIndex === props.index}
      onClick={e => props.handleClickRecord(e, props.index)}
      className={props.nested ? classes.nested : ""}
    >
      <Badge
        className={classes.badge}
        badgeContent={countError(props.errors[props.index])}
        color="secondary"
      >
        <ListItemText
          primary={
            <Typography color={!recordName ? "error" : "default"}>
              {props.index + 1 + ". "}
              {recordName ? recordName : "不正なレコード識別情報"}
            </Typography>
          }
        />
      </Badge>
    </ListItem>
  );
}

// レコード定義からレコード名称を取得する
function getRecordName(master, recordShikibetsuInfo) {
  const def = master.find(
    def => def.record_shikibetsu_info === recordShikibetsuInfo
  );
  return def ? def.name.replace(/レコード/g, "") : null;
}

function countError(errors) {
  if (errors) {
    return errors.filter(error => error !== "").length;
  } else {
    return 0;
  }
}

export default withStyles(styles)(TreeLabel);
