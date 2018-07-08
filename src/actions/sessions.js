import { ADD_USER, GET_USER, UPDATE_USER, DELETE_USER } from '../constants/actionTypes';

export const addUser = ( data ) => ({
  type: ADD_USER, 
  payload: {id: data.id, name: data.name, exp: data.exp }
});

export const getUser = ( data ) => ({
  type: GET_USER, 
  payload: {id: data }
});

export const updateUser = ( data ) => ({
  type: UPDATE_USER, 
  payload: {id: data.id, name: data.name, exp: data.exp }
});

export const deleteUser = ( id,name ) => ({
  type: DELETE_USER, 
  payload: {id,name}
});


