import axios from 'axios'
const defaultOptions = {
    baseURL: "https://logistics-card.herokuapp.com/api",
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Create instance
  let axiosService = axios.create(defaultOptions);

  // Set the AUTH token for any request
  axiosService.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
  });

  export default axiosService;