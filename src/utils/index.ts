import { message } from 'antd';
import { RcFile } from 'antd/es/upload';

export const getBase64Image = (
  img: RcFile,
  callback: (url: string) => void
) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

export const beforeUploadImage = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

export const getHumanReadableUrl = (url: string = '') => {
  return url.toLowerCase().replace(/\s/g, '-');
};
