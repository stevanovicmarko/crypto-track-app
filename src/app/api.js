import axios from 'axios';

const COINMARKET_API_URL = 'https://api.coinmarketcap.com/v2/ticker/';

export const getCryptoValues = async (limit, start) => {
  const startQuery = start ? `start=${start}&` : '';
  const limitQuery = limit ? `limit=${limit}&` : '';

  const queryString = `?${startQuery}${limitQuery}structure=array`;

  try {
    const { data } = await axios.get(`${COINMARKET_API_URL}${queryString}`);
    return data;
  } catch (error) {
    return {
      error,
    };
  }
};

export const getCryptoDetails = async id => {
    try {
        const { data } = await axios.get(`${COINMARKET_API_URL}${id}?structure=array`);
        return data;
    } catch (error) {
        return {
            error,
        };
    }
};
