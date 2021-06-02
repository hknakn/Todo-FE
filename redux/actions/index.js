import { SET_USER, GET_USER } from '../constants';

export const setUser = (data) => {
    return {
        type: SET_USER,
        payload: data
    }
}

export const getUser = () => {
    return {
        type: SET_USER
    }
}