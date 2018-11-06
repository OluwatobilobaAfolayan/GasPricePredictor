import {ActionType} from './actions';
const initialState = {
    test: null
};

export default function reducer(oldState = initialState , action) {
    let newState;
    switch (action.type){
        case ActionType.test:
            newState = { ...oldState, test: action.payload };
            console.log('The new state is ',newState);
            break;
        default:
            return oldState;
    }
    return newState;
}