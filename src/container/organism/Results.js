import React, { Component } from "react";

import Grid from "@material-ui/core/Grid";
import RecordTable from "../../presentational/moleceules/RecordTable";
import Tree from "../../presentational/moleceules/Tree";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    margin: theme.spacing.unit
  }
});

class Results extends Component {
  constructor(props) {
    super(props);
    this.handleClickRecord = this.handleClickRecord.bind(this);
    this.handleClickRezept = this.handleClickRezept.bind(this);
    this.handleOpenClose = this.handleOpenClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      selectedIndex: 0,
      isOpen: [],
      errors: [[]]
    };
  }
  // レコードを選んだときの処理
  handleClickRecord = (e, index) => {
    this.setState({ selectedIndex: index });
  };

  // レセプトを選んだときの折りたたみ
  handleClickRezept = (e, index) => {
    this.setState(function(prevState, props) {
      prevState.isOpen[index] = !prevState.isOpen[index];
      return {
        isOpen: prevState.isOpen
      };
    });
  };

  // TODO:isOpenの名前が微妙 オブジェクト作ってプロパティ化すべき
  handleOpenClose = isOpen => {
    this.setState({
      isOpen: [...Array(this.props.seikyusho.rezepts.length)].map(() => isOpen)
    });
  };

  handleChange = (indexRecord, indexColumn, value, column) => {
    this.setState(function(prevState, props) {
      prevState.errors[indexRecord][indexColumn] = deepCheck(value, column);
      return {
        errors: prevState.errors
      };
    });
  };

  componentWillReceiveProps(nextProps) {
    // 内容が変わっていれば再チェックする
    const prevRawData = this.props.rawdata;
    const nextRawData = nextProps.rawdata;
    if (prevRawData !== nextRawData) {
      this.setState({
        errors: flatSeikyusho(nextProps.seikyusho).map(record => {
          if (!record) {
            return [];
          }
          const columns = getColumns(nextProps.master, record.array[0]);
          if (!columns) {
            return ["不正なレコード識別情報"];
          }
          if (record.array.length < columns.length) {
            return columns.map((column, index) => {
              return deepCheck(record.array[index], column);
            });
          } else {
            return record.array.map((value, index) => {
              return deepCheck(value, columns[index]);
            });
          }
        })
      });
    }

    // レセプト数orレセプト内レコード数が変われば初期化する
    const prevRezepts = this.props.seikyusho.rezepts;
    const nextRezepts = nextProps.seikyusho.rezepts;
    if (
      prevRezepts.length !== nextRezepts.length ||
      prevRezepts.some(
        (rezept, index) =>
          nextRezepts[index] && rezept.length !== nextRezepts[index].length
      )
    ) {
      this.setState({ selectedIndex: 0, isOpen: [] });
    }
  }

  render() {
    const { classes } = this.props;

    // データがないかエラーの場合は何も表示しない
    if (!this.props.rawdata || this.props.errors.length) {
      return null;
    }

    return (
      <div className={classes.root}>
        <Grid container spacing={8}>
          <Grid item xs={12} sm={12} md={3} lg={2}>
            <Tree
              master={this.props.master}
              seikyusho={this.props.seikyusho}
              selectedIndex={this.state.selectedIndex}
              isOpen={this.state.isOpen}
              errors={this.state.errors}
              handleClickRecord={this.handleClickRecord}
              handleClickRezept={this.handleClickRezept}
              handleOpenClose={this.handleOpenClose}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={9} lg={10}>
            <RecordTable
              master={this.props.master}
              selectedIndex={this.state.selectedIndex}
              record={
                flatSeikyusho(this.props.seikyusho).find(
                  record => record.index === this.state.selectedIndex
                ).array
              }
              errors={this.state.errors[this.state.selectedIndex]}
              handleChange={this.handleChange}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

// 請求書のフラット化
const flatSeikyusho = seikyusho => {
  return [seikyusho.header]
    .concat(seikyusho.rezepts.flat())
    .concat([seikyusho.footer]);
};

const deepCheck = (value, column) => {
  if (value === undefined) {
    return "項目不足";
  }

  if (!column) {
    return "項目超過";
  }

  const error = [];
  // TODO: 条件もっとある
  // TODO: 必須項目チェック追加する
  if (column.type === "数字" && value.match(/[^0-9,.]/)) {
    error.push("モード誤り");
  }
  const byteLen = getByteLen(value);
  if (byteLen > column.max_bytes) {
    error.push("バイト数超過");
  }
  if (column.is_fixed && byteLen < column.max_bytes) {
    error.push("バイト数不足");
  }
  return error.join(",");
};

const getByteLen = str => {
  const len = str.length;
  let cd,
    blen = 0;

  for (let i = 0; i < len; i++) {
    blen += 2;
    cd = str.charCodeAt(i);
    if (0x20 <= cd && cd <= 0x7e) {
      blen--;
    }
    if (0xff61 <= cd && cd <= 0xff9f) {
      blen--;
    }
  }
  return blen;
};

function getColumns(master, recordShikibetsuInfo) {
  const def = master.find(
    def => def.record_shikibetsu_info === recordShikibetsuInfo
  );
  return def ? def.columns : null;
}

export default withStyles(styles)(Results);
