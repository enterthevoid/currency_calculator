import XRP from '../assets/XRP.svg'
import BTC from '../assets/BTC.svg'
import LTC from '../assets/LTC.svg'
import ETH from '../assets/ETH.svg'
import UAH from '../assets/UAH.svg'
import USD from '../assets/USD.svg'
import EUR from '../assets/EUR.svg'
import USDT from '../assets/USDT.svg'
import AdvCash from '../assets/AdvCash.png'
import Qiwi from '../assets/Qiwi.svg'
import Payeer from '../assets/Payeer.png'
import WesternUnion from '../assets/WesternUnion.svg'
import MoneyGram from '../assets/MoneyGram.png'

export const isMobile = document.documentElement.clientWidth < 600;

export const paySysCheck = (curr) => {
  return (
    curr === 'Qiwi' ||
    curr === 'AdvCash' ||
    curr === 'MoneyGram' ||
    curr === 'WesternUnion' ||
    curr === 'Payeer'
  );
}

export function getLogo(curr) {
  let src = null;
  switch (curr) {
    case 'BCH':
      src = BTC;
      break;
    case 'BTC':
      src = BTC;
      break;
    case 'LTC':
      src = LTC;
      break;
    case 'ETH':
      src = ETH;
      break;
    case 'UAH':
      src = UAH;
      break;
    case 'USD':
      src = USD;
      break;
    case 'EUR':
      src = EUR;
      break;
    case 'XRP':
      src = XRP;
      break;
    case 'AdvCash':
      src = AdvCash;
      break;
    case 'USDT':
      src = USDT;
      break;
    case 'Qiwi':
      src = Qiwi;
      break;
    case 'Payeer':
      src = Payeer;
      break;
    case 'WesternUnion':
      src = WesternUnion;
      break;
    case 'MoneyGram':
      src = MoneyGram;
      break;
    default:
      break;
  }
  return src
}

export function getTitle(curr) {
  let title = null;
  switch (curr) {
    case 'Payeer':
      title = 'Payeer';
      break;
    case 'WesternUnion':
      title = 'Western Union';
      break;
    case 'MoneyGram':
      title = 'Money Gram';
      break;
    case 'BCH':
      title = 'Bitcoin Cash (BCH)';
      break;
    case 'BTC':
      title = 'Bitcoin (BTC)';
      break;
    case 'LTC':
      title = 'Litecoin (LTC)';
      break;
    case 'ETH':
      title = 'Ethereum (ETH)';
      break;
    case 'XRP':
      title = 'Ripple (XRP)';
      break;
    case 'UAH':
      title = 'Hryvnia (UAH)';
      break;
    case 'USD':
      title = 'Dollar (USD)';
      break;
    case 'EUR':
      title = 'Euro (EUR)';
      break;
    case 'Qiwi':
      title = 'Qiwi';
      break;
    case 'USDT':
      title = 'Tether (USDT)';
      break;
    case 'AdvCash':
      title = 'AdvCash';
      break;
    default:
      break;
  }
  return title
}