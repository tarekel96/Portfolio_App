import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading.js';
import { Slide } from 'react-awesome-reveal';
import { Card } from '../components/Card.js';
import styles from './Portfolio.module.css';

const Portfolio = ({ projectIndex, projectData, lastCommand }) => {
	const [ loading, setLoading ] = React.useState(true);
	const TYPES = { WEB_DEV: 'webDevelopment', GEN_SWE: 'generalSoftwareEngineneering' };
	const { WEB_DEV, GEN_SWE } = TYPES;
	const [ projectType, setProjectType ] = React.useState(WEB_DEV);
	let technologiesArray;
	const [ SWEData, setSWEData ] = React.useState([]);
	const [ SWECardIndex, setSWECardIndex ] = React.useState(0);
	React.useEffect(() => {
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
	}, []);

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
					lastCommand={lastCommand}
				/>
			);
			break;
		case GEN_SWE:
			currentHero = <GenSWE SWEData={SWEData} SWECardIndex={SWECardIndex} setSWECardIndex={setSWECardIndex} />;
			break;
		default:
			currentHero = (
				<WebDevHero
					projectData={projectData}
					projectIndex={projectIndex}
					technologiesArray={technologiesArray}
					lastCommand={lastCommand}
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

const WebDevHero = ({ projectData, projectIndex, technologiesArray, lastCommand }) => {
	return (
		<React.Fragment>
			<Slide direction={lastCommand === 'previous' ? 'right' : 'left'} duration={1250}>
				<Card
					key={projectData[projectIndex].id}
					id={projectIndex}
					title={projectData[projectIndex].name}
					imageSrc={'assets/images/' + projectData[projectIndex].imageSrc}
					imageAlt={'project ' + String(projectIndex)}
					content={projectData[projectIndex].objective}
					url_1={projectData[projectIndex].url}
					url_2={projectData[projectIndex].githubUrl}
					tags={technologiesArray}
				/>
			</Slide>
		</React.Fragment>
	);
};

const GenSWE = ({ SWEData, SWECardIndex }) => {
	let technologiesArray;
	const { name, githubUrl, objective, technologiesUsed } = SWEData[SWECardIndex];
	// converts the tags string into an array of tags
	if (technologiesUsed !== '') {
		technologiesArray = technologiesUsed.split(',');
	}
	return (
		<React.Fragment>
			<Card webDev={false} title={name} content={objective} url_1={githubUrl} tags={technologiesArray} />
		</React.Fragment>
	);
};

Portfolio.propTypes = {
	projectData: PropTypes.array,
	index: PropTypes.number,
	lastCommand: PropTypes.string
};

export default Portfolio;
