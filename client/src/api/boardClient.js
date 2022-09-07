import axiosClient from './axiosClient';

const boardApi = {
    create: (params) => axiosClient.post('boards', params),
    getAll: (params) => axiosClient.get('boards', params),
};

export default boardApi;
