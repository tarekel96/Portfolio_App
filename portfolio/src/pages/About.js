import React from 'react';
import { Section } from '../components/Section.js';

const About = ({ setPageIndex, slideUp, upArrowRef, downArrowRef }) => {
	return (
		<Section upArrow={true} slideUp={slideUp} upArrowRef={upArrowRef} downArrowRef={downArrowRef}>
			<h1>About</h1>
		</Section>
	);
};

export default About;
