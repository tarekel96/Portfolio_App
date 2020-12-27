import React from 'react';
import { Section } from '../components/Section.js';

const Resume = ({ slideUp, slideDown }) => {
	return (
		<Section upAndDownArrows={true} slideUp={slideUp} slideDown={slideDown}>
			<h1>RESUME</h1>
		</Section>
	);
};

export default Resume;
