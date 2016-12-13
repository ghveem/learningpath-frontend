/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import classNames from 'classnames';
import ReactDOM from 'react-dom';
import get from 'lodash/get';

export const urlIsNDLA = url => (/^(http|https):\/\/ndla.no/).test(url);
export const urlIsApiNDLA = url => (/^(http):\/\/api.(test|staging).ndla.no/).test(url);

export default class Oembed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNDLAResource: false,
      listeningToResize: false,
    };

    this.handleResizeMessage = this.handleResizeMessage.bind(this);
  }

  componentDidMount() {
    this.handleIframeResizing(this.props);
  }

  componentWillReceiveProps(props) {
    this.handleIframeResizing(props);
  }

  componentWillUnmount() {
    this.disableIframeResizing();
  }

  getIframeDOM() {
    return ReactDOM.findDOMNode(this).children[0];
  }

  handleIframeResizing({ oembedContent: { url } }) {
    if (urlIsNDLA(url) || urlIsApiNDLA(url)) {
      this.setState({ isNDLAResource: true }, this.enableIframeResizing);
    } else {
      this.setState({ isNDLAResource: false }, this.disableIframeResizing);
    }
  }

  enableIframeResizing() {
    if (!this.state.listeningToResize) {
      window.addEventListener('message', this.handleResizeMessage);
      this.setState({ listeningToResize: true });
    }
  }

  disableIframeResizing() {
    window.removeEventListener('message', this.handleResizeMessage);
    this.setState({ listeningToResize: false });
  }

  handleResizeMessage(evt) {
    if (!this.state.listeningToResize) {
      return;
    }

    const iframe = this.getIframeDOM();

    if (iframe.contentWindow !== get(evt, 'source')) {
      return;
    }

    const newHeight = parseInt(get(evt, 'data.height', 0), 10) + 55;
    const currentHeight = parseInt(get(iframe, 'style.height') || 0, 10);

    if (newHeight > currentHeight) {
      iframe.style.height = `${newHeight}px`;
    }
  }

  render() {
    const { oembedContent: { html } } = this.props;

    return (
      <div
        className={classNames({
          'learning-step': true,
          'learning-step_embed': true,
          'learning-step--without-dimensions': this.state.isNDLAResource,
        })}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }
}

Oembed.propTypes = {
  oembedContent: PropTypes.object.isRequired,
};

Oembed.defaultProps = {
  oembedContent: {},
};
