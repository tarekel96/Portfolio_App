import { useSettingsContext } from '../context/SettingsContext';
// @ts-ignore
import { useTheme } from '@mui/material/styles';
import Link from 'next/link';
import Button from '@mui/material/Button';

const Home = () => {
	const theme = useTheme();
	// @ts-ignore
	const { darkMode, toggleDarkMode } = useSettingsContext();
	console.log(darkMode, toggleDarkMode);
	return (
		<main>
			<h1>Home</h1>
			<Button variant="contained">
				<Link href="/demo">
					<a>Demo light/dark mode</a>
				</Link>
			</Button>
		</main>
	);
};
export default Home;
