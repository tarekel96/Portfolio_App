import React from 'react';
import { Section } from '../components/Section.js';
import { Card } from '../components/Card.js';

const Portfolio = ({ projectData, index, transitions, next, previous, slideUp, slideDown }) => {
	return (
		<Section
			cardArrows={true}
			next={next}
			downArrow={true}
			previous={previous}
			slideUp={slideUp}
			slideDown={slideDown}
		>
			{transitions.map(({ props, key }) => {
				return (
					<Card
						style={props}
						key={projectData[index].id}
						id={projectData[index].id}
						title={projectData[index].name}
						imageSrc={'assets/images/' + projectData[index].imageSrc}
						imageAlt={'project ' + String(index)}
						header={projectData[index].objective}
						subheader_1={projectData[index].url}
						subheader_2={projectData[index].githubUrl}
						subheader_3={projectData[index].technologiesUsed}
					/>
				);
			})}
		</Section>
	);
};

export default Portfolio;
