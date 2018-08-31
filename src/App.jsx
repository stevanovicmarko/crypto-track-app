import React, { PureComponent } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
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
          <Route exact path="/:page" component={CryptoTable} />
          <Route path="/details/:id" component={Details} />
          <Redirect from="/" exact to="/1" />
        </Switch>
      </Router>
    );
  }
}

export default App;
