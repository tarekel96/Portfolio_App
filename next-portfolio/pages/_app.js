import { SettingsProvider } from '../context/SettingsContext';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
html,
body,
#__next {
	height: 100%;
	padding: 0;
	margin: 0;
	font-family: 'Roboto';
}

a {
	color: inherit;
	text-decoration: none;
}
* {
	box-sizing: border-box;
}
`;

const MyApp = ({ Component, pageProps }) => {
	return (
		<SettingsProvider>
			<GlobalStyle />
			<Component {...pageProps} />
		</SettingsProvider>
	);
};

export default MyApp;
