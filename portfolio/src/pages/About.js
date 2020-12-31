import React from 'react';

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
	return <h1>About</h1>;
};

export default About;
