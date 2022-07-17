import { Fragment } from 'react';
// import libraries
import { useMemo } from 'react';
// @ts-ignore
import { useTheme, styled, ThemeProvider, createTheme } from '@mui/material/styles';
// import context
import { SettingsProvider, useSettingsContext } from '../context/SettingsContext';
import { createGlobalStyle } from 'styled-components';
// important utility functions
import { getDesignTokens } from '../styles/theme';
// import components
// @ts-ignore
import { Navbar } from '../components/Navbar';

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
const Wrapper = styled('main')(({ theme }) => ({
	backgroundColor: theme.palette.background.default,
	color: theme.palette.text.primary,
	height: '100%',
	width: '100%'
}));

const MyApp = ({ Component, pageProps }) => {
	return (
		<Fragment>
			<GlobalStyle />
			<SettingsProvider>
				<Wrapper>
					<Navbar />
					<Component {...pageProps} />
				</Wrapper>
			</SettingsProvider>
		</Fragment>
	);
};

export default MyApp;
