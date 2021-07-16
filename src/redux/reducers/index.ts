import { combineReducers } from 'redux';
import { PhosReducer } from './phosReducer';
import { UserReducer } from './userReducer';

const rootReducer = combineReducers({
    userReducer: UserReducer,
    payReducer : PhosReducer
})

export type ApplicationState = ReturnType<typeof rootReducer>

export { rootReducer}