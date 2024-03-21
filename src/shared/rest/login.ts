import axios from 'axios';
import { ENDPOINT } from '../constants';
import { UserModel } from '../types';

export const createUser = async (userData: UserModel) => {
  try {
    const response = await axios.post(`${ENDPOINT}/auth/signup`, userData);
    return response.data;
  } catch (error) {
    
    return error
  }
};

export const loginUser = async (userData: UserModel) => {
  try {
    const response = await axios.post(`${ENDPOINT}/auth/signin`, userData);
    return response.data;
  } catch (error) {
    return error
  }
};