import api from './axiosConfig';
import type { CvDto, CreateCvDto } from '../types/cv';

export const getCvs = async (): Promise<CvDto[]> => {
  const response = await api.get<CvDto[]>('/cv');
  return response.data;
};

export const getCvById = async (id: number): Promise<CvDto> => {
  const response = await api.get<CvDto>(`/cv/${id}`);
  return response.data;
};

export const createCv = async (cv: CreateCvDto): Promise<CvDto> => {
  const response = await api.post<CvDto>('/cv', cv);
  return response.data;
};

export const deleteCv = async (id: number): Promise<void> => {
  await api.delete(`/cv/${id}`);
};