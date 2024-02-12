import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:80/api',
});
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        config.headers['Access-Control-Allow-Headers'] =
            'Origin, Content-Type, X-Auth-Token';
        config.headers['Access-Control-Allow-Origin'] = '*';
        config.headers['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE,PATCH';
        config.headers['Content-Type'] = 'multipart/form-data/x-www-form-urlencoded/application/json';
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;
