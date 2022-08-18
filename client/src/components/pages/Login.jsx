import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { Link } from 'react-router-dom';

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
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
            />
            <TextField
                type='password'
                id='password'
                margin='normal'
                label='password'
                fullWidth
                required
                disabled={isLoading}
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
