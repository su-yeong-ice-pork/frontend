import {getItem} from './asyncStorage';
import apiClient from './axiosInstance';

export interface StudyTimeResponse {
  success: boolean;
  response: {
    todayStudyTime: string;
    totalStudyTime?: string;
  };
  error: any;
}
export interface AttendanceResponse {
  success: boolean;
  response: {
    attendance: boolean;
  };
  error: any;
}

// 공부 시간 조회
export const getStudyTime = async (): Promise<StudyTimeResponse> => {
  const token = await getItem('authToken');
  try {
    if (!token) {
      console.error('토큰이 없습니다. 로그인이 필요합니다.');
      throw Error;
    }
    const response = await apiClient.get<StudyTimeResponse>(
      '/grass/study-time',
      {
        headers: {
          Authorization: token,
        },
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateStudyTime = async (
  todayStudyTime: string,
): Promise<StudyTimeResponse> => {
  const token = await getItem('authToken');
  try {
    if (!token) {
      console.error('토큰이 없습니다. 로그인이 필요합니다.');
      throw new Error('토큰이 없습니다.');
    }
    console.log(token, todayStudyTime);
    const response = await apiClient.patch<StudyTimeResponse>(
      '/grass/study-time',
      {todayStudyTime},
      {
        headers: {
          Authorization: `${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getTodayAttendance = async (): Promise<AttendanceResponse> => {
  const token = await getItem('authToken');
  try {
    if (!token) {
      console.error('토큰이 없습니다. 로그인이 필요합니다.');
      throw new Error('토큰이 없습니다.');
    }
    const response = await apiClient.get<AttendanceResponse>(
      '/grass/attendance/today',
      {
        headers: {
          Authorization: `${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
