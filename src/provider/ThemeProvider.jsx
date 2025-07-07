import { useEffect } from 'react';

const ThemeProvider = ({ children }) => {
    useEffect(() => {
        const storedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', storedTheme);
    }, []);

    return <>{children}</>;
};

export default ThemeProvider;
