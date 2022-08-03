import React, { useState } from 'react';
import { Box, TextField } from '@mui/material';

const Login = () => {
	const [isLoading, setIsLoading] = useState(false);
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
				disabled={isLoading}
				margin='normal'
				label='Username'
				id='username'
				fullWidth
			/>
		</Box>
	);
};

export default Login;
