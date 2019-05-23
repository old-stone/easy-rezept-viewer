import About from "../presentational/moleceules/About";
import AppBar from "@material-ui/core/AppBar";
import GitHub from "../presentational/atoms/GitHub";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import React from "react";
import Receipt from "@material-ui/icons/Receipt";
import RefreshButton from "../presentational/moleceules/RefreshButton";
import SaveDialog from "../presentational/moleceules/SaveDialog";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import TryButton from "../presentational/moleceules/TryButton";
import Typography from "@material-ui/core/Typography";
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

          {process.env.REACT_APP_IS_TRY_MODE === "true" && <TryButton />}

          <SaveDialog />

          <RefreshButton />

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
