import { combineReducers } from 'redux';
import monitoring from './monitoringReducer';

const rootReducer = combineReducers({
  monitoring
});

export default rootReducer;
