/**
 *
 * Placeholder
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  content: {
    height: 'calc(100vh - 102px)',
    display: 'flex',
    flex: '1',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});

function Placeholder({
  classes,
  style,
  text,
  loading
}) {
  return (
    <div className={classes.content}>
      {loading ? (
        <div className={classes.loader} style={style}>
          <CircularProgress size={54} />
        </div>
      ) : (
          <Typography variant="h4">
            {text}
          </Typography>
        )}
    </div>
  );
}

Placeholder.propTypes = {
  classes: PropTypes.object.isRequired,
  text: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  loading: PropTypes.bool,
  style: PropTypes.object,
};

Placeholder.defaultProps = {
  text: 'Placeholder text',
  loading: false,
  style: { width: '100%' },
};

export default withStyles(styles)(Placeholder);
