import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const styles = theme => ({
  root: {
    overflowX: 'auto',
  },
  table: {
    minHeight: 500,
  },
  selected: {
    backgroundColor: theme.palette.primary.main,
    '& td': {
      color: theme.palette.common.black
    }
  }
});

class СourseTable extends Component {

  render() {
    const { classes, data, currentCurrency, markedCurr } = this.props;

    return (
      <Paper className={classes.root} >
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Course</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(data).map((curr, index) => {
              const values = Object.values(data);
              if (currentCurrency !== curr) {
                return (
                  <TableRow
                    key={index}
                    className={classNames(
                      { [classes.selected]: markedCurr === curr }
                    )}>
                    <TableCell>{curr}</TableCell>
                    <TableCell>{values[index]}</TableCell>
                  </TableRow>
                );
              } else return null;
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

СourseTable.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array,
  currentCurrency: PropTypes.string,
  markedCurr: PropTypes.string
};

export default withStyles(styles)(СourseTable);
