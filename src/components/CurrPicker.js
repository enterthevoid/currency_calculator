import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';

import { getTitle } from './helpers';

const styles = (theme) => ({
  formControl: {
    width: '100%',
    marginBottom: theme.spacing.unit * 2
  },
});

class CurrPicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labelWidth: 0,
    }
  }

  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    });
  }

  render() {
    const { classes, currentCurrency, data, onChangeCurrency } = this.props;

    return (
      <div>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel
            ref={ref => { this.InputLabelRef = ref; }}
            htmlFor="outlined-age-simple"
          >
            Currency
          </InputLabel>
          <Select
            value={currentCurrency}
            onChange={(e) => onChangeCurrency(e.target.value)}
            input={
              <OutlinedInput
                labelWidth={this.state.labelWidth}
                id="outlined-age-simple"
              />
            }
          >
            {data.map(curr => {
              return (
                <MenuItem
                  key={curr}
                  selected={curr === currentCurrency}
                  value={curr}
                >
                  {getTitle(curr)}
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>
      </div>
    )
  }
}

CurrPicker.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array,
  currentCurrency: PropTypes.string,
  onChangeCurrency: PropTypes.func
};

export default withStyles(styles)(CurrPicker);
