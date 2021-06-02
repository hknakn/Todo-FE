import { SET_USER, GET_USER } from '../constants';

const initialState = {
    user: null,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload
            };

        case GET_USER:
            return {
                ...state,
            };

        default:
            return state;
    }
}

export default userReducer;