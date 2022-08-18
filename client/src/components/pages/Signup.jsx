import React from 'react';
import { Button, TextField, Box } from '@mui/material';

const Signup = () => {
    const handleSubmit = () => {};
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
            />
            <TextField
                type='password'
                id='password'
                margin='normal'
                label='password'
                fullWidth
                required
            />
            <TextField
                type='password'
                id='password'
                margin='normal'
                label='Confirm password'
                fullWidth
                required
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
