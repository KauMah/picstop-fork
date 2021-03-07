// @ts-ignore: Weirdness with react-native-dotenv
import { API_URL } from '@env';
import axios from 'axios';

export const exo = axios.create({
  baseURL: API_URL,
});

export const setToken = (token: string) => {
  exo.defaults.headers.common.Authorization = token;
};

export const removeToken = () => {
  delete exo.defaults.headers.common.Authorization;
};

export const setApiUrl = (url: string) => {
  exo.defaults.baseURL = url;
};

const uploadImage = async (
  method: string,
  url: string,
  file: { uri: string; type: string },
) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader('Content-Type', file.type);
    xhr.onload = () => {
      if (xhr.status !== 200) {
        reject(
          new Error(
            `Request failed: Status: ${xhr.status}. Context: ${xhr.responseText}`,
          ),
        );
      }
      resolve(xhr.responseText);
    };
    xhr.send(file);
  });
};

export const uploadImageToS3 = async (image: string, signedUrl: string) => {
  await uploadImage('PUT', signedUrl, {
    uri: image,
    type: 'image/jpeg',
  });
};
