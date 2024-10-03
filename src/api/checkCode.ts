import apiClient from './axiosInstance';

export interface checkCodeData {
  email: string;
  code: string;
}

export interface CheckCodeResponse {
  success: boolean;
  response: null;
  error: null;
}

const checkCode = async (
  checkCodeData: checkCodeData,
): Promise<CheckCodeResponse> => {
  try {
    const response = await apiClient.post<CheckCodeResponse>(
      '/members/check/code',
      checkCodeData,
    );
    return response.data;
  } catch (error: any) {
    throw new Error('에러가 발생했습니다.');
  }
};

export default checkCode;
