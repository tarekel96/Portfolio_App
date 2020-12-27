import React from 'react';
import { Layout } from '../components/Layout.js';
import { Section } from '../components/Section.js';

const Resume = ({ setPageIndex, slideUp, slideDown }) => {
	return (
		<Layout setPageIndex={setPageIndex}>
			<Section upAndDownArrows={true} slideUp={slideUp} slideDown={slideDown}>
				<h1>RESUME</h1>
			</Section>
		</Layout>
	);
};

export default Resume;
