import React from 'react';
import { Section } from '../components/Section.js';

const Resume = ({ slideUp, slideDown, upArrowRef, downArrowRef }) => {
	return (
		<Section
			upAndDownArrows={true}
			slideUp={slideUp}
			slideDown={slideDown}
			upArrowRef={upArrowRef}
			downArrowRef={downArrowRef}
		>
			<h1>RESUME</h1>
		</Section>
	);
};

export default Resume;
