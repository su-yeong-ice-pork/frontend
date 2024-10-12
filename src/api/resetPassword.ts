// resetPassword.ts
import apiClient from './axiosInstance';

export interface ResetPasswordData {
  name: string;
  email: string;
  password: string;
}

export interface ResetPasswordResponse {
  success: boolean;
  response: null;
  error: null;
}

const resetPassword = async (
  data: ResetPasswordData,
): Promise<ResetPasswordResponse> => {
  try {
    const response = await apiClient.patch<ResetPasswordResponse>(
      '/members',
      data,
    );
    return response.data;
  } catch (error: any) {
    throw new Error('에러가 발생했습니다.');
  }
};

export default resetPassword;
