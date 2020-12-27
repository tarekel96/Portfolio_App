import React from 'react';
import PropTypes from 'prop-types';
import { Section } from '../components/Section.js';
import { Card } from '../components/Card.js';

const Portfolio = ({ projectData, index, transitions, next, previous, slideUp, slideDown }) => {
	let technologiesArray;
	// converts the tags string into an array of tags
	if (projectData[index].technologiesUsed !== '') {
		technologiesArray = projectData[index].technologiesUsed.split(',');
	}
	return (
		<Section
			cardArrows={true}
			next={next}
			downArrow={true}
			previous={previous}
			slideUp={slideUp}
			slideDown={slideDown}
		>
			{transitions.map(({ props, key }, mapIndex) => {
				return (
					<Card
						style={props}
						key={mapIndex}
						id={projectData[index].id}
						title={projectData[index].name}
						imageSrc={'assets/images/' + projectData[index].imageSrc}
						imageAlt={'project ' + String(index)}
						content={projectData[index].objective}
						url_1={projectData[index].url}
						url_2={projectData[index].githubUrl}
						tags={technologiesArray}
					/>
				);
			})}
		</Section>
	);
};

Portfolio.propTypes = {
	projectData: PropTypes.array,
	index: PropTypes.number,
	transitions: PropTypes.array,
	next: PropTypes.func,
	previous: PropTypes.func,
	slideUp: PropTypes.func,
	slideDown: PropTypes.func,
	setPageIndex: PropTypes.func
};

export default Portfolio;
