import axios from 'axios';
import { ENDPOINT } from '../constants';
import { PostModel  } from '../types';
import { GetUserLocalStorage } from '../utils/session.storage';

export const createPost = async (postData: PostModel) => {
  try {
    const user = GetUserLocalStorage();
    const token = user?.data.token;
    const headers = {
      Authorization: `Bearer ${token}`
    };
    
    const response = await axios.post(`${ENDPOINT}/post/create-post`, postData, { headers });
    return response.data;
  } catch (error) {
    console.log('-- error:', error);
    return error
  }
};

export const getPosts = async (status: string, startDate: Date, endDate: Date, page: number, pagesize: number) => {
  try {
    const user = GetUserLocalStorage();
    const token = user?.data.token;
    const headers = {
      Authorization: `Bearer ${token}`
    };

    let url = `${ENDPOINT}/post/get-posts?status=${status}&page=${page}&pageSize=${pagesize}`;
    if (startDate && endDate) {
      url += `&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
    }
    
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.log('-- error:', error);
    return error
  }
};

export const aprovePost = async (postId:string, status: string) => {
  try {
    const user = GetUserLocalStorage();
    const token = user?.data.token;
    const headers = {
      Authorization: `Bearer ${token}`
    };
    
    const response = await axios.put(`${ENDPOINT}/post/aprove-post`, {postId, status}, { headers });
    return response.data;
  } catch (error) {
    console.log('-- error:', error);
    return error
  }
};

export const deletePost = async (postId:string, status: string) => {
  try {
    const user = GetUserLocalStorage();
    const token = user?.data.token;
    const headers = {
      Authorization: `Bearer ${token}`
    };
    
    const response = await axios.put(`${ENDPOINT}/post/delete-post`, {postId, status}, { headers });
    return response.data;
  } catch (error) {
    console.log('-- error:', error);
    return error
  }
};

export const likedPost = async (postId:string, userName: string) => {
  try {
    const user = GetUserLocalStorage();
    const token = user?.data.token;
    const headers = {
      Authorization: `Bearer ${token}`
    };
    
    const response = await axios.post(`${ENDPOINT}/post/like-post`, {postId, userName}, { headers });
    return response.data;
  } catch (error) {
    console.log('-- error:', error);
    return error
  }
};