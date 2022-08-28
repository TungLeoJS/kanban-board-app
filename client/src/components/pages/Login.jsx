import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Link, useNavigate } from 'react-router-dom';
import authApi from '../../api/authClient';

const Login = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [usernameErrText, setUsernameErrText] = useState('');
    const [passwordErrText, setPasswordErrText] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUsernameErrText('');
        setPasswordErrText('');

        const data = new FormData(e.target);
        const username = data.get('username').trim();
        const password = data.get('password').trim();

        let err = false;
        if (username === '') {
            err = true;
            setUsernameErrText('Please fill this field!');
        }
        if (password === '') {
            err = true;
            setPasswordErrText('Please fill this field!');
        }

        if (err) return;

        setIsLoading(true);

        try {
            const res = await authApi.login({ username, password });
            setIsLoading(false);
            localStorage.setItem('token', res.token);
            navigate('/');
        } catch (err) {
            const errors = err.data.errors;
            errors.forEach((e) => {
                if (e.param === 'username') {
                    setUsernameErrText(e.msg);
                }
                if (e.param === 'password') {
                    setPasswordErrText(e.msg);
                }
            });
        }
    };

    return (
        <Box
            component='form'
            sx={{ mt: 1 }}
            onSubmit={handleSubmit}
            noValidate
        >
            <TextField
                name='username'
                disabled={isLoading}
                margin='normal'
                label='Username'
                id='username'
                fullWidth
                required
                error={usernameErrText !== ''}
                helperText={usernameErrText}
            />
            <TextField
                type='password'
                id='password'
                name='password'
                margin='normal'
                label='password'
                fullWidth
                required
                disabled={isLoading}
                error={passwordErrText !== ''}
                helperText={passwordErrText}
            />
            <LoadingButton
                sx={{ mt: 3, mb: 2 }}
                variant='outlined'
                fullWidth
                color='success'
                type='submit'
                loading={isLoading}
            >
                Login
            </LoadingButton>
            <Button
                component={Link}
                to='/signup'
                sx={{ textTransform: 'none' }}
            >
                Don&apos;t have an account? Signup
            </Button>
        </Box>
    );
};

export default Login;
