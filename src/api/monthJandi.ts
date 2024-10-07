// src/api/grass.ts
import apiClient from './axiosInstance';
import {getItem} from './asyncStorage';

// Grass 데이터 타입 정의
interface GrassData {
  id: number;
  day: number;
  studyHour: number;
  grassScore: number;
}

interface GrassApiResponse {
  success: boolean;
  response: {
    year: number;
    month: number;
    grass: GrassData[];
  } | null;
  error: any;
}

export const getMonthlyGrass = async (
  id: number,
  year: number,
  month: number,
): Promise<GrassData[] | null> => {
  try {
    const token = await getItem('authToken');

    const response = await apiClient.get<GrassApiResponse>(
      `/members/${id}/grass/monthly?year=${year}&month=${month}`,
      {
        headers: {
          Authorization: `${token}`,
        },
      },
    );

    if (response.data.success && response.data.response) {
      return response.data.response.grass;
    } else {
      console.error('API 에러:', response.data.error);
      return null;
    }
  } catch (error) {
    console.error('네트워크 에러:', error);
    return null;
  }
};
