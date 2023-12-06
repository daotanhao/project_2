import { notification } from 'antd';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { useState } from 'react';

export const useRequest = () => {
  async function request(url: string, config?: AxiosRequestConfig) {
    const req: AxiosInstance = axios.create({
      baseURL: 'https://api-proj2.onrender.com',
      timeout: 120000,
      method: 'get',
    });
    return req(url, config)
      .then((response) => response.data)
      .catch((error) => error);
  }
  return request;
};

export const useRequestWithState = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const _request = useRequest();
  async function request(url: string, config?: AxiosRequestConfig) {
    setLoading(true);
    return _request(url, config).finally(() => setLoading(false));
  }
  return { request, loading };
};
