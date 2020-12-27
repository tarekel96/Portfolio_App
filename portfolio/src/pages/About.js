import React from 'react';
import { Layout } from '../components/Layout.js';
import { Section } from '../components/Section.js';

const About = ({ setPageIndex, slideUp }) => {
	return (
		<Layout setPageIndex={setPageIndex}>
			<Section upArrow={true} slideUp={slideUp}>
				<h1>About</h1>
			</Section>
		</Layout>
	);
};

export default About;
