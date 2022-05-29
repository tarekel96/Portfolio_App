import { useContext, createContext, useState, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const SettingsContext = createContext({ toggleColorMode: () => {} });
export const useSettingsContext = () => useContext(SettingsContext);
export const SettingsProvider = ({ children }) => {
	const [ darkMode, setDarkMode ] = useState(false);
	const toggleDarkMode = () => setDarkMode((prev) => !prev);

	const colorMode = useMemo(
		() => ({
			darkMode,
			toggleDarkMode
		}),
		[ darkMode, toggleDarkMode ]
	);

	const theme = useMemo(
		() =>
			createTheme({
				palette: {
					mode: darkMode ? 'dark' : 'light'
				}
			}),
		[ darkMode ]
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
