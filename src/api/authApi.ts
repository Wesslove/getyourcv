import api from './axiosConfig';

interface LoginDto {
  email: string;
  motDePasse: string;
}

interface RegisterDto {
  nom: string;
  email: string;
  motDePasse: string;
}

interface LoginResponse {
  token: string;
}

export const login = async (dto: LoginDto): Promise<string> => {
  const response = await api.post<LoginResponse>('/auth/login', dto);
  return response.data.token;
};

export const register = async (dto: RegisterDto): Promise<void> => {
  await api.post('/auth/register', dto);
};