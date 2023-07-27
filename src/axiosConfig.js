import axios from 'axios';

// Créez une instance d'axios pour votre configuration
const axiosInstance = axios.create({
  baseURL: 'https://gestion-candidats-back.onrender.com/api', // Remplacez cette URL par l'URL de base de votre backend
});

// Ajoutez un intercepteur pour les requêtes sortantes
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      // Ajoutez le token à l'en-tête d'autorisation pour chaque requête sortante
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  error => {
    // Gérez les erreurs d'intercepteur si nécessaire
    return Promise.reject(error);
  }
);

export default axiosInstance;
