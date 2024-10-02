import apiClient from './axiosInstance';

export interface CheckNameResponse {
  success: boolean;
  response: null;
  error: {
    status: number;
    message: string;
  } | null;
}

const checkName = async (name: string): Promise<CheckNameResponse> => {
  try {
    const response = await apiClient.get('/members/check/name', {
      params: {name},
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      // 서버로부터의 에러 응답
      return error.response.data as CheckNameResponse;
    } else {
      return {
        success: false,
        response: null,
        error: {
          status: 500,
          message: '네트워크 오류가 발생했습니다.',
        },
      } as CheckNameResponse;
    }
  }
};
export default checkName;
