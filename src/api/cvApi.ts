import api from './axiosConfig';
import type { CvDto, CreateCvDto } from '../types/cv';

// Get all CVs

export const getCvs = async (): Promise<CvDto[]> => {
  const response = await api.get<CvDto[]>('/cv');
  return response.data;
};

// Get a CV by ID
export const getCvById = async (id: number): Promise<CvDto> => {
  const response = await api.get<CvDto>(`/cv/${id}`);
  return response.data;
};

// Create a new CV

export const createCv = async (cv: CreateCvDto): Promise<CvDto> => {
  const response = await api.post<CvDto>('/cv', cv);
  return response.data;
};

// Delete a CV by ID
export const deleteCv = async (id: number): Promise<void> => {
  await api.delete(`/cv/${id}`);
};

// Update an existing CV

export const updateCv = async (id: number, cv: CreateCvDto): Promise<void> => {
  await api.put(`/cv/${id}`, cv);
};

export const uploadCvPhoto = async (id: number, file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post<{ photoUrl: string }>(`/cv/${id}/photo`, formData);

  return response.data.photoUrl;
};

// Download CV as PDF
export const downloadCvPdf = async (id: number, template: string): Promise<void> => {
  const response = await api.get(`/cv/${id}/pdf`, {
    params: { template },
    responseType: 'blob',
  });

  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `cv-${id}.pdf`);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};