import React, { Component, PropTypes } from 'react';
import polyglot from '../../i18n';

export default class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: props.query,
      sort: props.sort,
    };
    this.handleSortChange = this.handleSortChange.bind(this);
    this.handleQueryChange = this.handleQueryChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSortChange(evt) {
    this.setState({ sort: evt.target.value }, () => {
      this.props.onSortOrderChange(this.state.sort);
    });
  }

  handleQueryChange(evt) {
    this.setState({ query: evt.target.value });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.setState({ sort: 'relevance' });
    this.props.onSearchQuerySubmit(this.state.query);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="search-form search-form--on-dark" >
        <input
          type="text" className="search-form_query"
          onChange={this.handleQueryChange}
          value={this.state.query}
          placeholder={polyglot.t('searchForm.placeholder')}
        />

        <button className="search-form_btn">{polyglot.t('searchForm.btn')}</button>

        <select
          className="search-form_sort-order"
          onChange={this.handleSortChange}
          value={this.state.sort}
        >
          <option value="relevance">{polyglot.t('searchForm.order.relevance')}</option>
          <option value="-lastUpdated">{polyglot.t('searchForm.order.newest')}</option>
          <option value="lastUpdated">{polyglot.t('searchForm.order.oldest')}</option>
          <option value="-duration">{polyglot.t('searchForm.order.longest')}</option>
          <option value="duration">{polyglot.t('searchForm.order.shortest')}</option>
          <option value="title">{polyglot.t('searchForm.order.title')}</option>
        </select>
      </form>
    );
  }
}

SearchForm.propTypes = {
  sort: PropTypes.string,
  query: PropTypes.string,
  onSearchQuerySubmit: PropTypes.func.isRequired,
  onSortOrderChange: PropTypes.func.isRequired,
};

SearchForm.defaultProps = {
  sort: '-lastUpdated', query: '',
};
