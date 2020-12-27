import React from 'react';
import { useTransition } from 'react-spring';
import { Layout } from './components/Layout.js';
import projectDataJSON from './data/projects.json';
import Portfolio from './pages/Portfolio.js';
import Loading from './pages/Loading.js';
import Resume from './pages/Resume.js';
import About from './pages/About.js';
import './styles/main.css';

const App = () => {
	let appMainContent;
	const NUM_OF_PAGES = 3;
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
				return NUM_OF_PAGES - 1;
			}
			else {
				return prevPageIndex - 1;
			}
		});
	};
	const handleSlideDown = () => {
		setPageIndex((prevPageIndex) => {
			if (prevPageIndex === NUM_OF_PAGES - 1) {
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
			appMainContent = (
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
			break;
		case 1:
			appMainContent = <Resume slideUp={handleSlideUp} slideDown={handleSlideDown} setPageIndex={setPageIndex} />;
			break;
		case 2:
			appMainContent = <About slideUp={handleSlideUp} setPageIndex={setPageIndex} />;
			break;
		default:
			appMainContent = <Loading />;
			break;
	}
	return <Layout setPageIndex={setPageIndex}>{appMainContent}</Layout>;
};

export default App;
