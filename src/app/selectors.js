export const currencyValues = ({ data }) =>
  data
    .map(entry => {
      const { id, rank, name, symbol, quotes } = entry;
      const currency = Object.keys(quotes)[0];
      const { price, percent_change_24h } = quotes[currency];
      return { id, rank, name, symbol, price, percent_change_24h };
    })
    .sort((prev, next) => prev.rank - next.rank);

export const currencyDetails = data => data;
