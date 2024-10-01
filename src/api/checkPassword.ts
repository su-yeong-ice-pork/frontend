import apiClient from './axiosInstance';

export interface CheckPasswordData {
  password: string;
}

export interface CheckPasswordResponse {
  success: boolean;
  response: null;
  error: {
    status: number;
    message: string;
  } | null;
}

const checkPasswordFormat = async (
  passwordData: CheckPasswordData,
): Promise<CheckPasswordResponse> => {
  try {
    const response = await apiClient.post<CheckPasswordResponse>(
      '/members/check/password',
      passwordData,
    );
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      // 서버로부터의 에러 응답 반환
      return error.response.data as CheckPasswordResponse;
    } else {
      // 네트워크 오류 등의 경우
      return {
        success: false,
        response: null,
        error: {
          status: 500,
          message: '에러가 발생했습니다!',
        },
      } as CheckPasswordResponse;
    }
  }
};

export default checkPasswordFormat;
