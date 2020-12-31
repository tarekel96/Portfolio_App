import React from 'react';
import PropTypes from 'prop-types';
import { Section } from '../components/Section.js';
import styles from './Resume.module.css';

const Resume = ({ slideUp, slideDown, upArrowRef, downArrowRef }) => {
	React.useEffect(
		() => {
			let isMounted = true;
			if (isMounted === false) return;
			const upHandler = setInterval(upArrowRef.current.addEventListener('click', slideUp), 500);
			const downHandler = setInterval(downArrowRef.current.addEventListener('click', slideDown), 500);
			return () => {
				clearInterval(upHandler);
				clearInterval(downHandler);
				isMounted = false;
			};
		},
		[ slideUp, slideDown, upArrowRef, downArrowRef ]
	);
	return (
		<Section
			upAndDownArrows={true}
			slideUp={slideUp}
			slideDown={slideDown}
			upArrowRef={upArrowRef}
			downArrowRef={downArrowRef}
		>
			<div className={styles['resumeSections']}>
				<section className={styles['technicalSkills']}>Technical Skills</section>
				<section className={styles['education']}>Education</section>
				<section className={styles['experiences']}>Experiences</section>
			</div>
		</Section>
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
