import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class AlertDialog extends React.Component {

  render() {
    const { openDialog, onCloseDialog, fromCurr, sum, toCurr, countTo, countFrom } = this.props;
    return (
      <Dialog
        open={openDialog}
        onClose={onCloseDialog}
      >
        <DialogTitle>Exchange Info</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {`You converting ${countFrom} ${fromCurr} to ${toCurr}`}
            <br />
            {`The result will be ${sum}`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseDialog} color="primary">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

AlertDialog.propTypes = {
  classes: PropTypes.object,
  openDialog: PropTypes.bool,
  onCloseDialog: PropTypes.func,
  fromCurr: PropTypes.string,
  toCurr: PropTypes.string,
  countTo: PropTypes.any,
  countFrom: PropTypes.any,
  sum: PropTypes.number,
};

export default AlertDialog;