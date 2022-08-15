// ui components
import { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { styled } from '@mui/material/styles';
import aboutData from '../lib/about.json';
const Loading = () => <h1>Loading</h1>;

const fetchAboutData = async () => await (await fetch('../lib/about.json')).json();

const Wrapper = styled('section')(({ theme }) => ({
	backgroundColor: theme.palette.background.default,
	color: theme.palette.text.secondary,
	height: '100%',
	width: '100%',
	paddingTop: '2rem'
}));

const MissionSection = styled('section')(({ theme }) => ({
	width: '80%',
	margin: '0 auto'
}));

const Header = styled('header')(({ theme }) => ({
	textAlign: 'center',
	fontSize: '1.4rem',
	fontWeight: 700
}));

const Entry = styled('p')(({ theme }) => ({
	textAlign: 'center !important'
}));

const ImageSection = styled('section')(({ theme }) => ({
	margin: '0 auto',
	display: 'flex',
	justifyContent: 'center'
}));

const Divider = styled('hr')(({ theme }) => ({
	backgroundColor: theme.palette.text.secondary,
	borderRadius: '8px',
	height: '4px'
}));

const About = () => {
	return (
		<Wrapper>
			<MissionSection>
				<MissionStatement entries={aboutData.missionStatements.statments} />

				<ProfileImage imgSrc={'assets/images/tarekProfilePic.jpg'} imgAlt={'Tarek'} />
				<Bio entries={aboutData.bio.msg} />
			</MissionSection>
		</Wrapper>
	);
};

const MissionStatement = ({ entries }) => {
	return (
		<section>
			<div>
				<Header>What I Strive To Do</Header>
				<Divider />
				{entries.map((entry) => <Entry>{entry}</Entry>)}
			</div>
		</section>
	);
};

const ProfileImage = ({ imgSrc, imgAlt }) => {
	return (
		<ImageSection>
			<div>
				<LazyLoadImage
					alt={imgAlt}
					height={288}
					src={imgSrc}
					width={288}
					style={{
						boxShadow: '12px 12px 12px #666',
						borderRadius: '5px'
					}}
				/>
			</div>
		</ImageSection>
	);
};
const Bio = ({ entries }) => {
	return (
		<section>
			<div>
				<Header>Bio</Header>
				<Divider />
				{entries.map((entry) => <p>{entry}</p>)}
				<Divider />
			</div>
		</section>
	);
};

export default About;
