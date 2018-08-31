import React, { PureComponent } from 'react';

import DetailsComponent from './detailsComponent';

import * as Api from '../../api';

class Details extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.setState({ isLoading: true });

    // Format keys to show pretty keys
    Api.getCryptoDetails(id).then(data => {
      const entries = Object.entries(data).reduce((accumulator, [key, value]) => {
        const prettyKey = key.split('_').join(' ');
        accumulator[prettyKey] = value || 'N/A';
        return accumulator;
      }, {});

      this.setState({ ...entries, isLoading: false });
    });
  }

  render() {
    return <DetailsComponent {...this.state} />;
  }
}

export default Details;
