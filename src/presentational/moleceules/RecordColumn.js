import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { bindActionCreators } from "redux";
import { changeValue } from "../../actions/columns";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({});

function RecordColumn(props) {
  const { master, classes } = props;
  const { changeValue } = props;
  const { id, index, recordShikibetsuInfo, value, error } = props;
  const { recordDefs } = master;

  const columnDef = recordDefs.byId[recordShikibetsuInfo].columns[index];

  return (
    <TableRow hover>
      <TableCell align="right">{index + 1}</TableCell>
      <TableCell align="left">{columnDef && columnDef.name}</TableCell>
      <TableCell align="left">{columnDef && columnDef.type}</TableCell>
      <TableCell align="right">{columnDef && columnDef.maxBytes}</TableCell>
      <TableCell align="left">
        {columnDef && (columnDef.isFixed ? "固定長" : "可変長")}
      </TableCell>
      <TableCell align="left">
        {value === undefined ? (
          // 空文字（記録を省略したもの）は許容する
          <Typography color="error">項目不足</Typography>
        ) : index === 0 ? (
          // レコード識別だけは変更させない
          value
        ) : (
          <TextField
            id="standard-bare"
            className={classes.textField}
            value={value}
            margin="dense"
            fullWidth
            error={Boolean(error)}
            helperText={error}
            onChange={e => changeValue(id, e.target.value, columnDef)}
          />
        )}
      </TableCell>
    </TableRow>
  );
}

function mapStateToProps(state) {
  return { master: state.master };
}

function mapDispatchToProps(dispatch) {
  return { changeValue: bindActionCreators(changeValue, dispatch) };
}

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(RecordColumn)
);
