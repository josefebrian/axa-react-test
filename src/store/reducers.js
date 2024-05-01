import { combineReducers } from 'redux';

import homeReducer from 'containers/Home/reducer';
import postsReducer from 'containers/Posts/reducer';
import photosReducer from 'containers/Photos/reducer';
import albumsReducer from 'containers/Albums/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers) {
  return combineReducers({
    homeReducer: homeReducer,
    postsReducer: postsReducer,
    photosReducer: photosReducer,
    albumsReducer: albumsReducer,
    ...injectedReducers,
  });
}
