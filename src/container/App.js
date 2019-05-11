import "./App.css";

import React, { Component } from "react";

import Form from "./organism/Form";
import Header from "./organism/Header";
import Results from "./organism/Results";
import recDefsChouzai201806 from "../static/recordDefinitions/rousai/chouzai.2018.06.json";
import recDefsIka201806 from "../static/recordDefinitions/rousai/ika.2018.06.json";
import recDefsShika201806 from "../static/recordDefinitions/rousai/shika.2018.06.json";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({});

class App extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChangeColumn = this.handleChangeColumn.bind(this);
    this.state = {
      rawdata: "",
      errors: [],
      seikyusho: initSeikyusho(),
      master: null
    };
  }

  // textareaを変更した際に請求書オブジェクトを作る処理
  handleChange = rawdata => {
    if (!rawdata) {
      this.setState({
        rawdata: rawdata,
        errors: [],
        seikyusho: initSeikyusho(),
        master: null
      });
      return;
    }
    const rawdataArray = csv2array(rawdata);

    // エラーが存在した場合
    const errors = shallowCheck(rawdataArray);
    if (errors.length) {
      this.setState({
        rawdata: rawdata,
        errors: errors,
        seikyusho: initSeikyusho(),
        master: null
      });
      return;
    }

    // 正常な場合
    this.setState({
      rawdata: rawdata,
      errors: [],
      seikyusho: createSeikyusho(rawdataArray),
      master: getMaster(rawdataArray[0][0])
    });
  };

  handleClick = () => {
    const header = this.state.seikyusho.header.array.join(",");
    const rezepts = this.state.seikyusho.rezepts
      .map(rezept => rezept.map(record => record.array.join(",")).join("\n"))
      .join("\n");
    const footer = this.state.seikyusho.footer.array.join(",");
    this.setState({
      rawdata: header + "\n" + rezepts + "\n" + footer
    });
  };

  handleChangeColumn(e, recordIndex, columnIndex) {}

  render() {
    return (
      <div className="App">
        <Header
          handleChange={this.handleChange}
          rawdata={this.state.rawdata}
          seikyusho={this.state.seikyusho}
        />
        <Form
          rawdata={this.state.rawdata}
          errors={this.state.errors}
          handleChange={this.handleChange}
          handleClick={this.handleClick}
        />
        <Results
          rawdata={this.state.rawdata}
          errors={this.state.errors}
          seikyusho={this.state.seikyusho}
          master={this.state.master}
        />
      </div>
    );
  }
}

// 点数表に応じたマスタを取得する
const getMaster = recordShikibetsuInfo => {
  if (recordShikibetsuInfo === "IR") {
    return recDefsIka201806;
  } else if (recordShikibetsuInfo === "UK") {
    return recDefsShika201806;
  } else if (recordShikibetsuInfo === "YK") {
    return recDefsChouzai201806;
  } else {
    return null;
  }
};

// 破綻しかねない最低限のチェックを行う
const shallowCheck = rawdataArray => {
  // 空の場合
  if (!rawdataArray.length) {
    return [];
  }

  const errors = [];
  if (!getTensuHyouCode(rawdataArray[0][0])) {
    errors.push("ヘッダレコードのレコード識別情報が不正です。");
  }
  const footerRecordShikibetsu = rawdataArray[rawdataArray.length - 1][0];
  if (footerRecordShikibetsu !== "RS") {
    errors.push("フッタレコードのレコード識別情報が不正です。");
  }
  // TODO: IR RS が複数存在する場合
  if (!rawdataArray[1] || rawdataArray[1][0] !== "RE") {
    errors.push("2レコード目がレセプト共通レコードではありません。");
  }
  if (errors.length) {
    return errors;
  }
  return [];
};

// 2次元配列から請求書オブジェクトを生成する
const createSeikyusho = rawdataArray => {
  // エラーが無ければ請求書Objを生成を返却
  return {
    header: { index: 0, array: rawdataArray[0] },
    rezepts: createRezepts(rawdataArray),
    footer: {
      index: rawdataArray.length - 1,
      array: rawdataArray[rawdataArray.length - 1]
    },
    tensuHyouCode: getTensuHyouCode(rawdataArray[0][0]),
    isHenrei: Boolean(rawdataArray[1][18])
  };
};

// 2次元配列からレセプト配列を生成する
const createRezepts = rawdataArray => {
  const rezepts = [];
  let cache = [{ index: 1, array: rawdataArray[1] }];
  let num = 2;
  for (const record of rawdataArray.slice(2, rawdataArray.length - 1)) {
    if (record[0] === "RE") {
      rezepts.push(cache);
      cache = [{ index: num, array: record }];
    } else {
      cache.push({ index: num, array: record });
    }
    num++;
  }
  rezepts.push(cache);
  return rezepts;
};

// ヘッダのレコード識別情報から点数表コードを取得
const getTensuHyouCode = headerRecordShikibetsuInfo => {
  if (headerRecordShikibetsuInfo === "IR") {
    return 1;
  } else if (headerRecordShikibetsuInfo === "UK") {
    return 3;
  } else if (headerRecordShikibetsuInfo === "YK") {
    return 4;
  } else {
    return null;
  }
};

// 入力値を行と列の二次元配列に分割する
const csv2array = original => {
  const csvRows = original.trim().split("\n");
  let csvRowsColumns = [];
  for (let i = 0; i < csvRows.length; ++i) {
    csvRowsColumns[i] = csvRows[i].split(",");
  }
  return csvRowsColumns;
};

const initSeikyusho = () => {
  return {
    header: null,
    rezepts: [],
    footer: null,
    tensuHyouCode: null,
    isHenrei: false
  };
};

export default withStyles(styles)(App);
