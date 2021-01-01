import React from 'react';
import Loading from '../pages/Loading.js';
import { asyncFetchData, convertToArray } from '../utils/fetchData.js';
//import PropTypes from 'prop-types';
import styles from './Resume.module.css';

const Resume = ({ slideUp, slideDown, upArrowRef, downArrowRef }) => {
	const [ skillsData, setSkills ] = React.useState(null);
	const [ loading, setLoading ] = React.useState(true);
	React.useEffect(() => {
		try {
			return new Promise((resolve, reject) => {
				resolve(asyncFetchData('assets/data/skills.json', setSkills));
			});
			// eslint-disable-next-line
		} catch (error) {
			return console.log(new Error(error));
		}
	}, []);
	React.useEffect(
		() => {
			let isMounted = true;
			console.log(loading);
			console.log(skillsData);
			if (isMounted === false) return;
			const upHandler = setInterval(upArrowRef.current.addEventListener('click', slideUp), 500);
			const downHandler = setInterval(downArrowRef.current.addEventListener('click', slideDown), 500);
			return () => {
				clearInterval(upHandler);
				clearInterval(downHandler);
				isMounted = false;
			};
		},
		[ slideUp, slideDown, upArrowRef, downArrowRef, skillsData, loading ]
	);
	while (loading) {
		if (skillsData !== null) {
			setLoading(() => false);
		}
		return <Loading />;
	}
	return (
		<div className={styles['resumeSections']}>
			<section className={styles['technicalSkills']}>
				<ul>
					{convertToArray(skillsData.skills).map((skill, index) => (
						<li key={`Skill ID#: ${index}`}>{skill}</li>
					))}
				</ul>
			</section>
			<section className={styles['education']}>Education</section>
			<section className={styles['experiences']}>Experiences</section>
		</div>
	);
};

const Education = ({ name, id, duration, major, degreeType, gpa, specialAwards }) => {
	return <div>Education</div>;
};
Education.propTypes = {};
const Experience = ({ companyName, id, duration, position, roleDescription }) => {
	return <div>Education</div>;
};
Experience.propTypes = {};
export default Resume;
