import React from "/vendor/react";
import PropTypes from "prop-types";
import gql from "/vendor/graphql-tag";

import Icon from "./Icon";

class NamespaceIcon extends React.Component {
  static propTypes = {
    namespace: PropTypes.shape({
      color: PropTypes.string,
      icon: PropTypes.string,
    }).isRequired,
  };

  static fragments = {
    namespace: gql`
      fragment NamespaceIcon_namespace on Namespace {
        colour: colourId
        icon: iconId
      }
    `,
  };

  render() {
    const { namespace: ns, ...props } = this.props;
    return <Icon icon={ns.icon || "BRIEFCASE"} colour={ns.colour} {...props} />;
  }
}

export default NamespaceIcon;
