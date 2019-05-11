import About from "../../presentational/moleceules/About";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import GitHub from "../../lib/GitHub";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import React from "react";
import Receipt from "@material-ui/icons/Receipt";
import RefreshButton from "../../presentational/moleceules/RefreshButton";
import SaveDialog from "../../presentational/moleceules/SaveDialog";
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
  icon: {
    transform: "scale(1.7)",
    // marginLeft: -5,
    marginRight: 20
  },
  fab: {
    margin: theme.spacing.unit * 2
  },
  link: {
    textDecoration: "none"
  }
});

function Header(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <AppBar position="sticky" color="primary">
        <Toolbar>
          <Icon color="inherit" className={classes.icon}>
            <Link color="inherit" href="/">
              <Receipt />
            </Link>
          </Icon>
          <div className={classes.grow}>
            <Typography variant="h6" color="inherit">
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

          <SaveDialog rawdata={props.rawdata} seikyusho={props.seikyusho} />

          <RefreshButton
            handleChange={props.handleChange}
            rawdata={props.rawdata}
          />

          <About />

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
