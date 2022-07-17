// ui components
import { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import aboutData from '../lib/about.json';
const Loading = () => <h1>Loading</h1>;

const fetchAboutData = async () => await (await fetch('../lib/about.json')).json();
// export async function getStaticProps({ params }) {
// 	const data = await fetchAboutData();
// 	return data;
// }

const About = () => {
	// const { bio1, bio2, mission1, mission2 } = aboutData;

	return (
		<section>
			About
			<MissionStatements entries={aboutData.bio.msg} />
			{/*
			<ProfileImage imgSrc={'assets/images/tarekProfilePic.jpg'} imgAlt={'Tarek'} />
			<Bio bio1={bio1} bio2={bio2} /> */}
			{/* <Bio entries={aboutData.bio.interests} /> */}
		</section>
	);
};
const MissionStatements = ({ entries }) => {
	return (
		<section>
			<div>
				<header>What I Strive To Do</header>
				<hr />
				{entries.map((entry) => <p>{entry}</p>)}
			</div>
		</section>
	);
};
const ProfileImage = ({ imgSrc, imgAlt }) => {
	return (
		<section>
			<div>
				<LazyLoadImage alt={imgAlt} height={288} src={imgSrc} width={288} />
			</div>
		</section>
	);
};
const Bio = ({ entries }) => {
	return (
		<section>
			<div>
				<header>Bio</header>
				<hr />
				{entries.map((entry) => <p>{entry}</p>)}
				<hr />
			</div>
		</section>
	);
};

export default About;
