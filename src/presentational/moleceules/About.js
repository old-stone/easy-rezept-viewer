import React, { Component } from "react";

import Avatar from "@material-ui/core/Avatar";
import Copyright from "@material-ui/icons/Copyright";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Email from "@material-ui/icons/Email";
import IconButton from "@material-ui/core/IconButton";
import Info from "@material-ui/icons/Info";
import Link from "@material-ui/core/Link";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Person from "@material-ui/icons/Person";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({});

class About extends Component {
  constructor(props) {
    super(props);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.state = {
      isOpen: false
    };
  }

  handleOpen = () => {
    this.setState({ isOpen: true });
  };

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Tooltip title="このページについて">
          <IconButton
            color="inherit"
            className={classes.button}
            aria-label="info"
            onClick={this.handleOpen}
          >
            <Info />
          </IconButton>
        </Tooltip>
        <Dialog
          open={this.state.isOpen}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Easy Rezept Viewer について
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {process.env.REACT_APP_DESCRIPTION}
            </DialogContentText>
            <List>
              {process.env.REACT_APP_EMAIL && (
                <ListItem>
                  <ListItemIcon>
                    <Avatar>
                      <Email />
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText primary={process.env.REACT_APP_EMAIL} />
                </ListItem>
              )}
              {process.env.REACT_APP_BLOG && (
                <ListItem>
                  <ListItemIcon>
                    <Avatar>
                      <Person />
                    </Avatar>
                  </ListItemIcon>
                  <ListItemText>
                    <Link href={process.env.REACT_APP_BLOG}>
                      {process.env.REACT_APP_BLOG}
                    </Link>
                  </ListItemText>
                </ListItem>
              )}
              <ListItem>
                <ListItemIcon>
                  <Avatar>
                    <Copyright />
                  </Avatar>
                </ListItemIcon>
                <ListItemText primary="Copyright 2019 old-stone" />
              </ListItem>
            </List>
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(About);
