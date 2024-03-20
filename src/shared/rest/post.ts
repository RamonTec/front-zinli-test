import axios from 'axios';
import { ENDPOINT } from '../constants';
import { PostModel  } from '../types';
import { GetUserLocalStorage } from '../utils/session.storage';

export const createPost = async (userData: PostModel) => {
  try {
    const user = GetUserLocalStorage();
    const token = user?.data.token;
    const headers = {
      Authorization: `Bearer ${token}`
    };
    
    const response = await axios.post(`${ENDPOINT}/post/create-post`, userData, { headers });
    return response.data;
  } catch (error) {
    console.log('-- error:', error);
    return error
  }
};

export const getPosts = async () => {
  try {
    const user = GetUserLocalStorage();
    const token = user?.data.token;
    const headers = {
      Authorization: `Bearer ${token}`
    };
    
    const response = await axios.get(`${ENDPOINT}/post/get-posts`, { headers });
    return response.data;
  } catch (error) {
    console.log('-- error:', error);
    return error
  }
};