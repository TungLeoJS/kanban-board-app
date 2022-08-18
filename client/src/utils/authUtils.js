import authApi from '../api/authClient';

const authUtils = {
    isAuthenticated: async () => {
        const token = localStorage.getItem('token');
        if (!token) return false;
        try {
            const res = await authApi.verifyToken(token);
            return res.user;
        } catch (err) {
            return false;
        }
    },
};

export default authUtils;
