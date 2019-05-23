import { selectAllRezept, selectRezept } from "../../actions/rezepts";

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
import { bindActionCreators } from "redux";
import blue from "@material-ui/core/colors/blue";
import { connect } from "react-redux";
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
  const { master, seikyusho, rezepts, records, columns, classes } = props;
  const { selectRezept, selectAllRezept } = props;
  const { recordDefs } = master;
  const { headerId, footerId, selectedId } = seikyusho;

  const getRecordDef = recordId =>
    recordDefs.byId[records.byId[recordId].recordShikibetsuInfo];

  const getRecordName = recordId => {
    const recordDef = getRecordDef(recordId);

    if (recordDef) {
      return recordDef.name;
    }
  };
  const getKanjaName = rezeptId => {
    const id = records.byId[rezepts.byId[rezeptId].records[0]].columns[4];
    if (id) {
      return columns.byId[id].value;
    }
    return "名称不明";
  };
  const getSexColor = rezeptId => {
    const id = records.byId[rezepts.byId[rezeptId].records[0]].columns[5];
    if (id) {
      return columns.byId[id].value === "1"
        ? blue[400]
        : columns.byId[id].value === "2"
        ? red[400]
        : "";
    }
    return "";
  };
  const countError = recordId => {
    const recordColumns = records.byId[recordId].columns;
    let count = recordColumns.filter(columnId => columns.byId[columnId].error)
      .length;
    const recordDef = getRecordDef(recordId);
    // 項目不足の場合
    if (recordDef && recordColumns.length < recordDef.columns.length) {
      count += recordDef.columns.length - recordColumns.length;
    }
    return count;
  };

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
            onClick={selectAllRezept.bind(this, true)}
          >
            全て開く
          </Button>
          <Typography variant="body1"> | </Typography>
          <Button
            size="small"
            color="primary"
            onClick={selectAllRezept.bind(this, false)}
          >
            全て閉じる
          </Button>
        </ListItem>

        {/* ヘッダ */}
        <TreeLabel
          id={headerId}
          name={getRecordName(headerId)}
          selectedId={selectedId}
          errorCount={countError(headerId)}
        />

        {rezepts.allIds.map(rezeptId => (
          <div key={rezeptId}>
            <ListItem button onClick={selectRezept.bind(this, rezeptId)}>
              <ListItemIcon className={classes.listItemIcon}>
                <Person
                  className={classes.icon}
                  nativeColor={getSexColor(rezeptId)}
                />
              </ListItemIcon>
              <ListItemText primary={getKanjaName(rezeptId)} />
              {rezepts.byId[rezeptId].isOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse
              in={rezepts.byId[rezeptId].isOpen}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {rezepts.byId[rezeptId].records.map(recordId => {
                  return (
                    <TreeLabel
                      key={recordId}
                      id={recordId}
                      name={getRecordName(recordId)}
                      selectedId={selectedId}
                      errorCount={countError(recordId)}
                      nested
                    />
                  );
                })}
              </List>
            </Collapse>
          </div>
        ))}

        {/* フッタ */}
        <TreeLabel
          id={footerId}
          name={getRecordName(footerId)}
          selectedId={selectedId}
          errorCount={countError(footerId)}
        />
      </List>
    </Paper>
  );
}

function mapStateToProps(state) {
  return {
    master: state.master,
    seikyusho: state.seikyusho,
    rezepts: state.rezepts,
    records: state.records,
    columns: state.columns
  };
}

function mapDispatchToProps(dispatch) {
  return {
    selectRezept: bindActionCreators(selectRezept, dispatch),
    selectAllRezept: bindActionCreators(selectAllRezept, dispatch)
  };
}

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Tree)
);
