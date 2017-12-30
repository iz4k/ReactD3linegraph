import { FETCH_MOCKDATA } from '../actions/types';

export default function stuff(state = [], action) {
  switch (action.type) {
    case FETCH_MOCKDATA:
      return action.data;
    default:
      return state;
  }
}
