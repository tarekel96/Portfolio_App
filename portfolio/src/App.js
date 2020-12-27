import React from 'react';
import { useTransition } from 'react-spring';
import projectDataJSON from './data/projects.json';
import Portfolio from './pages/Portfolio.js';
import Loading from './pages/Loading.js';
import Resume from './pages/Resume.js';
import './styles/main.css';

const App = () => {
	const [ pageIndex, setPageIndex ] = React.useState(0);
	const [ projectData, setProjectData ] = React.useState([]);
	const [ projectIndex, setProjectIndex ] = React.useState(0);
	const projectTransitions = useTransition(projectIndex, (p) => p, {
		from: { opacity: 0, transform: 'translate3d(100%,0,0)', transitionDuration: '.45s' },
		enter: { opacity: 0, transform: 'translate3d(0%,0,0)', transitionDuration: '1.25s' },
		update: { opacity: 1, transform: 'translate3d(0%,0,0)', transitionDuration: '1.25s' },
		leave: { opacity: 0, transform: 'translate3d(-50%,0,0)', transitionDuration: '0s' }
	});
	React.useEffect(
		() => {
			setProjectData(() => projectDataJSON);
			console.log(projectData);
		},
		[ projectData, projectIndex ]
	);
	const handleCardNextClick = React.useCallback(
		() => {
			setProjectIndex((state) => {
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
			setProjectIndex((state) => {
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
	const handleSlideUp = () => {
		setPageIndex((prevPageIndex) => {
			if (prevPageIndex === 0) {
				return 1;
			}
			else {
				return prevPageIndex - 1;
			}
		});
	};
	const handleSlideDown = () => {
		setPageIndex((prevPageIndex) => {
			if (prevPageIndex === 1) {
				return 0;
			}
			else {
				return prevPageIndex + 1;
			}
		});
	};

	// wait for projectData to be fetched before render
	while (true) {
		if (projectData !== undefined) {
			if (projectData[projectIndex] !== undefined) {
				break;
			}
		}
		return <Loading />;
	}
	switch (pageIndex) {
		case 0:
			return (
				<Portfolio
					projectData={projectData}
					index={projectIndex}
					transitions={projectTransitions}
					next={handleCardNextClick}
					previous={handleCardPrevClick}
					slideUp={handleSlideUp}
					slideDown={handleSlideDown}
					setPageIndex={setPageIndex}
				/>
			);
		case 1:
			return <Resume slideUp={handleSlideUp} slideDown={handleSlideDown} setPageIndex={setPageIndex} />;
		default:
			return (
				<Portfolio
					projectData={projectData}
					index={projectIndex}
					transitions={projectTransitions}
					next={handleCardNextClick}
					previous={handleCardPrevClick}
					slideUp={handleSlideUp}
					slideDown={handleSlideDown}
					setPageIndex={setPageIndex}
				/>
			);
	}
};

export default App;
