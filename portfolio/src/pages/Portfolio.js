import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading.js';
import { Slide } from 'react-awesome-reveal';
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
	setSWECardIndex
}) => {
	const [ loading, setLoading ] = React.useState(true);
	const { WEB_DEV, GEN_SWE } = TYPES;
	let technologiesArray;
	React.useEffect(
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
			}
			return () => (isMounted = false);
		},
		[ setSWEData ]
	);

	React.useEffect(
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
		<section>
			<Options projectType={projectType} setProjectType={setProjectType} TYPES={TYPES} />
			{currentHero}
		</section>
	);
};

const Options = ({ projectType, setProjectType, TYPES }) => {
	const { WEB_DEV, GEN_SWE } = TYPES;
	return (
		<header className={`${styles['optionsContainer']}`}>
			<p>*Keep Scrolling Down to See Cards</p>
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
		</header>
	);
};

const WebDevHero = ({ projectData, projectIndex, technologiesArray, lastWebDevCommand }) => {
	const { name, objective, githubUrl, id, imageSrc, url } = projectData[projectIndex];
	return (
		<React.Fragment>
			{lastWebDevCommand === '' ? (
				<Slide direction={'up'} duration={1250}>
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
		</React.Fragment>
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
		<React.Fragment>
			{lastSWECommand === '' ? (
				<Slide direction={'up'} duration={1250}>
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
		</React.Fragment>
	);
};

Portfolio.propTypes = {
	projectData: PropTypes.array,
	index: PropTypes.number,
	lastCommand: PropTypes.string
};

export default Portfolio;
