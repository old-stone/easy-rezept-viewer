import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Paper from "@material-ui/core/Paper";
import Person from "@material-ui/icons/Person";
import React from "react";
import TreeLabel from "./TreeLabel";
import Typography from "@material-ui/core/Typography";
import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper
  },
  grow: {
    flexGrow: 1,
    paddingLeft: 5,
    paddingTop: 5,
    paddingBottom: 5
  },
  listItemIcon: {
    marginRight: 0
  }
});

function Tree(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <List
        component="nav"
        subheader={<ListSubheader component="div">レコード一覧</ListSubheader>}
      >
        <ListItem className={classes.grow}>
          <Button
            size="small"
            color="primary"
            onClick={() => props.handleOpenClose(true)}
          >
            全て開く
          </Button>
          <Typography variant="body1"> | </Typography>
          <Button
            size="small"
            color="primary"
            onClick={() => props.handleOpenClose(false)}
          >
            全て閉じる
          </Button>
        </ListItem>
        {/* ヘッダ */}
        <TreeLabel
          index={props.seikyusho.header.index}
          selectedIndex={props.selectedIndex}
          recordShikibetsuInfo={props.seikyusho.header.array[0]}
          master={props.master}
          nested={false}
          errors={props.errors}
          handleClickRecord={props.handleClickRecord}
        />

        {props.seikyusho.rezepts.map((rezept, index) => (
          <div key={index}>
            <ListItem button onClick={e => props.handleClickRezept(e, index)}>
              <ListItemIcon className={classes.listItemIcon}>
                <Person
                  className={classes.icon}
                  nativeColor={
                    rezept[0].array[5] === "1"
                      ? blue[400]
                      : rezept[0].array[5] === "2"
                      ? red[400]
                      : ""
                  }
                />
              </ListItemIcon>
              <ListItemText
                primary={rezept[0].array[4] ? rezept[0].array[4] : "名称不明"}
              />
              {props.isOpen[index] ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={props.isOpen[index]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {rezept.map(record => {
                  return (
                    <TreeLabel
                      key={record.index}
                      index={record.index}
                      selectedIndex={props.selectedIndex}
                      recordShikibetsuInfo={record.array[0]}
                      master={props.master}
                      nested={true}
                      errors={props.errors}
                      handleClickRecord={props.handleClickRecord}
                    />
                  );
                })}
              </List>
            </Collapse>
          </div>
        ))}

        {/* フッタ */}
        <TreeLabel
          index={props.seikyusho.footer.index}
          selectedIndex={props.selectedIndex}
          recordShikibetsuInfo={props.seikyusho.footer.array[0]}
          master={props.master}
          errors={props.errors}
          handleClickRecord={props.handleClickRecord}
        />
      </List>
    </Paper>
  );
}

export default withStyles(styles)(Tree);
