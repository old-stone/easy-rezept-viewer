import React from "react";
import RecordColumn from "./RecordColumn";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    display: "flex",
    overflowX: "auto"
  },
  error: {
    margin: "5vh",
    padding: "5vh",
    minHeight: "70vh",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center"
  },
  table: {
    minWidth: 700,
    marginBottom: 64,
    tableLayout: "fixed"
  },
  tableCell: {
    padding: theme.spacing.unit
  }
});

function RecordTable(props) {
  const { master, seikyusho, records, columns, classes } = props;
  const { selectedId } = seikyusho;
  const { recordDefs } = master;

  const recordShikibetsuInfo = records.byId[selectedId].recordShikibetsuInfo;
  // レコードが空であれば何も表示しない
  if (!recordDefs.byId[recordShikibetsuInfo]) {
    return (
      <div className={classes.error}>
        <Typography variant="h6" color="error" gutterBottom>
          レコード識別情報
          {recordShikibetsuInfo && " [" + recordShikibetsuInfo + "] "}
          が不正です。
        </Typography>
      </div>
    );
  }

  const selectedRecord = records.byId[selectedId];
  const columnDef =
    recordDefs.byId[selectedRecord.recordShikibetsuInfo].columns;

  return (
    <div className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell align="center" style={{ width: "2%" }}>
              No
            </TableCell>
            <TableCell align="center" style={{ width: "26%" }}>
              項目名
            </TableCell>
            <TableCell align="center" style={{ width: "14%" }}>
              モード
            </TableCell>
            <TableCell align="center" style={{ width: "14%" }}>
              最大バイト
            </TableCell>
            <TableCell align="center" style={{ width: "14%" }}>
              項目形式
            </TableCell>
            <TableCell align="center" style={{ width: "30%" }}>
              値
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {selectedRecord.columns.map((columnId, index) => (
            <RecordColumn
              key={columnId}
              id={columnId}
              index={index}
              recordShikibetsuInfo={selectedRecord.recordShikibetsuInfo}
              value={columns.byId[columnId].value}
              error={columns.byId[columnId].error}
            />
          ))}
          {/* カラム数が少ない場合の処理 */}
          {selectedRecord.columns.length < columnDef.length &&
            columnDef
              .slice(selectedRecord.columns.length)
              .map((column, index) => (
                <RecordColumn
                  key={index}
                  index={index + selectedRecord.columns.length}
                  recordShikibetsuInfo={selectedRecord.recordShikibetsuInfo}
                />
              ))}
        </TableBody>
      </Table>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    master: state.master,
    seikyusho: state.seikyusho,
    records: state.records,
    columns: state.columns
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(RecordTable)
);
