import * as types from './types';
import { generateMockData } from '../utils';

const fetchMockDataSuccess = data => ({ type: types.FETCH_MOCKDATA, data });

export function fetchMockData(range) {
  return dispatch => {
    return fetch('http://localhost:3000', {
      method: 'GET'
    })
    .then(response => {
      const data = generateMockData(range);
      dispatch(fetchMockDataSuccess(data));
    }
    );
  };
}