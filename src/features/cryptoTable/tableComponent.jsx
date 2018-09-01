import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Pager from '../../utilityComponents/pager';
import withLoader from '../../utilityComponents/loader';

import './tableComponent.scss';

const numberRegex = /^\d+(\.\d+)?$/;

const TableComponent = ({ entries, activePage, inputChangeFunc, submitFunc, pageChangeFunc }) => (
  <Fragment>
    <table className="crypto-table">
      <caption>List of cryptocurrencies by rank</caption>
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Short name</th>
          <th scope="col">$ Value</th>
          <th scope="col">Last 24h</th>
          <th scope="col">Amount you own</th>
          <th scope="col">$ Value of your coin</th>
          <th scope="col">$ Gain since last submission</th>
        </tr>
      </thead>
      <tbody>
        {entries.map(
          ({ id, name, symbol, price, percent_change_24h, inputValue, yourMoney, moneyGain }) => (
            <tr key={id}>
              <td scope="col">
                <Link to={`/details/${id}`} className="details-link">
                  {name}
                </Link>
              </td>
              <td scope="col">{symbol}</td>
              <td scope="col">{Math.round(price * 100) / 100}</td>
              <td scope="col" className={percent_change_24h < 0 ? 'loss' : 'gain'}>
                {`${percent_change_24h}%`}
              </td>
              <td scope="col">
                <form className="currency-input-container">
                  <input
                    type="text"
                    pattern="\d+(\.\d+)?"
                    name={id}
                    value={inputValue}
                    required
                    onChange={inputChangeFunc}
                    className={numberRegex.test(inputValue) || inputValue === '' ? null : 'input-error'}
                  />
                  <button name={id} disabled={!numberRegex.test(inputValue)} onClick={submitFunc}>
                    Submit
                  </button>
                </form>
              </td>
              <td scope="col">{`${Math.round(yourMoney * 100) / 100}`}</td>
              <td scope="col" className={moneyGain < 0 ? 'loss' : 'gain'}>
                {`${Math.round(moneyGain * 100) / 100}`}
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
    <Pager activePage={activePage} numberOfPages={5} pageChangeFunc={pageChangeFunc} />
  </Fragment>
);

TableComponent.propTypes = {
  entries: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      symbol: PropTypes.string,
      percent_change_24h: PropTypes.number,
      inputValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      yourMoney: PropTypes.number,
    })
  ).isRequired,
  inputChangeFunc: PropTypes.func.isRequired,
  submitFunc: PropTypes.func.isRequired,
  pageChangeFunc: PropTypes.func.isRequired,
  activePage: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default withLoader({ loaderTitle: 'Loading currencies...' })(TableComponent);
