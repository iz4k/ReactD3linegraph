import * as types from './types';

const fetchMockDataSuccess = data => ({ type: types.FETCH_MOCKDATA, data });

export function fetchMockData() {
  return dispatch => {
    return fetch('http://localhost:3000', {
      method: 'GET'
    })
    .then(response => {
      const d = [
        { id: 1, value: 'dummy' },
        { id: 2, value: 'mock' }
      ];
      dispatch(fetchMockDataSuccess(d));
    }
    );
  };
}