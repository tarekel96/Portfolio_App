import { useSettingsContext } from '../context/SettingsContext';
// @ts-ignore
import { useTheme } from '@mui/material/styles';
import Link from 'next/link';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
// @ts-ignore
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const Home = () => {
	const theme = useTheme();
	// @ts-ignore
	const { darkMode, toggleDarkMode } = useSettingsContext();
	console.log(darkMode, toggleDarkMode);
	return (
		<Box
			sx={{
				display: 'flex',
				width: '100%',
				height: '100%',
				alignItems: 'center',
				justifyContent: 'center',
				bgcolor: 'background.default',
				color: 'text.primary',
				borderRadius: 1,
				p: 3
			}}
		>
			{theme.palette.mode} mode
			<IconButton sx={{ ml: 1 }} onClick={toggleDarkMode} color="inherit">
				{theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
			</IconButton>
		</Box>
	);
};
export default Home;
