import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import TableComponent from './tableComponent';
import './tableComponent.scss';
import Error from '../../utilityComponents/error';
import * as Api from '../../api';
import localStorage from '../../localStorageHelper';

class CryptoTable extends Component {
  // 60 secs refresh interval
  static REFRESH_INTERVAL = 60 * 1000;

  constructor(props) {
    super(props);
    const { page: activePage } = this.props.match.params;
    this.state = {
      isLoading: true,
      entries: {},
      error: null,
      intervalId: null,
      activePage,
    };
  }

  refreshData = page => {
    // turn on the spinner
    this.setState({
      isLoading: true,
    });
    Api.getCryptoValues(10, (page - 1) * 10 + 1)
      .then(data => {
        // transform data to hold values retrieved from local storage.
        const entries = Object.values(data).reduce((accumulator, currentValue) => {
          const { id } = currentValue;
          const { amountOfCurrency, oldCurrencyValue } = localStorage.getInputValueForId(id);

          const maybeValidAmountOfCurrency = Number.parseFloat(amountOfCurrency);
          let inputValue, yourMoney, moneyGain;

          if (Number.isNaN(maybeValidAmountOfCurrency)) {
            inputValue = '';
            yourMoney = 0;
            moneyGain = 0;
          } else {
            inputValue = maybeValidAmountOfCurrency;
            yourMoney = inputValue * currentValue.price;
            moneyGain = yourMoney - inputValue * oldCurrencyValue;
          }

          accumulator[id] = {
            ...currentValue,
            // this line of code can be edited so zero value is shown in the input,
            // instead omitted
            inputValue: inputValue || '',
            yourMoney,
            moneyGain,
          };

          return accumulator;
        }, {});

        // turn of the spinner
        this.setState({
          isLoading: false,
          entries,
        });
      })
      .catch(error => {
        this.setState({ error, isLoading: false });
      });
  };

  componentDidMount() {
    // fetch data and set refresh interval to CryptoTable.REFRESH_INTERVAL
    const { page } = this.props.match.params;
    this.refreshData(page);
    const intervalId = setInterval(() => this.refreshData(page), CryptoTable.REFRESH_INTERVAL);
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

    const amountOfCurrency = Number.parseFloat(inputValue);
    const oldCurrencyValue = this.state.entries[id].price;

    const yourMoney = amountOfCurrency * price;

    // store the current valid input value inside local storage
    localStorage.storeIdAndInputValue(id, amountOfCurrency, oldCurrencyValue);

    this.setState(prevState => ({
      entries: {
        ...prevState.entries,
        [id]: {
          ...prevState.entries[id],
          inputValue,
          yourMoney,
          moneyGain: 0,
        },
      },
    }));
  };

  pageChangeHandler = activePage => {
    this.props.history.push(`/${activePage}`);
    this.refreshData(activePage);
    if (this.state.intervalId) {
      clearInterval(this.state.intervalId);
    }
    const intervalId = setInterval(
      () => this.refreshData(activePage),
      CryptoTable.REFRESH_INTERVAL
    );
    this.setState({
      intervalId,
      activePage,
    });
  };

  render() {
    if (this.state.error) {
      return <Error error={this.state.error} />;
    }

    return (
      <TableComponent
        isLoading={this.state.isLoading}
        inputChangeFunc={this.inputHandler}
        submitFunc={this.submitHandler}
        entries={Object.values(this.state.entries).sort((a, b) => a.rank - b.rank)}
        activePage={this.state.activePage}
        pageChangeFunc={this.pageChangeHandler}
      />
    );
  }
}

export default withRouter(CryptoTable);
