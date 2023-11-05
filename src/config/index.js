const MODE = import.meta.env.MODE; // 环境变量
const API_URL = import.meta.env.VITE_API_URL;

export const baseUrl = MODE == 'development' ? '/api' : API_URL;
