import React from "/vendor/react";
import PropTypes from "prop-types";
import { graphql } from "/vendor/react-apollo";
import gql from "/vendor/graphql-tag";

import BannerSink from "/lib/component/relocation/BannerSink";

import { RetryConnectionBanner } from "/lib/component/banner";

class GlobalAlert extends React.PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };

  render() {
    const { data } = this.props;

    return (
      <React.Fragment>
        {data.localNetwork && data.localNetwork.offline && (
          <BannerSink>
            <RetryConnectionBanner />
          </BannerSink>
        )}
      </React.Fragment>
    );
  }
}

export default graphql(gql`
  query GlobalAlertQuery {
    localNetwork @client {
      offline
      retry
    }
  }
`)(GlobalAlert);
