import axios from 'axios';
const URL = 'http://localhost:5000';

export const fetchMessages = (data,payload) =>axios.post(`${URL}/messages/get-message`,{data: data}, {headers: payload})
export const usersMessage = (data,payload) =>axios.post(`${URL}/messages/get-user`,{data: data}, {headers: payload})
export const createMessage = (data, payload) =>axios.post(`${URL}/create-message`, {data: data}, {headers: payload})
