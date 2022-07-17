import { useContext, createContext, useState, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { getDesignTokens } from '../styles/theme';

const SettingsContext = createContext({ toggleColorMode: () => {} });
export const useSettingsContext = () => useContext(SettingsContext);
export const SettingsProvider = ({ children }) => {
	const [ darkMode, setDarkMode ] = useState(false);
	const mode = darkMode ? 'dark' : 'light';
	const theme = useMemo(() => createTheme(getDesignTokens(mode)), [ mode ]);
	//const toggleDarkMode = () => setDarkMode((prev) => !prev);
	const toggleDarkMode = () => {
		console.log('clicked toggleDarkMode');
		setDarkMode((prev) => !prev);
	};

	const colorMode = useMemo(
		() => ({
			darkMode,
			toggleDarkMode
		}),
		[ darkMode, toggleDarkMode ]
	);

	return (
		<SettingsContext.Provider
			// @ts-ignore
			value={colorMode}
		>
			<ThemeProvider theme={theme}>{children}</ThemeProvider>
		</SettingsContext.Provider>
	);
};
