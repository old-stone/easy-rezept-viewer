import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Row from "./Row";
import recDefsIka201806 from "./static/recordDefinitions/rousai/ika.2018.06.json";

const styles = theme => ({});

function Rows(props) {
  const { classes } = props;

  // データがない場合は何も表示しない
  if (!props.rawdata) {
    return <div />;
  }

  // CSVを二次元配列にパース
  const csvRowsColumns = csv2array(props.rawdata);

  // ヘッダーがおかしい場合何もできないのでここで差止め
  let recDefs;
  if (csvRowsColumns[0][0] === "IR") {
    recDefs = recDefsIka201806;
  } else if (csvRowsColumns[0][0] === "UK") {
    return <div>歯科</div>;
  } else if (csvRowsColumns[0][0] === "YK") {
    return <div>調剤</div>;
  } else {
    return <div>ヘッダレコードが不正なデータです。</div>;
  }

  // とりあえず一行目を指定
  const i = 0;

  const row = [];
  for (let i = 0; i < csvRowsColumns.length; i++) {
    // レコード識別情報でフィルタしたレコード定義
    const recDef = recDefs.find(
      record => record.record_shikibetsu_info == csvRowsColumns[i][0]
    );
  }

  return <Row row={row} />;
}

// 入力値を行と列の二次元配列に分割
const csv2array = original => {
  const csvRows = original.trim().split("\n");
  let csvRowsColumns = [];
  for (let i = 0; i < csvRows.length; ++i) {
    csvRowsColumns[i] = csvRows[i].split(",");
  }
  return csvRowsColumns;
};

export default withStyles(styles)(Rows);
