import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import AppLogo from '../assets/logoFFF.svg'

const styles = {
  logo: {
    margin: 8,
    height: 72
  }
};

function AppBar(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <MuiAppBar position="static" color="primary">
        <Toolbar>
          <img src={AppLogo} className={classes.logo} alt="logo" />
        </Toolbar>
      </MuiAppBar>
    </div>
  );
}

AppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppBar);