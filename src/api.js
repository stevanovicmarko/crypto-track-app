import axios from 'axios';

const COINMARKET_API_URL = 'https://api.coinmarketcap.com/v2/ticker/';

export const getCryptoValues = async (limit = 10, start = 1) => {
  const limitQuery = `limit=${limit}`;
  const startQuery = `start=${start}&`;

  const queryString = `?${startQuery}${limitQuery}`;

  const { data } = await axios.get(`${COINMARKET_API_URL}${queryString}`);

  // transform the data for props before return.
  return Object.values(data.data).reduce((accumulator, currentValue) => {
    const { quotes, ...rest } = currentValue;

    const [currency, { price, percent_change_24h }] = Object.entries(quotes)[0];

    accumulator[rest.id] = {
      ...rest,
      currency,
      price,
      percent_change_24h,
    };
    return accumulator;
  }, {});
};

export const getCryptoDetails = async id => {
    const { data } = await axios.get(`${COINMARKET_API_URL}${id}/`);

    // transform the data for props before return.
    const { quotes, ...rest } = data.data;
    const [currency, details] = Object.entries(quotes)[0];

    return {
      ...rest,
      currency,
      ...details,
    };
};
