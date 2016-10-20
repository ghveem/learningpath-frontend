/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createAction } from 'redux-actions';
import { applicationError } from '../messages/messagesActions';
import { fetchGoogleContent } from '../sources/embedSearch';
import { fetchOembedUrl } from '../sources/learningpaths';
import { getNumberOfPages } from './embedSearchSelectors';

export const setEmbedPreview = createAction('SET_EMBED_PREVIEW');
export const setEmbedResults = createAction('SET_EMBED_RESULTS');
export const removeEmbedPreview = createAction('REMOVE_EMBED_PREVIEW');
export const changeEmbedSearchQuery = createAction('CHANGE_EMBED_SEARCH_QUERY');

export function fetchEmbedSearch(query) {
  return (dispatch, getState) => fetchGoogleContent(query)
    .then((result) => {
      dispatch(setEmbedResults(result));
    })
    .then(() => {
      const updatedQuery = Object.assign({}, query, { numberOfPages: getNumberOfPages(getState()) });
      dispatch(changeEmbedSearchQuery(updatedQuery));
    })
    .catch(err => dispatch(applicationError(err)));
}

export function fetchOembed(url, lang) {
  return (dispatch, getState) => fetchOembedUrl(getState().authToken, { url })
    .then((oembed) => {
      dispatch(setEmbedPreview(Object.assign({}, oembed, { url, language: lang })));
    })
    .catch((err) => {
      dispatch(setEmbedPreview({ error: true }));
      dispatch(applicationError(err));
    });
}