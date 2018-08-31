import React, { PureComponent } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
// import PropTypes from 'prop-types';

import history from './history';
import CryptoTable from './features/cryptoTable';
import Details from './features/details';

import './App.scss';

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={CryptoTable} />
          <Route path="/details/:id" component={Details} />
        </Switch>
      </Router>
    );
  }
}

export default App;
