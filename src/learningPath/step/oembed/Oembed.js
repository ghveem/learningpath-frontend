/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import get from 'lodash/get';

export const urlIsProductionNDLA = url => /^(http|https):\/\/ndla.no/.test(url);
export const urlIsTestNDLA = url =>
  /^(http|https):\/\/ndla-frontend.([a-zA-Z]+.)api.ndla.no/.test(url);

export const urlIsLocalNdla = url =>
  /^http:\/\/proxy.ndla-local:30017/.test(url);

export default class Oembed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNDLAResource: false,
      listeningToMessages: false,
    };

    this.handleIframeMessages = this.handleIframeMessages.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleScrollTo = this.handleScrollTo.bind(this);
  }

  componentWillMount() {
    this.handleIframeResizing(this.props);
  }

  componentWillReceiveProps(props) {
    if (this.props.oembedContent.url !== props.oembedContent.url) {
      this.handleIframeResizing(props);
    }
  }

  componentWillUnmount() {
    this.disableIframeMessageListener();
  }

  getIframeDOM() {
    return this.iframeDiv.children[0];
  }

  handleIframeResizing({ oembedContent: { url } }) {
    if (urlIsProductionNDLA(url) || urlIsTestNDLA(url) || urlIsLocalNdla(url)) {
      this.setState({ isNDLAResource: true }, this.enableIframeMessageListener);
    } else {
      this.setState(
        { isNDLAResource: false },
        this.disableIframeMessageListener,
      );
    }
  }

  enableIframeMessageListener() {
    if (!this.state.listeningToMessages) {
      window.addEventListener('message', this.handleIframeMessages);
      this.setState({ listeningToMessages: true });
    }
  }

  disableIframeMessageListener() {
    window.removeEventListener('message', this.handleIframeMessages);
    this.setState({ listeningToMessages: false });
  }

  handleScrollTo(evt) {
    const iframe = this.getIframeDOM();
    const rect = iframe.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    const top = evt.data.top + rect.top + scrollTop;
    window.scroll({ top });
  }

  handleResize(evt) {
    if (!evt.data.height) {
      return;
    }
    const iframe = this.getIframeDOM();
    const newHeight = parseInt(get(evt, 'data.height', 0), 10);
    iframe.style.height = `${newHeight}px`; // eslint-disable-line no-param-reassign
  }

  handleIframeMessages(event) {
    const iframe = this.getIframeDOM();
    /* Needed to enforce content to stay within iframe on Safari iOS */
    iframe.setAttribute('scrolling', 'no');

    if (
      !this.state.listeningToMessages ||
      !event ||
      !event.data ||
      iframe.contentWindow !== event.source
    ) {
      return;
    }

    switch (event.data.event) {
      case 'resize':
        this.handleResize(event);
        break;
      case 'scrollTo':
        this.handleScrollTo(event);
        break;
      default:
        break;
    }
  }

  render() {
    const {
      oembedContent: { html, embedType },
    } = this.props;

    return (
      <div>
        <div
          className={classNames({
            'learning-step': true,
            'learning-step_embed': true,
            'learning-step--without-dimensions': this.state.isNDLAResource,
            'learning-step_lti': embedType === 'lti',
            'learning-step_oembed': embedType === 'oembed',
          })}
          dangerouslySetInnerHTML={{ __html: html }}
          ref={iframeDiv => {
            this.iframeDiv = iframeDiv;
          }}
        />
      </div>
    );
  }
}

Oembed.propTypes = {
  oembedContent: PropTypes.object,
  embedType: PropTypes.string,
};

Oembed.defaultProps = {
  oembedContent: {},
};
