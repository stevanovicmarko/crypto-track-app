import axios from 'axios';

const COINMARKET_API_URL = 'https://api.coinmarketcap.com/v2/ticker/';

export const getCryptoValues = async (limit, start) => {
  const startQuery = start ? `start=${start}&` : '';
  const limitQuery = limit ? `limit=${limit}&` : '';

  const queryString = `?${startQuery}${limitQuery}`;

  try {
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
  } catch (error) {
    return {
      error,
    };
  }
};

export const getCryptoDetails = async id => {
  try {
    const { data } = await axios.get(`${COINMARKET_API_URL}${id}/`);

      // transform the data for props before return.
    const {quotes, ...rest} = data.data;
    const [currency, details] = Object.entries(quotes)[0];

    return  {
        ...rest,
        currency,
        ...details,
    }
  } catch (error) {
    return {
      error,
    };
  }
};
