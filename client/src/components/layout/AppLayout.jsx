import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Loading from '../common/Loading';
import authUtils from '../../utils/authUtils';
import Sidebar from '../common/Sidebar';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/features/userSlice';

const AppLayout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const user = await authUtils.isAuthenticated();
            dispatch(setUser(user));

            if (!user) {
                navigate('/login');
            } else {
                setUser(user);
                setLoading(false);
            }
        };
        checkAuth();
    }, [navigate]);

    return loading ? (
        <Loading fullHeight />
    ) : (
        <Box
            sx={{
                display: 'flex',
            }}
        >
            <Sidebar />
            <Box
                sx={{
                    flexGrow: 1,
                    p: 1,
                    width: 'max-content',
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
};

export default AppLayout;
