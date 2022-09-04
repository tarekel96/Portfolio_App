import Link from 'next/link';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import { styled } from '@mui/material/styles';

const footerItems = [
	{
		title: 'LinkedIn',
		url: 'https://www.linkedin.com/in/tarek-e-0a2b1a132/',
		component: <LinkedInIcon fontSize="large" />
	},
	{
		title: 'GitHub',
		url: 'https://github.com/tarekel96',
		component: <GitHubIcon fontSize="large" />
	},
	{
		title: 'Twitter',
		url: 'https://twitter.com/hajjaoui_tarek',
		component: <TwitterIcon fontSize="large" />
	},
	{
		title: 'instagram',
		url: 'https://www.instagram.com/tarek5point0/',
		component: <InstagramIcon fontSize="large" />
	}
];

const Wrapper = styled('footer')(({ theme }) => ({
	width: '100%',
	margin: '0 auto',
	display: 'flex',
	justifyContent: 'center'
}));

const FooterItem = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.background.secondary,
	padding: theme.spacing(2),
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	textAlign: 'center',
	color: theme.palette.text.primary,
	'&:hover': {
		boxShadow: '6px 6px 6px #666',
		borderRadius: '5px',
		cursor: 'pointer'
	}
}));

export const Footer = () => {
	return (
		<Wrapper>
			<Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
				{footerItems.map(({ title, url, component }, index) => (
					<Link href={url} key={url + title}>
						<a title={title} target="_blank" rel="noreferrer">
							<FooterItem key={index}>{component}</FooterItem>
						</a>
					</Link>
				))}
			</Stack>
		</Wrapper>
	);
};
