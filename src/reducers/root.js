import { combineReducers } from 'redux';
import newReducer from './newReducer';

const rootReducer = combineReducers({Employees: newReducer});

export default rootReducer;