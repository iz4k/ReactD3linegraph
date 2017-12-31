import * as types from './types';
import { generateMockData, range } from '../utils';

const fetchTemperatureDataSuccess = data => ({ type: types.FETCH_TEMPERATUREDATA, data });

export function fetchTemperatureData() {
  return dispatch => {
    return fetch('http://localhost:3000', {
      method: 'GET'
    })
    .then(response => {
      const data = generateMockData(range);
      dispatch(fetchTemperatureDataSuccess(data));
    }
    );
  };
}

const fetchPressureDataSuccess = data => ({ type: types.FETCH_PRESSUREDATA, data });

export function fetchPressureData() {
  return dispatch => {
    return fetch('http://localhost:3000', {
      method: 'GET'
    })
    .then(response => {
      const data = generateMockData(range);
      dispatch(fetchPressureDataSuccess(data));
    }
    );
  };
}
const fetchVibrationDataSuccess = data => ({ type: types.FETCH_VIBRATIONDATA, data });

export function fetchVibrationData() {
  return dispatch => {
    return fetch('http://localhost:3000', {
      method: 'GET'
    })
    .then(response => {
      const data = generateMockData(range);
      dispatch(fetchVibrationDataSuccess(data));
    }
    );
  };
}

const fetchCurrentDataSuccess = data => ({ type: types.FETCH_CURRENTDATA, data });

export function fetchCurrentData() {
  return dispatch => {
    return fetch('http://localhost:3000', {
      method: 'GET'
    })
    .then(response => {
      const data = generateMockData(range);
      dispatch(fetchCurrentDataSuccess(data));
    }
    );
  };
}

const fetchUltrasoundDataSuccess = data => ({ type: types.FETCH_ULTRASOUNDDATA, data });

export function fetchUltrasoundData() {
  return dispatch => {
    return fetch('http://localhost:3000', {
      method: 'GET'
    })
    .then(response => {
      const data = generateMockData(range);
      dispatch(fetchUltrasoundDataSuccess(data));
    }
    );
  };
}
