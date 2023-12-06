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
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        if (error.response) {
          // Server trả về lỗi (status code không phải 2xx)
          console.error('Lỗi từ máy chủ:', error.response.data);
          console.error('Mã lỗi HTTP:', error.response.status);
          return notification.error({
            message: `Lỗi ${error.response.status}`,
            description: error.response.data.message,
          });
        } else if (error.request) {
          // Không có phản hồi từ máy chủ
          console.error('Không có phản hồi từ máy chủ:', error.request);
          return notification.error({
            message: 'Lỗi',
            description: 'Không có phản hồi từ máy chủ',
          });
        } else {
          // Lỗi trong quá trình gửi yêu cầu
          console.error('Lỗi khi gửi yêu cầu:', error.message);
          return notification.error({
            message: 'Lỗi',
            description: error.message,
          });
        }

        // Để cho phép các thành phần khác của ứng dụng xử lý lỗi này, bạn có thể ném nó lại ra bên ngoài hàm.
        throw error;
      });
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
