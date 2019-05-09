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
    const errors = check(rawdataArray);
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

  render() {
    return (
      <div className="App">
        <Header handleChange={this.handleChange} rawdata={this.state.rawdata} />
        <Form
          rawdata={this.state.rawdata}
          errors={this.state.errors}
          handleChange={this.handleChange}
        />
        <Results
          rawdata={this.state.rawdata}
          errors={this.state.errors}
          seikyusho={this.state.seikyusho}
          master={this.state.master}
        />
        {/* <Footer /> */}
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
const check = rawdataArray => {
  // 空の場合
  if (!rawdataArray.length) {
    return null;
  }

  const errors = [];
  const headerRecordShikibetsu = rawdataArray[0][0];
  if (
    headerRecordShikibetsu !== "IR" &&
    headerRecordShikibetsu !== "UK" &&
    headerRecordShikibetsu !== "YK"
  ) {
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
    }
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
    footer: null
  };
};

export default withStyles(styles)(App);
