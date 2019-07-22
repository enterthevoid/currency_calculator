import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Flex, Box } from 'reflexbox';
import classNames from 'classnames';

import getRequestData from '../services';
import { dataRecord } from '../publicData';
import Logo from '../assets/logoSym.svg';
import { isMobile, paySysCheck } from './helpers';
import СourseTable from './СourseTable';
import CurrPicker from './CurrPicker';
import ExchangeForm from './ExchangeForm';
import Placeholder from './Placeholder';

const styles = (theme) => ({
  mobileRoot: {
    display: 'flex',
    flexDirection: 'column'
  },
  mobileSideBar: {
    paddingTop: 16,
    width: '92vw'
  },
  root: {
    padding: 24,
    backgroundImage: `url(${Logo})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '50% 50%',
    backgroundSize: '40%',
    flexGrow: 1,
  },
  contenWrapper: {
    opacity: 0.96,
  },
  marginLeft: {
    marginLeft: theme.spacing.unit * 2
  },
  sideBar: {
    maxWidth: 224,
    minWidth: 224
  }
})

class AppFrame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCurr: null,
      markedCurr: null,
      data: [],
      currentCurrency: 'USD',
      course: 0,
      isLoaded: false,
      sum: 0,
      paySysFrom: null,
      paySysTo: null
    }
  }

  handleChangeCurr(selectedCurrency) {
    let curr;
    if (paySysCheck(selectedCurrency)) {
      curr = 'USD'
      this.setState({ paySysFrom: selectedCurrency })
    } else {
      curr = selectedCurrency
    }
    getRequestData(curr, dataRecord)
      .then((data) => {
        this.setState({
          data: data,
          currentCurrency: curr,
          isLoaded: true
        });
      });
  }

  componentDidMount() {
    this.handleChangeCurr('USD');
  }

  handleMarkCourse(from, to) {
    this.setState({
      selectedCurr: from,
      markedCurr: to
    });

    this.handleChangeCurr(from)
  }

  handleChangeToCurr(currTo) {
    const { data } = this.state;

    if (
      currTo === 'AdvCash' ||
      currTo === 'MoneyGram' ||
      currTo === 'WesternUnion' ||
      currTo === 'Qiwi' ||
      currTo === 'Payeer'
    ) {
      this.setState({
        markedCurr: 'USD',
        paySysTo: currTo,
        course: data['USD']
      })
    } else {
      this.setState({
        markedCurr: currTo,
        course: data[currTo],
        paySysTo: null
      })

    }
  }

  handleChangeCount(count) {
    const { markedCurr, course, currentCurrency, paySysFrom, paySysTo } = this.state;
    const cryptoCurrs = (curr) => {
      return (
        curr === 'BCH'
        || curr === 'BTC'
        || curr === 'LTC'
        || curr === 'ETH'
        || curr === 'XRP'
        || curr === 'USDT'
      )
    }

    let per = 0;
    let sum;

    /////////////////////////////////////
    ///// WesternUnion && MoneyGram /////
    /////////////////////////////////////

    if (
      currentCurrency === 'USD' && (
        paySysFrom === 'WesternUnion' ||
        paySysFrom === 'MoneyGram') &&
      cryptoCurrs(markedCurr)
    ) {
      console.log(6)
      per = 6
    }

    if (cryptoCurrs(currentCurrency) && (
      paySysTo === 'WesternUnion' ||
      paySysTo === 'MoneyGram')
    ) {
      console.log(-6)
      per = -6
    }

    /////////////////////////////////////
    //////// AdvCash && Payeer //////////
    /////////////////////////////////////

    if (
      currentCurrency === 'USD' && (
        paySysFrom === 'AdvCash' ||
        paySysFrom === 'Payeer') &&
      cryptoCurrs(markedCurr)
    ) {
      console.log(4.5)
      per = 4.5
    }

    if (cryptoCurrs(currentCurrency) && (
      paySysTo === 'AdvCash' ||
      paySysTo === 'Payeer')
    ) {
      console.log(-4)
      per = -4
    }

    /////////////////////////////////////
    //////////// USD Cashe //////////////
    /////////////////////////////////////

    if (
      currentCurrency === 'USD' &&
      cryptoCurrs(markedCurr) &&
      paySysFrom === null
    ) {
      console.log(3)
      per = 3
    }

    if (
      cryptoCurrs(currentCurrency) &&
      markedCurr === 'USD' &&
      paySysTo === null
    ) {
      console.log(-3)
      per = -3
    }

    /////////////////////////////////////
    ////////////// Crypto ///////////////
    /////////////////////////////////////

    if (
      cryptoCurrs(currentCurrency) &&
      cryptoCurrs(markedCurr) &&
      paySysFrom === null
    ) {
      console.log(-3)
      per = -3
    }

    sum = Math.round(parseFloat(count * course) * (100 + per)) / 100;

    this.setState({ sum });
  }

  render() {
    const { classes } = this.props;
    const {
      markedCurr,
      selectedCurr,
      currentCurrency,
      isLoaded,
      data,
      sum,
    } = this.state;

    if (!isLoaded) {
      return (<Placeholder loading />)
    }

    return (
      <Flex
        className={
          classNames(
            { [classes.mobileRoot]: isMobile },
            { [classes.root]: !isMobile })
        }
        justify="center"
        align="center"
      >
        <Flex
          className={classes.contenWrapper}
          justify="center"
          align="center"
          column={isMobile}
        >
          <Box className={classNames(
            { [classes.mobileSideBar]: isMobile },
            { [classes.sideBar]: !isMobile }
          )}>
            <CurrPicker
              data={Object.keys(data)}
              currentCurrency={currentCurrency}
              onChangeCurrency={(curr) => this.handleChangeCurr(curr)}
            />
            <СourseTable
              data={data}
              currentCurrency={selectedCurr ? selectedCurr : currentCurrency}
              isLoaded={isLoaded}
              markedCurr={markedCurr !== null ? markedCurr : ''}
            />
          </Box>
          <Box className={classNames(
            { [classes.mobileSideBar]: isMobile },
            { [classes.marginLeft]: !isMobile }
          )}
            style={{ paddingBottom: 16 }}
          >
            <ExchangeForm
              isLoaded={isLoaded}
              data={data}
              currentCurrency={currentCurrency}
              sum={sum}
              onMarkCourse={(from, to) => this.handleMarkCourse(from, to)}
              onChangeFromCurr={(currFrom) => this.handleChangeCurr(currFrom)}
              onChangeToCurr={(currTo) => this.handleChangeToCurr(currTo)}
              onChangeCount={(count) => this.handleChangeCount(count)}
            />
          </Box>
        </Flex>
      </Flex >
    );
  }
}


AppFrame.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AppFrame);