import { useState } from 'react';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export const useRequest = () => {
  async function request(url: string, config: AxiosRequestConfig) {
    const req = axios.create({
      baseURL: 'http://localhost:3000',
      timeout: 120000,
      method: 'get',
    });
    return req(url, config)
      .then((res) => res.data)
      .catch((err) => {
        Promise.reject(new Error(err));
      });
  }
  return request;
};
