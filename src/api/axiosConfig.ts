import axios from 'axios';

// const api = axios.create({
//   baseURL: 'http://localhost:5201/api',
// });

const api = axios.create({
  baseURL: 'https://cvgenerator.somee.com/api',
});

// const api = axios.create({
//   baseURL: '/api',
// });

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;

    // On ne retente que si ce n'est pas déjà un réessai, et si c'est une erreur réseau
    // (pas de réponse du serveur du tout, typique d'un ERR_HTTP2_PROTOCOL_ERROR ou timeout)
    if (config && !config._retry && !error.response) {
      config._retry = true;
      await new Promise((resolve) => setTimeout(resolve, 800));
      return api(config);
    }

    return Promise.reject(error);
  }
);

export default api;