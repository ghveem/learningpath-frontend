import { createAction } from 'redux-actions';
import { applicationError } from '../messages/messagesActions';
import { fetchImages, fetchImage, fetchImageWithMetaUrl } from '../sources/images';
import pickBy from 'lodash/pickBy';
export const setImages = createAction('SET_IMAGES');
export const setImage = createAction('SET_IMAGE');
export const setImagesSearchTime = createAction('SET_IMAGES_SEARCH_TIME');
export const changeImageSearchQuery = createAction('CHANGE_IMAGE_SEARCH_QUERY');

export function fetchLearningPathImages(query, isFirstSearch = false) {
  return (dispatch) => fetchImages(pickBy(query))
    .then((images) => {
      /*
        If the default search on the title (first search from edit learningpath), a new search will be executed with a empty query string.
      */
      if (images.totalCount === 0 && isFirstSearch) {
        const newQuery = {query: '', 'page-size': query['page-size'], page: query.page};
        dispatch(fetchLearningPathImages(newQuery, false));
      } else {
        dispatch(setImages(images));
        dispatch(changeImageSearchQuery(query));
      }
    })
    .catch(err => dispatch(applicationError(err)));
}

export function fetchLearningPathImage(imageId) {
  return (dispatch) => fetchImage(imageId)
    .then((image) => {
      dispatch(setImage(image));
    })
    .catch(err => dispatch(applicationError(err)));
}
export function fetchLearningPathImageWithMetaUrl(url) {
  return (dispatch) => fetchImageWithMetaUrl(url)
    .then((image) => {
      dispatch(setImage(image));
    })
    .catch(err => dispatch(applicationError(err)));
}