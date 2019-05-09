import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import GitHub from "../../lib/github";
import IconButton from "@material-ui/core/IconButton";
import Info from "@material-ui/icons/Info";
import React from "react";
import RefreshButton from "../../presentational/moleceules/RefreshButton";
import Save from "@material-ui/icons/Save";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import sample from "../../static/recordDefinitions/rousai/sample.csv";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  fab: {
    margin: theme.spacing.unit * 2
  }
});

function Header(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <AppBar position="sticky" color="primary">
        <Toolbar>
          <div className={classes.grow}>
            <Typography variant="title" color="inherit">
              Easy Rezept Viewer
            </Typography>
            <Typography
              variant="caption"
              color="inherit"
              className={classes.grow}
            >
              for rousai format
            </Typography>
          </div>
          <Button
            color="inherit"
            onClick={() =>
              fetch(sample)
                .then(r => r.text())
                .then(text => {
                  props.handleChange(text);
                })
            }
          >
            サンプルデータ投入
          </Button>

          <Tooltip title="請求ファイルダウンロード">
            <IconButton
              color="inherit"
              className={classes.button}
              aria-label="save"
              disabled={!props.rawdata}
            >
              <Save />
            </IconButton>
          </Tooltip>

          <RefreshButton
            handleChange={props.handleChange}
            rawdata={props.rawdata}
          />

          <Tooltip title="このページについて">
            <IconButton
              color="inherit"
              className={classes.button}
              aria-label="info"
            >
              <Info />
            </IconButton>
          </Tooltip>

          <Tooltip title="GitHubリポジトリ">
            <IconButton
              color="inherit"
              className={classes.button}
              aria-label="github"
              href="https://github.com/old-stone/rezept-viewer"
              target="_blank"
            >
              <GitHub />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withStyles(styles)(Header);
