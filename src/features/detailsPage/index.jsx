import React, { PureComponent } from 'react';

import DetailsComponent from './detailsComponent';
import Error from '../../utilityComponents/error';

import * as Api from '../../api';

class Details extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      details: {},
      error: null,
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.setState({ isLoading: true });

    // Format keys to show pretty keys
    Api.getCryptoDetails(id)
      .then(data => {
        const details = Object.entries(data).reduce((accumulator, [key, value]) => {
          const prettyKey = key.split('_').join(' ');
          accumulator[prettyKey] = value || 'N/A';
          return accumulator;
        }, {});

        this.setState({ details, isLoading: false });
      })
      .catch(error => {
        this.setState({ error, isLoading: false });
      });
  }

  render() {
    if (this.state.error) {
      return <Error error={this.state.error} />;
    }
    return <DetailsComponent isLoading={this.state.isLoading} details={this.state.details} />;
  }
}

export default Details;
