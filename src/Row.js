import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
});
function Row(props) {
  const { classes } = props;
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell align="right">No</TableCell>
            <TableCell align="right">項目名</TableCell>
            <TableCell align="right">モード</TableCell>
            <TableCell align="right">最大バイト</TableCell>
            <TableCell align="right">項目形式</TableCell>
            <TableCell align="right">値</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.row.map(column => (
            <TableRow key={column.num}>
              <TableCell align="right">{column.num}</TableCell>
              <TableCell align="right">{column.name}</TableCell>
              <TableCell align="right">{column.mode}</TableCell>
              <TableCell align="right">{column.byte}</TableCell>
              <TableCell align="right">{column.type}</TableCell>
              <TableCell align="right">{column.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
export default withStyles(styles)(Row);
