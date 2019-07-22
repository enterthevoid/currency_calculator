import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Flex } from 'reflexbox';
import classNames from 'classnames';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import Loop from '@material-ui/icons/Loop';
import KeyboardBackspace from '@material-ui/icons/KeyboardBackspace';
import VisibilityOff from '@material-ui/icons/VisibilityOff'

import { getLogo, getTitle, isMobile, check } from './helpers';
import AlertDialog from './AlertDialog';
import { fullDataRecord } from '../publicData';

const styles = (theme) => ({
  root: {
    width: 'auto',
    padding: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 2
  },
  title: {
    marginBottom: theme.spacing.unit * 2
  },
  formControl: {
    minWidth: 200,
    width: 'auto',
    marginBottom: theme.spacing.unit * 2
  },
  avatar: {
    borderRadius: '50%',
    height: 60,
    width: 60,
    background: '#fff',
    border: `2px solid ${theme.palette.primary.main}`,
    '& img': {
      objectFit: 'contain'
    }
  },
  marginTop: {
    marginTop: theme.spacing.unit * 3,
  },
  arrow: {
    transform: 'rotate(180deg)',
    color: theme.palette.common.white,
    height: 60,
    width: 60,
  },
  arrowMobile: {
    transform: 'rotate(90deg)',
  },
  arrowWrapper: {
    alignSelf: 'center',
    padding: theme.spacing.unit * 2,
  }
})

class ExchangeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labelWidth: 0,
      fromCurr: 'USD',
      fromCurrLogo: getLogo('USD'),
      toCurr: '0',
      toCurrLogo: null,
      countFrom: 0,
      openDialog: false,
      sum: 0
    }
  }

  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    });
  }

  componentWillReceiveProps(nextProps) {
    const { sum } = this.props;

    if (nextProps.sum !== sum) {
      this.setState({ sum: nextProps.sum });
    }
  }

  onCalculateSum(count) {
    const { onChangeCount } = this.props;

    onChangeCount(count)
    this.setState({
      countFrom: count
    })
  }


  onChangeCurrency(curr, direction) {
    const { countFrom } = this.state;
    const { onChangeFromCurr, onChangeToCurr } = this.props;

    if (direction === 'from') {
      // if (check(curr)) {
      //   onChangeFromCurr('USD')
      // } else {
      //   onChangeFromCurr(curr)
      // }
      onChangeFromCurr(curr)
      this.setState({
        fromCurr: curr,
        fromCurrLogo: getLogo(curr),
        countFrom: 0,
        sum: 0,
      })
    }
    if (direction === 'to') {
      onChangeToCurr(curr);
      this.onCalculateSum(countFrom);
      this.setState({
        toCurr: curr,
        toCurrLogo: getLogo(curr),
        countFrom: 0,
        sum: 0,
        rigthPaySys: true,
      });
    }
  }

  handleExchangeCurr() {
    // Dialog handler


    // const { fromCurr, toCurr, countTo } = this.state
    this.setState({ openDialog: true })
  }

  render() {
    const { classes } = this.props;
    const {
      fromCurrLogo,
      toCurrLogo,
      countFrom,
      sum,
      openDialog,
      fromCurr,
      toCurr,
      labelWidth
    } = this.state;
    const mapingData = fullDataRecord

    return (
      <Paper className={classNames(
        classes.root,
        { [classes.marginLeft]: isMobile })
      }>
        <Typography variant="h6" className={classes.title}>Exchange Tool</Typography>
        <Flex align="center" column>
          <Flex align="end" column={isMobile} w={isMobile ? 1 : 'auto'}>
            <Flex align="center" column w={isMobile ? 1 : 'auto'}>
              <Avatar src={fromCurrLogo} className={classes.avatar} />
              <Flex column w={isMobile ? 1 : 'auto'}>
                <Typography variant="subtitle1" className={classes.title}>
                  From
                </Typography>
                <FormControl
                  variant="outlined"
                  className={classes.formControl}
                >
                  <InputLabel
                    ref={ref => { this.InputLabelRef = ref }}
                    htmlFor="outlined-age-simple"
                  >
                    Currency
                  </InputLabel>
                  <Select
                    value={fromCurr}
                    onChange={(e) => this.onChangeCurrency(e.target.value, 'from')}
                    input={
                      <OutlinedInput
                        labelWidth={labelWidth}
                        id="outlined-age-simple"
                      />
                    }
                  >
                    {mapingData.map(curr => {
                      if (curr !== toCurr) {
                        return (
                          <MenuItem
                            key={curr}
                            selected={curr === fromCurr}
                            value={curr}
                          >
                            {getTitle(curr)}
                          </MenuItem>
                        )
                      } else return null;
                    })}
                  </Select>
                </FormControl>
                <TextField
                  label='Count'
                  className={classes.textField}
                  value={countFrom}
                  onChange={e => this.onCalculateSum(e.target.value)}
                  onFocus={() => this.setState({ countFrom: '' })}
                  margin="normal"
                  variant="outlined"
                />
              </Flex>
            </Flex>
            <Flex
              className={
                classNames(
                  classes.arrowWrapper,
                  { [classes.arrowMobile]: isMobile }
                )}
            >
              <KeyboardBackspace className={classes.arrow} />
            </Flex>
            <Flex align="center" column w={isMobile ? 1 : 'auto'}>
              {toCurrLogo === null
                ? <VisibilityOff className={classes.avatar} />
                : <Avatar src={toCurrLogo} className={classes.avatar} />
              }
              <Flex column w={isMobile ? 1 : 'auto'}>
                <Typography variant="subtitle1" className={classes.title}>
                  To
                </Typography>
                <FormControl
                  variant="outlined"
                  className={classes.formControl}
                >
                  <InputLabel
                    ref={ref => { this.InputLabelRef = ref }}
                    htmlFor="outlined-age-simple"
                  >
                    Currency
                  </InputLabel>
                  <Select
                    value={toCurr}
                    onChange={(e) => this.onChangeCurrency(e.target.value, 'to')}
                    input={
                      <OutlinedInput
                        labelWidth={labelWidth}
                        id="outlined-age-simple"
                      />
                    }
                  >
                    <MenuItem value="0" disabled>
                      Select Currency
                    </MenuItem>
                    {mapingData.map(curr => {
                      if (curr !== fromCurr) {
                        return (
                          <MenuItem
                            key={curr}
                            selected={curr === toCurr}
                            value={curr}
                          >
                            {getTitle(curr)}
                          </MenuItem>
                        )
                      } else return null;
                    }
                    )}
                  </Select>
                </FormControl>
                <TextField
                  label='You get'
                  className={classes.textField}
                  value={sum}
                  margin="normal"
                  variant="outlined"
                />
              </Flex>
            </Flex>
          </Flex>
          <Fab
            variant="extended"
            color="primary"
            className={classes.marginTop}
            onClick={() => this.handleExchangeCurr()}
          >
            <Loop />
            Exchange
          </Fab>
        </Flex>

        <AlertDialog
          openDialog={openDialog}
          onCloseDialog={() => this.setState({ openDialog: false })}
          fromCurr={fromCurr}
          toCurr={toCurr}
          sum={sum}
          countFrom={countFrom}
          fromCurrLogo={fromCurrLogo}
          toCurrLogo={toCurrLogo}
        />
      </Paper >
    );
  }
}

ExchangeForm.propTypes = {
  classes: PropTypes.object.isRequired,
  data: PropTypes.array,
  onMarkCourse: PropTypes.func,
  onChangeFromCurr: PropTypes.func,
  onChangeToCurr: PropTypes.func,
  onChangeCount: PropTypes.func,
  sum: PropTypes.number
};

export default withStyles(styles)(ExchangeForm);
