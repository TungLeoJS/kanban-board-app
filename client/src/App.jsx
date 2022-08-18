import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import AuthLayout from './components/layout/AuthLayout';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import Board from './components/pages/Board';

export const App = () => {
    const theme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <Routes>
                    <Route
                        path='/'
                        element={<AuthLayout />}
                    >
                        <Route
                            path='login'
                            element={<Login />}
                        />
                        <Route
                            path='signup'
                            element={<Signup />}
                        />
                    </Route>
                    <Route
                        path='/'
                        element={<AppLayout />}
                    >
                        <Route
                            index
                            element={<Home />}
                        />
                        <Route
                            path='boards'
                            element={<Home />}
                        />
                        <Route
                            path='boards/:d'
                            element={<Board />}
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;
