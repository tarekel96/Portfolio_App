// ui components
import { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Avatar from '@mui/material/Avatar';
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

const ListCenterContainer = styled('div')(({ theme }) => ({
	textAlign: 'center'
}));

const ListItemsContainer = styled('ul')(({ theme }) => ({
	display: 'inline-flex',
	flexDirection: 'column',
	textAlign: 'left'
}));

const ListItemEntry = styled('li')(({ theme }) => ({
	margin: '0',
	padding: '0'
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
				<Bio
					msgTop={aboutData.bio.msgTop}
					msgBulletPoints={aboutData.bio.msgBulletPoints}
					msgBottom={aboutData.bio.msgBottom}
				/>
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
				{entries.map((entry) => <Entry key={entry}>{entry}</Entry>)}
			</div>
		</section>
	);
};

const ProfileImage = ({ imgSrc, imgAlt }) => {
	return (
		<ImageSection>
			<div>
				<Avatar
					src={imgSrc}
					alt={imgAlt}
					sx={{
						width: '290px',
						height: '290px',
						outline: '1.5px solid black;'
					}}
				/>
			</div>
		</ImageSection>
	);
};
const Bio = ({ msgTop, msgBulletPoints, msgBottom }) => {
	return (
		<section>
			<div>
				<Header>Bio</Header>
				<Divider />
				{msgTop.map((entry) => <Entry key={entry}>{entry}</Entry>)}
				<ListCenterContainer>
					<ListItemsContainer>
						{msgBulletPoints.map((entry) => <ListItemEntry key={entry}>{entry}</ListItemEntry>)}
					</ListItemsContainer>
				</ListCenterContainer>
				{msgBottom.map((entry) => <Entry key={entry}>{entry}</Entry>)}
				<Divider />
			</div>
		</section>
	);
};

export default About;
