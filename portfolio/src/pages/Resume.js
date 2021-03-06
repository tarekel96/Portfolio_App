import React from 'react';
import Loading from '../pages/Loading.js';
import { asyncFetchData } from '../utils/fetchData.js';
import { convertToArray } from '../utils/appUtils';
//import PropTypes from 'prop-types';
import styles from './Resume.module.css';

const Resume = () => {
	const [ skillsData, setSkills ] = React.useState(null);
	const [ loading, setLoading ] = React.useState(true);
	const getThirdArrLength = (arr) => {
		return Math.round(arr.length / 3);
	};
	React.useEffect(() => {
		try {
			return new Promise((resolve, reject) => {
				resolve(asyncFetchData('assets/data/resume.json', setSkills));
			});
			// eslint-disable-next-line
		} catch (error) {
			return console.log(new Error(error));
		}
	}, []);

	while (loading) {
		console.log(skillsData);
		if (skillsData !== null) {
			setLoading(() => false);
		}
		return <Loading />;
	}
	return (
		<div className={`${styles['resumeSections']} offWhiteBackground blackColor`}>
			<div className={`${styles['skillsAndEducation']}`}>
				<section className={styles['technicalSkills']}>
					<header>Technical Skills</header>
					<hr style={{ width: '100%' }} />
					<div>
						{/* Slice (1st third of arr) -> Map */}
						<ul>
							{convertToArray(skillsData.skills)
								.slice(0, getThirdArrLength(convertToArray(skillsData.skills)))
								.map((skill, index) => <li key={`Skill ID#: ${index}`}>{skill}</li>)}
						</ul>
						{/* Slice (2nd third of arr) -> Map */}
						<ul>
							{convertToArray(skillsData.skills)
								.slice(
									getThirdArrLength(convertToArray(skillsData.skills)),
									2 * getThirdArrLength(convertToArray(skillsData.skills))
								)
								.map((skill, index) => <li key={`Skill ID#: ${index}`}>{skill}</li>)}
						</ul>
						{/* Slice (last third of arr) -> Map */}
						<ul>
							{convertToArray(skillsData.skills)
								.slice(
									2 * getThirdArrLength(convertToArray(skillsData.skills)),
									convertToArray(skillsData.skills).length
								)
								.map((skill, index) => <li key={`Skill ID#: ${index}`}>{skill}</li>)}
						</ul>
					</div>
					<article>"*" indicates certification for skill</article>
					<hr />
				</section>
				<section className={styles['education']}>
					<header>Education</header>
					<hr style={{ width: '100%' }} />
					{skillsData.educations.map(({ name, id, duration, major, degreeType, gpa, specialAwards }) => (
						<Education
							key={id}
							name={name}
							duration={duration}
							major={major}
							degreeType={degreeType}
							gpa={gpa}
							specialAwards={specialAwards}
						/>
					))}
					<hr />
				</section>
			</div>
			<section className={styles['experiences']}>
				<header>Experiences</header>
				<hr />
				{skillsData.experiences.map(({ companyName, id, location, duration, position, roles }) => (
					<Experience
						key={id}
						companyName={companyName}
						location={location}
						position={position}
						duration={duration}
						roles={roles}
					/>
				))}
				<hr />
			</section>
		</div>
	);
};

const Education = ({ name, duration, major, degreeType, gpa, specialAwards }) => {
	return (
		<div>
			<article>{name}</article>
			<ul>
				<li>
					<span className="bold">Time Attended:</span> {duration}
				</li>
				<li>
					<span className="bold">Major:</span> {major} - {degreeType}
				</li>
				<li
					style={{
						display: gpa !== 'n/a' ? 'block' : 'none',
						listStyleType: gpa !== 'n/a' ? 'circle' : 'none'
					}}
				>
					<span className="bold">GPA:</span> {gpa}
				</li>
				<li
					style={{
						display: specialAwards.length !== 0 ? 'block' : 'none',
						listStyleType: specialAwards.length !== 0 ? 'circle' : 'none'
					}}
				>
					<span className="bold">Awards:</span>{' '}
					{specialAwards.map((award, index) => (
						<span key={`Award ${index}`}>
							{award}
							{index !== specialAwards.length - 1 && ', '}{' '}
						</span>
					))}
				</li>
			</ul>
		</div>
	);
};
Education.propTypes = {};
const Experience = ({ companyName, location, duration, position, roles }) => {
	return (
		<div>
			<article>
				{companyName} - {location}
			</article>
			<ul>
				<li>
					<span className="bold">Duration:</span> {duration}
				</li>
				<li>
					<span className="bold">Position:</span> {position}
				</li>
				<li>
					<article className="bold">Roles: </article>
				</li>
				{roles.map((role, index) => (
					<li key={`Role ${index}`} style={{ marginLeft: '2.5%', listStyleType: 'square' }}>
						{role}
						{index !== roles.length - 1 && ', '}{' '}
					</li>
				))}
			</ul>
		</div>
	);
};
Experience.propTypes = {};
export default Resume;
