import React from 'react';
import { useTransition } from 'react-spring';
import projectDataJSON from './data/projects.json';
import Portfolio from './pages/Portfolio.js';
import './styles/main.css';

const App = () => {
	const [ projectData, setProjectData ] = React.useState([]);
	const [ projectIndex, setProjectProjectIndex ] = React.useState(0);
	const projectTransitions = useTransition(projectIndex, (p) => p, {
		from: { opacity: 0, transform: 'translate3d(100%,0,0)', transitionDuration: '.45s' },
		enter: { opacity: 0, transform: 'translate3d(0%,0,0)', transitionDuration: '1.25s' },
		update: { opacity: 1, transform: 'translate3d(0%,0,0)', transitionDuration: '1.25s' },
		leave: { opacity: 0, transform: 'translate3d(-50%,0,0)', transitionDuration: '0s' }
	});
	const handleCardNextClick = React.useCallback(
		() => {
			setProjectProjectIndex((state) => {
				if (state === projectData.length - 1) {
					return 0;
				}
				else {
					return state + 1;
				}
			});
		},
		[ projectData ]
	);
	const handleCardPrevClick = React.useCallback(
		() => {
			setProjectProjectIndex((state) => {
				if (state === 0) {
					return projectData.length - 1;
				}
				else {
					return state - 1;
				}
			});
		},
		[ projectData ]
	);

	React.useEffect(
		() => {
			setProjectData(() => projectDataJSON);
		},
		[ projectData, projectIndex ]
	);
	// wait for projectData to be fetched before render
	while (true) {
		if (projectData !== undefined) {
			if (projectData[projectIndex] !== undefined) {
				break;
			}
		}
		return <h3>Loading...</h3>;
	}
	return (
		<div>
			<Portfolio
				projectData={projectData}
				index={projectIndex}
				transitions={projectTransitions}
				next={handleCardNextClick}
				previous={handleCardPrevClick}
			/>
		</div>
	);
};
// };

export default App;
