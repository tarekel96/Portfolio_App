import React, { Fragment, useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading.js';
import { Slide, Fade } from 'react-awesome-reveal';
import { Card } from '../components/Card.js';
import styles from './Portfolio.module.css';

const Portfolio = ({
	projectIndex,
	projectData,
	lastWebDevCommand,
	lastSWECommand,
	TYPES,
	projectType,
	setProjectType,
	SWEData,
	setSWEData,
	SWECardIndex,
	setSWECardIndex,
	DS_ML_Data,
	set_DS_ML_Data,
	DS_ML_CardIndex,
	set_DS_ML_CardIndex,
	last_DS_ML_Command
}) => {
	const heroBottomRef = useRef(null);
	// scroll user to card vertical alignment
	useEffect(() => {
		if (heroBottomRef !== null) {
			if (heroBottomRef.current !== null) {
				heroBottomRef.current.scrollIntoView({ behavior: 'smooth' });
			}
		}
	});

	const [ loading, setLoading ] = useState(true);
	const { WEB_DEV, GEN_SWE, DS_ML } = TYPES;
	let technologiesArray;
	useEffect(
		() => {
			let isMounted = true;
			if (isMounted === true) {
				try {
					// closure - invokes function right after defining it
					(async function() {
						const res = await fetch('assets/data/swe_projects.json');
						const data = await res.json();
						setSWEData(() => data.cplusplus);
					})();
					// eslint-disable-next-line
				} catch (error) {
					//
					console.log(new Error(error));
				}

				try {
					// closure - invokes function right after defining it
					(async function() {
						const res = await fetch('assets/data/ds_ml_projects.json');
						const data = await res.json();
						set_DS_ML_Data(() => data.datascience);
					})();
					// eslint-disable-next-line
				} catch (error) {
					//
					console.log(new Error(error));
				}
			}
			return () => (isMounted = false);
		},
		[ setSWEData, set_DS_ML_Data ]
	);

	useEffect(
		() => {
			console.log(SWEData);
			return () => {};
		},
		[ SWEData ]
	);

	// wait for projectData to be fetched before render
	while (loading) {
		if (projectData !== undefined && SWEData !== undefined) {
			if (projectData[projectIndex] !== undefined && SWEData[SWECardIndex] !== undefined) {
				setLoading(() => false);
			}
		}
		return <Loading />;
	}

	// converts the tags string into an array of tags
	if (projectData[projectIndex].technologiesUsed !== '') {
		technologiesArray = projectData[projectIndex].technologiesUsed.split(',');
	}
	let currentHero;
	switch (projectType) {
		case WEB_DEV:
			currentHero = (
				<WebDevHero
					projectData={projectData}
					projectIndex={projectIndex}
					technologiesArray={technologiesArray}
					lastWebDevCommand={lastWebDevCommand}
				/>
			);
			break;
		case GEN_SWE:
			currentHero = (
				<GenSWE
					SWEData={SWEData}
					SWECardIndex={SWECardIndex}
					setSWECardIndex={setSWECardIndex}
					lastSWECommand={lastSWECommand}
				/>
			);
			break;
		case DS_ML:
			currentHero = (
				<DsMlHero
					DS_ML_Data={DS_ML_Data}
					DS_ML_CardIndex={DS_ML_CardIndex}
					set_DS_ML_CardIndex={set_DS_ML_CardIndex}
					last_DS_ML_Command={last_DS_ML_Command}
				/>
			);
			break;
		default:
			currentHero = (
				<WebDevHero
					projectData={projectData}
					projectIndex={projectIndex}
					technologiesArray={technologiesArray}
					lastWebDevCommand={lastWebDevCommand}
				/>
			);
			break;
	}
	return (
		<section className={`${styles['profileSectionContainer']}`}>
			<Options projectType={projectType} setProjectType={setProjectType} TYPES={TYPES} />
			{currentHero}
			<div ref={heroBottomRef} />
		</section>
	);
};

const Options = ({ projectType, setProjectType, TYPES }) => {
	const { WEB_DEV, GEN_SWE, DS_ML } = TYPES;
	return (
		<header className={`${styles['optionsContainer']}`}>
			{/* <p>*Keep Scrolling Down to See Cards</p> */}
			<button
				onClick={() => setProjectType(() => WEB_DEV)}
				className={`${projectType === WEB_DEV ? 'offWhiteBackground' : 'blackEbonyBackground'}`}
			>
				Web Development
			</button>
			<button
				onClick={() => setProjectType(() => GEN_SWE)}
				className={`${projectType === GEN_SWE ? 'offWhiteBackground' : 'blackEbonyBackground'}`}
			>
				Software Engineering (General)
			</button>
			<button
				onClick={() => setProjectType(() => DS_ML)}
				className={`${projectType === DS_ML ? 'offWhiteBackground' : 'blackEbonyBackground'}`}
			>
				Data Science & Machine Learning
			</button>
		</header>
	);
};

const WebDevHero = ({ projectData, projectIndex, technologiesArray, lastWebDevCommand }) => {
	const { name, objective, githubUrl, id, imageSrc, url } = projectData[projectIndex];
	return (
		<Fragment>
			{lastWebDevCommand === '' ? (
				<Fade duration={1250}>
					<Card
						key={id}
						id={projectIndex}
						webDev={true}
						title={name}
						imageSrc={'assets/images/' + imageSrc}
						imageAlt={'project ' + String(projectIndex)}
						content={objective}
						url_1={url}
						url_2={githubUrl}
						tags={technologiesArray}
					/>
				</Fade>
			) : null}
			{lastWebDevCommand !== '' ? (
				<Slide direction={lastWebDevCommand === 'previous' ? 'right' : 'left'} duration={1250}>
					<Card
						key={id}
						id={projectIndex}
						webDev={true}
						title={name}
						imageSrc={'assets/images/' + imageSrc}
						imageAlt={'project ' + String(projectIndex)}
						content={objective}
						url_1={url}
						url_2={githubUrl}
						tags={technologiesArray}
					/>
				</Slide>
			) : null}
		</Fragment>
	);
};

const GenSWE = ({ SWEData, SWECardIndex, lastSWECommand }) => {
	let technologiesArray;
	const { name, githubUrl, objective, technologiesUsed, id } = SWEData[SWECardIndex];
	// converts the tags string into an array of tags
	if (technologiesUsed !== '') {
		technologiesArray = technologiesUsed.split(',');
	}
	return (
		<Fragment>
			{lastSWECommand === '' ? (
				<Fade duration={1250}>
					<Card
						webDev={false}
						title={name}
						content={objective}
						url_2={githubUrl}
						tags={technologiesArray}
						key={id}
					/>
				</Fade>
			) : null}
			{lastSWECommand !== '' ? (
				<Slide direction={lastSWECommand === 'previous' ? 'right' : 'left'} duration={1250}>
					<Card
						webDev={false}
						title={name}
						content={objective}
						url_2={githubUrl}
						tags={technologiesArray}
						key={id}
					/>
				</Slide>
			) : null}
		</Fragment>
	);
};

const DsMlHero = ({ DS_ML_Data, DS_ML_CardIndex, last_DS_ML_Command }) => {
	let modelsAndConceptsArray;
	const { name, githubUrl, objective, modelsAndConcepts, id } = DS_ML_Data[DS_ML_CardIndex];
	// converts the tags string into an array of tags
	if (modelsAndConcepts !== '') {
		modelsAndConceptsArray = modelsAndConcepts.split(',');
	}
	return (
		<Fragment>
			{last_DS_ML_Command === '' ? (
				<Fade duration={1250}>
					<Card
						webDev={false}
						title={name}
						content={objective}
						url_2={githubUrl}
						tags={modelsAndConceptsArray}
						key={id}
					/>
				</Fade>
			) : null}
			{last_DS_ML_Command !== '' ? (
				<Slide direction={last_DS_ML_Command === 'previous' ? 'right' : 'left'} duration={1250}>
					<Card
						webDev={false}
						title={name}
						content={objective}
						url_2={githubUrl}
						tags={modelsAndConceptsArray}
						key={id}
					/>
				</Slide>
			) : null}
		</Fragment>
	);
};

Portfolio.propTypes = {
	projectData: PropTypes.array,
	index: PropTypes.number,
	lastCommand: PropTypes.string
};

export default Portfolio;
