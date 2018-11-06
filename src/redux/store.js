import {createStore, applyMiddleware,combineReducers} from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form'


export default function configureStore() {
    const rootReducer = combineReducers({
        form: formReducer,
        reducer,
    });

    return createStore(
        rootReducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
        applyMiddleware(thunk)
    );
};