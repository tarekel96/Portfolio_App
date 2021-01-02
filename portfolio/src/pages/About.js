import React from 'react';
import Loading from './Loading.js';
import { asyncFetchData } from '../utils/fetchData.js';
import styles from './About.module.css';

const About = ({ setPageIndex, slideUp, upArrowRef }) => {
	const [ aboutData, setAboutData ] = React.useState({});
	const [ loading, setLoading ] = React.useState(true);
	React.useEffect(() => {
		try {
			return new Promise((resolve, reject) => {
				resolve(asyncFetchData('assets/data/about.json', setAboutData));
			});
			// eslint-disable-next-line
		} catch (error) {
			return console.log(new Error(error));
		}
	}, []);
	while (loading) {
		console.log(aboutData);
		if (aboutData !== null) {
			setLoading(() => false);
		}
		return <Loading />;
	}
	const { bio1, bio2, mission1, mission2 } = aboutData;
	return (
		<section className={styles['aboutContainer']}>
			<MissionStatements mission1={mission1} mission2={mission2} />
			<ProfileImage imgSrc={'assets/images/tarekProfilePic.jpg'} imgAlt={'Tarek'} />
			<Bio bio1={bio1} bio2={bio2} />
		</section>
	);
};
const MissionStatements = ({ mission1, mission2 }) => {
	return (
		<section>
			<div>
				<header>What I Strive To Do</header>
				<hr />
				<p>{mission1}</p>
				<p>{mission2}</p>
			</div>
		</section>
	);
};
const ProfileImage = ({ imgSrc, imgAlt }) => {
	return (
		<section className={styles['profileImageContainer']}>
			<div>
				<img src={imgSrc} alt={imgAlt} />
			</div>
		</section>
	);
};
const Bio = ({ bio1, bio2 }) => {
	return (
		<section>
			<div>
				<header>Bio</header>
				<hr />
				<p>{bio1}</p>
				<p>{bio2}</p>
				<hr />
			</div>
		</section>
	);
};

export default About;
