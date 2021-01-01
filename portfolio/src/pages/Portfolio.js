import React from 'react';
import { Slide } from 'react-awesome-reveal';
import PropTypes from 'prop-types';
import { Card } from '../components/Card.js';

const Portfolio = ({ lastCommand, projectData, index }) => {
	let technologiesArray;
	// converts the tags string into an array of tags
	if (projectData[index].technologiesUsed !== '') {
		technologiesArray = projectData[index].technologiesUsed.split(',');
	}

	return (
		<Slide direction={lastCommand === 'previous' ? 'right' : 'left'} duration={1250}>
			<Card
				key={projectData[index].id}
				id={index}
				title={projectData[index].name}
				imageSrc={'assets/images/' + projectData[index].imageSrc}
				imageAlt={'project ' + String(index)}
				content={projectData[index].objective}
				url_1={projectData[index].url}
				url_2={projectData[index].githubUrl}
				tags={technologiesArray}
			/>
		</Slide>
	);
};

Portfolio.propTypes = {
	projectData: PropTypes.array,
	index: PropTypes.number,
	lastCommand: PropTypes.string
};

export default Portfolio;
