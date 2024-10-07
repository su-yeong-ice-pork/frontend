// src/api/record.ts
import apiClient from './axiosInstance';
import {getItem} from './asyncStorage';

interface RecordData {
  currentStreak: number;
  maxStreak: number;
  totalStudyTime: number;
}

interface RecordApiResponse {
  success: boolean;
  response: {
    record: RecordData;
  } | null;
  error: any;
}

export const getRecord = async (id: number): Promise<RecordData | null> => {
  try {
    const token = await getItem('authToken');
    const response = await apiClient.get<RecordApiResponse>(
      `/members/${id}/record`,
      {
        headers: {
          Authorization: `${token}`,
        },
      },
    );

    if (response.data.success && response.data.response) {
      return response.data.response.record;
    } else {
      console.error('API 에러:', response.data.error);
      return null;
    }
  } catch (error) {
    console.error('네트워크 에러:', error);
    return null;
  }
};
