import axios from 'axios';
import queryString from 'query-string';

const baseURL = 'http://127.0.0.1:5000/api/v1';
const getToken = () => localStorage.getItem('token');
const token = getToken();

const axiosClient = axios.create({
    baseURL,
    paramsSerializer: (params) => queryString.stringify({ params }),
});

axiosClient.interceptors.request.use(async (config) => {
    return {
        ...config,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    };
});

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) return response.data;
        return response;
    },
    (err) => {
        if (!err.response) {
            return alert(err);
        }
        throw err.response;
    }
);

export default axiosClient;
