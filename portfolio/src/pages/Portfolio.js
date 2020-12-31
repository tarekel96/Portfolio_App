import React from 'react';
import { Slide } from 'react-awesome-reveal';
import PropTypes from 'prop-types';
import { Card } from '../components/Card.js';

const Portfolio = ({
	lastCommand,
	projectData,
	index,
	next,
	previous,
	slideUp,
	slideDown,
	upArrowRef,
	downArrowRef,
	leftArrowRef,
	rightArrowRef
}) => {
	let technologiesArray;
	// converts the tags string into an array of tags
	if (projectData[index].technologiesUsed !== '') {
		technologiesArray = projectData[index].technologiesUsed.split(',');
	}
	React.useEffect(
		() => {
			let isMounted = true;
			if (isMounted === false) return;
			const rightHandler = setInterval(rightArrowRef.current.addEventListener('click', next), 500);
			const leftHandler = setInterval(leftArrowRef.current.addEventListener('click', previous), 500);
			const downHandler = setInterval(downArrowRef.current.addEventListener('click', slideDown), 500);
			return () => {
				clearInterval(rightHandler);
				clearInterval(leftHandler);
				clearInterval(downHandler);
				isMounted = false;
			};
		},
		[ next, rightArrowRef, previous, leftArrowRef, slideUp, slideDown, upArrowRef, downArrowRef ]
	);

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
	transitions: PropTypes.array,
	next: PropTypes.func,
	previous: PropTypes.func,
	slideUp: PropTypes.func,
	slideDown: PropTypes.func,
	setPageIndex: PropTypes.func,
	upArrowRef: PropTypes.objectOf(PropTypes.string),
	downArrowRef: PropTypes.objectOf(PropTypes.string),
	leftArrowRef: PropTypes.objectOf(PropTypes.string),
	rightArrowRef: PropTypes.objectOf(PropTypes.string)
};

export default Portfolio;
