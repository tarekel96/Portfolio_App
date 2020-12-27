import React from 'react';
import { Section } from '../components/Section.js';

const About = ({ setPageIndex, slideUp }) => {
	return (
		<Section upArrow={true} slideUp={slideUp}>
			<h1>About</h1>
		</Section>
	);
};

export default About;
