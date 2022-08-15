import { Fragment } from 'react';
// @ts-ignore
import { styled } from '@mui/material/styles';
// import context
import { SettingsProvider } from '../context/SettingsContext';
import { createGlobalStyle } from 'styled-components';
// @ts-ignore
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

const GlobalStyle = createGlobalStyle`
html,
body,
#__next {
	height: 100%;
	padding: 0;
	margin: 0;
	font-family: 'Roboto';
}

html {
	position: relative;
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
	minHeight: '100%',
	paddingBottom: '2.5%'
}));

const MyApp = ({ Component, pageProps }) => {
	return (
		<Fragment>
			<SettingsProvider>
				<GlobalStyle />
				<Wrapper>
					<Navbar />
					<Component {...pageProps} />
					<Footer />
				</Wrapper>
			</SettingsProvider>
		</Fragment>
	);
};

export default MyApp;
