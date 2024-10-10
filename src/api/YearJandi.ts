import apiClient from './axiosInstance';
import {getItem} from './asyncStorage';

export interface GrassData {
  id: number;
  month: number;
  day: number;
  studyHour: number;
}

interface GrassApiResponse {
  success: boolean;
  response: {
    year: number;
    grass: GrassData[];
  } | null;
  error: any;
}

export const getYearlyGrass = async (
  id: number,
  year: number,
): Promise<GrassData[] | null> => {
  try {
    const token = await getItem('authToken');

    const response = await apiClient.get<GrassApiResponse>(
      `/members/${id}/grass/yearly?year=${year}`,
      {
        headers: {
          Authorization: `${token}`,
        },
      },
    );

    if (response.data.success && response.data.response) {
      console.log('아아', response.data.response);
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
