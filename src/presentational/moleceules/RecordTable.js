import React from "react";
import RecordColumns from "./RecordColumns";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    display: "flex",
    // width: "100%",
    // marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
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
  const { classes } = props;

  // 表示するカラム定義を用意する
  const columns = getColumns(props.master, props.record[0]);
  // レコードが空であれば何も表示しない
  if (!columns) {
    return null;
  }

  return (
    <div className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell align="center" style={{ width: "2%" }}>
              No
            </TableCell>
            <TableCell align="center" style={{ width: "40%" }}>
              項目名
            </TableCell>
            <TableCell align="center" style={{ width: "8%" }}>
              モード
            </TableCell>
            <TableCell align="center" style={{ width: "10%" }}>
              最大バイト
            </TableCell>
            <TableCell align="center" style={{ width: "10%" }}>
              項目形式
            </TableCell>
            <TableCell align="center" style={{ width: "30%" }}>
              値
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <RecordColumns
            selectedIndex={props.selectedIndex}
            record={props.record}
            columns={columns}
            errors={props.errors}
            handleChange={props.handleChange}
          />
          {/* 項目数超過していた場合の処理 */}
          {props.record.length > columns.length &&
            props.record.slice(columns.length).map((value, index) => (
              <TableRow hover key={columns.length + index}>
                <TableCell align="right">
                  {columns.length + index + 1}
                </TableCell>
                <TableCell colSpan={4} />
                <TableCell align="left">
                  <TextField
                    id="standard-error"
                    margin="dense"
                    className={classes.textField}
                    value={value}
                    helperText={props.errors[columns.length + index]}
                    disabled
                    error
                    fullWidth
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}

// レコード定義からレコード名称を取得する
function getColumns(master, recordShikibetsuInfo) {
  const def = master.find(
    def => def.record_shikibetsu_info === recordShikibetsuInfo
  );
  return def ? def.columns : null;
}

export default withStyles(styles)(RecordTable);
