import { SettingsProvider } from '../context/SettingsContext';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const MyApp = ({ Component, pageProps }) => {
	return (
		<SettingsProvider>
			<Component {...pageProps} />
		</SettingsProvider>
	);
};

export default MyApp;
