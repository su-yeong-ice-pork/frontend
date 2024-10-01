import apiClient from './axiosInstance';

export interface SignupData {
  email: string;
  password: string;
  name: string;
  college: string;
  department: string;
}

export interface SignupResponse {
  success: boolean;
  response: null;
  error: null;
}

const handleSignup = async (
  SignupData: SignupData,
): Promise<SignupResponse> => {
  try {
    const response = await apiClient.post<SignupResponse>(
      '/members',
      SignupData,
    );
    return response.data;
  } catch (error: any) {
    throw new Error('에러가 발생했습니다.');
    console.log('error');
  }
};

export default handleSignup;
