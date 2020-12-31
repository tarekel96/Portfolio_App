import React from 'react';
import { Section } from '../components/Section.js';

const About = ({ setPageIndex, slideUp, upArrowRef }) => {
	React.useEffect(
		() => {
			let isMounted = true;
			if (isMounted === false) return;
			const upHandler = setInterval(upArrowRef.current.addEventListener('click', slideUp), 500);
			return () => {
				clearInterval(upHandler);
				isMounted = false;
			};
		},
		[ slideUp, upArrowRef ]
	);
	return (
		<Section upArrow={true} slideUp={slideUp} upArrowRef={upArrowRef}>
			<h1>About</h1>
		</Section>
	);
};

export default About;
