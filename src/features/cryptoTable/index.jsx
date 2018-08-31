import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TableComponent from './tableComponent';
import './tableComponent.scss';

import * as Api from '../../api';
import localStorage from '../../localStorageHelpers';

class CryptoTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      entries: {},
      error: null,
      intervalId: null,
    };
  }

  static REFRESH_INTERVAL = 60 * 1000;

  refreshData = () => {
    // turn on the spinner
    this.setState({
      isLoading: true,
    });
    Api.getCryptoValues(50)
      .then(data => {
        // transform data to hold values retrieved from local storage.
        const entries = Object.values(data).reduce((accumulator, currentValue) => {
          const { id } = currentValue;
          const inputValue = Number.parseFloat(localStorage.getInputValueForId(id));
          const yourMoney = Number.isNaN(inputValue) ? 0 : inputValue * currentValue.price;

          accumulator[id] = {
            ...currentValue,
              // this line of code can be edited so zero value is shown in the input,
              // instead omitted
            inputValue: inputValue || '',
            yourMoney,
          };

          return accumulator;
        }, {});

        // turn of the spinner
        this.setState({
          isLoading: false,
          entries,
        });
      })
      .catch(error => this.setState({ error }));
  };

  componentDidMount() {
    // fetch data and set refresh interval to CryptoTable.REFRESH_INTERVAL
    this.refreshData();
    const intervalId = setInterval(this.refreshData, CryptoTable.REFRESH_INTERVAL);
    this.setState({
      intervalId,
    });
  }

  componentWillUnmount() {
    // clear the timer when component unmounts
    if (this.state.intervalId) {
      clearInterval(this.state.intervalId);
    }
  }

  inputHandler = ({ target }) => {
    const { name: id, value } = target;
    // update local state to hold new input value
    this.setState(prevState => ({
      entries: {
        ...prevState.entries,
        [id]: {
          ...prevState.entries[id],
          inputValue: value,
        },
      },
    }));
  };

  submitHandler = event => {
    event.preventDefault();
    const { name: id } = event.target;
    const { inputValue, price } = this.state.entries[id];
    const multiplier = Number.parseFloat(inputValue);

    const yourMoney = multiplier * price;

    // store the current valid input value inside local storage
    localStorage.storeIdAndInputValue(id, multiplier);

    this.setState(prevState => ({
      entries: {
        ...prevState.entries,
        [id]: {
          ...prevState.entries[id],
          inputValue,
          yourMoney,
        },
      },
    }));
  };

  render() {
    // transform to array and sort by rank before sending to table for rendering.
    const entries = Object.values(this.state.entries).sort((a, b) => a.rank - b.rank);

    return (
      <TableComponent
        isLoading={this.state.isLoading}
        inputChangeFunc={this.inputHandler}
        submitFunc={this.submitHandler}
        entries={entries}
      />
    );
  }
}

export default CryptoTable;
