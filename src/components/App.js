import "./App.css";

import React, { Component } from "react";
import { clearColumns, createColumns } from "../actions/columns";
import { clearMaster, setRecordDefs } from "../actions/master";
import { clearRecords, createRecords } from "../actions/records";
import { clearRezepts, createRezepts } from "../actions/rezepts";
import { clearSeikyusho, createSeikyusho } from "../actions/seikyusho";

import Form from "../container/Form";
import Header from "../container/Header";
import Results from "../container/Results";
import { bindActionCreators } from "redux";
import { clearFile } from "../actions/file";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({});

class App extends Component {
  /**
   * rawdataが問題なければseikyushoオブジェクトを生成する
   * TODO: アクションを連結するためにちょっと横着して書いている
   * @param {Object} nextProps
   */
  componentWillReceiveProps(nextProps) {
    const { rawdata, seikyusho, rezepts } = this.props;
    const {
      setRecordDefs,
      clearMaster,
      createSeikyusho,
      clearSeikyusho,
      createRezepts,
      clearRezepts,
      createRecords,
      clearRecords,
      createColumns,
      clearColumns,
      clearFile
    } = this.props;

    if (rawdata.text !== nextProps.rawdata.text) {
      if (
        !nextProps.rawdata.errors.length && //エラーがない場合
        nextProps.rawdata.text // データが入力されている場合
      ) {
        const isChangeLine =
          rawdata.text.split("\n").length !==
          nextProps.rawdata.text.split("\n").length;
        // TODO: やり方間違ってるけど、正しいやり方がわからん
        const { payload } = setRecordDefs(nextProps.rawdata.array[0][0]);
        createSeikyusho(
          nextProps.rawdata.array,
          isChangeLine,
          seikyusho.selectedId
        );
        createRezepts(nextProps.rawdata.array, isChangeLine, rezepts);
        createRecords(nextProps.rawdata.array);
        createColumns(nextProps.rawdata.array, payload);
      } else {
        clearMaster();
        clearSeikyusho();
        clearRezepts();
        clearRecords();
        clearColumns();
        clearFile();
      }
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Form />
        <Results />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    rawdata: state.rawdata,
    seikyusho: state.seikyusho,
    rezepts: state.rezepts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setRecordDefs: bindActionCreators(setRecordDefs, dispatch),
    clearMaster: bindActionCreators(clearMaster, dispatch),
    createSeikyusho: bindActionCreators(createSeikyusho, dispatch),
    clearSeikyusho: bindActionCreators(clearSeikyusho, dispatch),
    createRezepts: bindActionCreators(createRezepts, dispatch),
    clearRezepts: bindActionCreators(clearRezepts, dispatch),
    createRecords: bindActionCreators(createRecords, dispatch),
    clearRecords: bindActionCreators(clearRecords, dispatch),
    createColumns: bindActionCreators(createColumns, dispatch),
    clearColumns: bindActionCreators(clearColumns, dispatch),
    clearFile: bindActionCreators(clearFile, dispatch)
  };
}

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
