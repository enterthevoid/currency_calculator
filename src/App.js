import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import AppBar from './components/AppBar';
import AppFrame from './components/AppFrame'
import { isMobile } from './components/helpers';

const styles = (theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    flexDirection: 'column',
  },
  desktopHeight: {
    height: '-webkit-fill-available'
  }
})

class App extends Component {

  render() {
    const { classes } = this.props;

    return (
      <div className={classNames(
        classes.root,
        { [classes.desktopHeight]: !isMobile }
      )
      }>
        <AppBar />
        <AppFrame />
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);