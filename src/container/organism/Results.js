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
    this.state = {
      selectedIndex: 0,
      isOpen: []
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

  // レセプト数orレセプト内レコード数が変われば初期化する
  componentWillReceiveProps(nextProps) {
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

export default withStyles(styles)(Results);
