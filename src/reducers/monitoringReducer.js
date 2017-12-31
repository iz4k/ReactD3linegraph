import * as types from '../actions/types';

const initialState = {
  temperature: [],
  pressure: [],
  vibration: [],
  current: [],
  ultrasound: []
};

export default function stuff(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_TEMPERATUREDATA:
      return { ...state, temperature: action.data };
    case types.FETCH_PRESSUREDATA:
      return { ...state, pressure: action.data };
    case types.FETCH_VIBRATIONDATA:
      return { ...state, vibration: action.data };
    case types.FETCH_CURRENTDATA:
      return { ...state, current: action.data };
    case types.FETCH_ULTRASOUNDDATA:
      return { ...state, ultrasound: action.data };
    default:
      return state;
  }
}
