import React, { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';
import authApi from '../../api/authClient';
import { Navigate } from 'react-router-dom';

const Signup = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [usernameErrText, setUsernameErrText] = useState('');
    const [passwordErrText, setPasswordErrText] = useState('');
    const [confirmPasswordErrText, setConfirmPasswordErrText] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUsernameErrText('');
        setPasswordErrText('');
        setConfirmPasswordErrText('');

        const data = new FormData(e.target);
        const username = data.get('username').trim();
        const password = data.get('password').trim();
        const confirmPassword = data.get('confirmPassword').trim();

        let err = false;
        if (username === '') {
            err = true;
            setUsernameErrText('Please fill this field!');
        }
        if (password === '') {
            err = true;
            setPasswordErrText('Please fill this field!');
        }
        if (confirmPassword === '') {
            err = true;
            setConfirmPasswordErrText('Please fill this field!');
        }
        if (password !== confirmPassword) {
            err = true;
            setConfirmPasswordErrText('Confirm password does not match.');
        }

        if (err) return;

        setIsLoading(true);

        try {
            const res = await authApi.signup({
                username,
                password,
                confirmPassword,
            });
            setIsLoading(false);
            localStorage.setItem('token', res.token);
            Navigate('/');
        } catch (err) {
            const errors = err.data.errors;
            errors.forEach((e) => {
                if (e.param === 'username') {
                    setUsernameErrText(e.msg);
                }
                if (e.param === 'password') {
                    setPasswordErrText(e.msg);
                }
                if (e.param === 'confirmPassword') {
                    setConfirmPasswordErrText(e.msg);
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
                margin='normal'
                label='Username'
                id='username'
                fullWidth
                required
                disabled={isLoading}
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
            <TextField
                type='password'
                id='confirmPassword'
                name='confirmPassword'
                margin='normal'
                label='Confirm password'
                fullWidth
                required
                disabled={isLoading}
                error={confirmPasswordErrText !== ''}
                helperText={confirmPasswordErrText}
            />
            <Button
                sx={{ mt: 3, mb: 2 }}
                variant='outlined'
                fullWidth
                color='success'
                type='submit'
            >
                Signup
            </Button>
        </Box>
    );
};

export default Signup;
