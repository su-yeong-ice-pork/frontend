//login.ts
import {setItem, getItem} from './asyncStorage';
import apiClient from './axiosInstance';
import axios from 'axios';

const handleLogin = async (email: string, password: string) => {
  try {
    const response = await apiClient.post('/members/login', {
      email,
      password,
    });
    const authToken = response.headers['authorization'];
    const refreshToken = response.data.response.refreshToken;

    await setItem('authToken', authToken);

    return {
      success: true,
      data: {
        refreshToken,
      },
      headers: response.headers,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data || error.message,
    };
  }
};

// 자동 로그인 함수
export const autoLogin = async (refreshToken: string) => {
  try {
    const response = await apiClient.post('/members/auto-login', {
      refreshToken,
    });

    const authToken = response.headers['authorization'];

    await setItem('authToken', authToken);

    return {
      success: true,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.response?.data || error.message,
    };
  }
};
axios.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    //401일 때 가로채서
    if (
      (error.response.status === 401 || error.response.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refreshToken = await getItem('refreshToken');
      try {
        const response = await axios.post('/members/auto-login', {
          refreshToken,
        });
        const newAccessToken = response.data.accessToken;
        originalRequest.headers['Authorization'] = `${newAccessToken}`;
        return axios(originalRequest);
      } catch (err) {
        // 에러 처리 (예: 재로그인 요청)
      }
    }

    return Promise.reject(error);
  },
);

export default handleLogin;
