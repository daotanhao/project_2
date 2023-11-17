import { notification } from 'antd';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { useState } from 'react';

export const useRequest = () => {
  const [loading, setLoading] = useState<boolean>(false);
  async function request(url: string, config?: AxiosRequestConfig) {
    setLoading(true);
    const req: AxiosInstance = axios.create({
      baseURL: 'http://localhost:3000',
      timeout: 120000,
      method: 'get',
    });
    return req(url, config)
      .then((res) => res.data)
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
      })
      .finally(() => setLoading(false));
  }
  return { request, loading };
};