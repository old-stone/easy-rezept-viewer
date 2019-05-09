import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
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
          {columns.map((column, index) => (
            <TableRow hover key={index}>
              <TableCell align="right">{index + 1}</TableCell>
              <TableCell align="left">{column.name}</TableCell>
              <TableCell align="left">{column.type}</TableCell>
              <TableCell align="right">{column.max_bytes}</TableCell>
              <TableCell align="left">
                {column.is_fixed ? "固定長" : "可変長"}
              </TableCell>
              <TableCell align="left">
                {props.record[index] === undefined ? ( // 空文字は許容する
                  <Typography color="error">項目不足</Typography>
                ) : index === 0 ? (
                  // レコード識別だけは変更させない
                  props.record[index]
                ) : (
                  <TextField
                    id="standard-bare"
                    key={props.selectedIndex * 100 + index}
                    className={classes.textField}
                    defaultValue={props.record[index]}
                    margin="dense"
                    onBlur={props.handleChangeValue}
                    fullWidth
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
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
                    key={
                      props.selectedIndex * 100 + props.record.length + index
                    }
                    className={classes.textField}
                    defaultValue={value}
                    helperText="項目数超過"
                    error
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
