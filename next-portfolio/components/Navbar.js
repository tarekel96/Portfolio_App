import { useTheme, styled } from '@mui/material/styles';
import { useSettingsContext } from '../context/SettingsContext';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import TerminalIcon from '@mui/icons-material/Terminal';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const Wrapper = styled('nav')(({ theme }) => ({
	display: 'flex',
	width: '100%',
	height: '10%',
	alignItems: 'center',
	justifyContent: 'flex-end',
	backgroundColor: theme.palette.background.default,
	color: theme.palette.text.primary,
	borderRadius: '4px',
	border: `5px solid ${theme.palette.text.secondary}`,
	paddingRight: '2%'
}));

const Terminal = styled(TerminalIcon)(({ theme }) => ({
	position: 'absolute',
	left: '1%',
	top: '1%',
	fontSize: '3rem',
	cursor: 'pointer',
	'&:hover': {
		color: theme.palette.text.secondary
	}
}));

const SubNavWrapper = styled('div')(({ theme }) => ({
	flex: '2',
	display: 'flex',
	justifyContent: 'space-evenly'
}));

const NavItem = styled('h1')(({ theme }) => ({
	fontSize: '32px',
	cursor: 'pointer',
	'&:hover': {
		color: theme.palette.text.secondary
	}
}));

export const Navbar = () => {
	const theme = useTheme();
	// @ts-ignore
	const { darkMode, toggleDarkMode } = useSettingsContext();
	return (
		<Wrapper>
			<Tooltip title="Send Message" placement="right" arrow={true}>
				<Terminal />
			</Tooltip>
			<SubNavWrapper>
				<NavItem>About</NavItem>
				<NavItem>Resume</NavItem>
				<NavItem>Portfolio</NavItem>
			</SubNavWrapper>
			{theme.palette.mode} mode
			<IconButton sx={{ ml: 1 }} onClick={toggleDarkMode} color="inherit">
				{theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
			</IconButton>
		</Wrapper>
	);
};
