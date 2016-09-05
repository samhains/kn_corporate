import {Map} from 'immutable';
import {loop, Effects} from 'redux-loop';
import {centersBySuburb} from '../../services/kindynow';
import {generateRandomNumber} from '../../services/randomNumberService';

// Initial state
const initialState = Map({
  value: 0,
  loading: false
});

// Actions
const UPDATE_SUBURB_NAME = 'ServiceSearchState/UPDATE_SUBURB_NAME';
const SEARCH_SUBURB_NAME = 'ServiceSearchState/SEARCH_SUBURB_NAME';
const RESET = 'ServiceSearchState/RESET';
const SEARCH_REQUEST = 'ServiceSearchState/SEARCH_REQUEST';
const SEARCH_RESPONSE = 'ServiceSearchState/SEARCH_RESPONSE';

// Action creators
export function submit(suburb) {
  return {type: SEARCH_REQUEST, suburb };
}

export function change(suburb) {
  return {type: UPDATE_SUBURB_NAME, suburb };
}

export function requestCentersBySuburb(suburb) {
  return async () => {
    return {
      type: SEARCH_RESPONSE,
      payload:  await centersBySuburb(suburb)
    }
  };
}

// Reducer
export default function ServiceSearchStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_SUBURB_NAME:
      return state.update('suburb', suburb => action.suburb);

    case SEARCH_REQUEST:
      return loop(
        state.set('loading', true),
        Effects.promise(requestCentersBySuburb(action.suburb))
      );

    case SEARCH_RESPONSE:
      console.log('payload!', action.payload);
      return state
        .set('loading', false)
        .set('value', action.payload);

    default:
      return state;
  }
}
