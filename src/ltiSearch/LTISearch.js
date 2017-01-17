/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import Lightbox from '../common/Lightbox';
import { changeIframeContent } from './ltiSearchActions';

class LTISearch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ltiDisplay: true,
    };
    this.handlePostMessage = this.handlePostMessage.bind(this);
    this.ltiSearchClose = this.ltiSearchClose.bind(this);
  }

  componentDidMount() {
    window.addEventListener('message', this.handlePostMessage);
    changeIframeContent(this.props.filter);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.filter && nextProps.filter.type === 'lti') {
      this.setState({ ltiDisplay: true });
    }
  }
  componentDidUpdate() {
    if (this.state.ltiDisplay) {
      changeIframeContent(this.props.filter);
    }
  }

  handlePostMessage(evt) {
    if (!evt.data || evt.data.type !== 'ltiParams') {
      return;
    }
    this.props.embedTypeOnBlur('lti');
    if (evt.data.params.url) {
      this.props.urlOnBlur(decodeURIComponent(evt.data.params.url));
    }
    this.setState({ ltiDisplay: false });
  }

  ltiSearchClose() {
    this.setState({ ltiDisplay: false });
  }

  render() {
    return (
      <div className="big-lightbox_wrapper big-lightbox_wrapper--scroll">
        <Lightbox display={this.state.ltiDisplay} onClose={this.ltiSearchClose}>
          <div id="ltiiframewrapper" className="lti-iframe_wrapper">
            <iframe id="ltiiframe" />
          </div>
        </Lightbox>
      </div>
    );
  }
}

LTISearch.propTypes = {
  filter: PropTypes.object.isRequired,
  embedTypeOnBlur: PropTypes.func.isRequired,
  urlOnBlur: PropTypes.func.isRequired,
};

LTISearch.contextTypes = {
  lang: PropTypes.string.isRequired,
};

export default LTISearch;
