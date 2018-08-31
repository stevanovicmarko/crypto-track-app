import React from 'react';
import withLoader from '../../utilityComponents/loader';

import './detailsComponent.scss';

const Details = props => {
  return (
        <div className="details-container">
          <table className="details-table">
            <caption>Currency details</caption>
            <tbody>
              {Object.entries(props).map(([title, value]) => (
                <tr key={title}>
                  <th>{title}</th>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  );
};

export default withLoader({ loaderTitle: 'Loading details...' })(Details);
