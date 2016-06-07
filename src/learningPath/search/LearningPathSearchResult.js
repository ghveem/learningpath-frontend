import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import get from 'lodash/get';
import LabeledIcon from '../../components/LabeledIcon';

import formatDate from '../../util/formatDate';
import formatDuration from '../../util/formatDuration';

import { titleI18N, descriptionI18N, filterFieldsByLanguage } from '../../util/i18nFieldFinder';


export default class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageError: false,
      tag: null,
    };
    this.handleImageError = this.handleImageError.bind(this);
  }

  handleImageError() {
    this.setState({imageError: true});
  }

  render() {
    const { path } = this.props;
    const { lang } = this.context;
    const image = () => {
      if (path.coverPhotoUrl && !this.state.imageError) {
        return <img className="search-result_img" role="presentation" src={path.coverPhotoUrl} onError={this.handleImageError} />;
      }
      return <img className="search-result_img" role="presentation" src={'https://placeholdit.imgix.net/~text?txtsize=33&txt=NDLA&w=190&h=120'} />;
    };
    if (!path.tags) {
      return null;
    }
    const tags = filterFieldsByLanguage(path.tags, lang);

    const onTagClick = (evt, tag) => {
      evt.preventDefault();
      this.setState({tag}, () => {
        this.props.onTagSearchQuery(this.state.tag);
      });
    };

    return (
      <div>
        <Link to={`/learningpaths/${path.id}/first-step/`}>
          <div className="search-result">
            <div className="search-result_img_container">
              {image()}
            </div>
            <div className="search-result_bd">
              <h2 className="search-result_title">
                {titleI18N(path, lang)}
              </h2>
              <div className="search-result_meta">
                <LabeledIcon.Person labelText={get(path, 'author.name')} />
                <LabeledIcon.Today labelText={formatDate(path.lastUpdated, lang)} tagName="time" />
                <LabeledIcon.QueryBuilder labelText={formatDuration(path.duration, lang)} tagName="time" />
              </div>
              <div className="search-result_description">{descriptionI18N(path, lang)}</div>
              <div className="search-result_tags">
                {tags && tags.length > 0 ? <p><strong>Tags:</strong></p> : null}
                {tags.map(tag =>
                  <span className="search-result_tag" onClick={(evt) => onTagClick(evt, tag.tag)} href="#">{tag.tag}</span>
                )}
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

SearchResult.propTypes = {
  path: PropTypes.object.isRequired,
  onTagSearchQuery: PropTypes.func.isRequired
};

SearchResult.contextTypes = {
  lang: PropTypes.string.isRequired
};
