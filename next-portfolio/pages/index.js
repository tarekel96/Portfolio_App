// import libraries
import { useMemo } from 'react';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
// import context
import { useSettingsContext } from '../context/SettingsContext';
// import components
import { Navbar } from '../components/Navbar';
// important utility functions
import { getDesignTokens } from '../styles/theme';

const Wrapper = styled('main')(({ theme }) => ({
	backgroundColor: theme.palette.background.default,
	color: theme.palette.text.primary,
	height: '100%',
	width: '100%'
}));

const Home = () => {
	//const theme = useTheme();
	// @ts-ignore
	const { darkMode, toggleDarkMode } = useSettingsContext();
	const mode = darkMode ? 'dark' : 'light';
	const theme = useMemo(() => createTheme(getDesignTokens(mode)), [ mode ]);
	return (
		<h1>Home</h1>
		// <ThemeProvider theme={theme}>
		// 	<Wrapper>
		// 		<Navbar />
		// 	</Wrapper>
		// </ThemeProvider>
	);
};
export default Home;
