import { Box, CircularProgress } from '@mui/material';
import { string } from 'prop-types';

const Loading = (props) => {
    const { fullHeight } = props;
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: fullHeight ? '100vh' : '100%',
                width: '100%',
            }}
        >
            <CircularProgress />
        </Box>
    );
};

Loading.propTypes = {
    fullHeight: string,
};

export default Loading;
