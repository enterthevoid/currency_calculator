import axios from 'axios';

function modifyData(fetchedData) {
  let newData = [];
  for (var curr in fetchedData) {
    let key = curr;
    let value = fetchedData[curr];
    newData[key] = value
  }
  return newData
}

export default function getRequestData(from, to) {
  const link =
    `https://min-api.cryptocompare.com/data/price?fsym=${from}&tsyms=${to}`;

  return axios.get(link)
    .then(res => modifyData(res.data))
}
