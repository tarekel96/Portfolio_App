import { useSettingsContext } from '../context/SettingsContext';
// @ts-ignore
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
// @ts-ignore
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const Wrapper = styled(Box)(({ theme }) => ({
	display: 'flex',
	width: '100%',
	height: '100%',
	alignItems: 'center',
	justifyContent: 'center',
	backgroundColor: theme.palette.background.default,
	color: theme.palette.text.primary,
	borderRadius: 1,
	padding: 3
}));

const Home = () => {
	const theme = useTheme();
	// @ts-ignore
	const { darkMode, toggleDarkMode } = useSettingsContext();
	return (
		<Wrapper>
			{theme.palette.mode} mode
			<IconButton sx={{ ml: 1 }} onClick={toggleDarkMode} color="inherit">
				{theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
			</IconButton>
		</Wrapper>
	);
};
export default Home;
