import React from 'react';
import { Layout } from './components/Layout.js';
import { asyncFetchData } from './utils/fetchData.js';
import Portfolio from './pages/Portfolio.js';
import Loading from './pages/Loading.js';
import Resume from './pages/Resume.js';
import About from './pages/About.js';
import { Fade } from 'react-awesome-reveal';
import './styles/main.css';

const App = () => {
	let appMainContent;
	const NUM_OF_PAGES = 3;
	let arrows = '';
	let cardArrows = false;
	let hasFooter = false;
	/* ROOT APP STATE */
	const [ pageIndex, setPageIndex ] = React.useState(0);
	/* PROJECT SECTION REFS AND STATE */
	const leftArrowRef = React.createRef('leftArrow');
	const rightArrowRef = React.createRef('rightArrow');
	const [ projectData, setProjectData ] = React.useState([]);
	const [ projectIndex, setProjectIndex ] = React.useState(0);
	const [ lastCommand, setCommand ] = React.useState('');
	/* NAVBAR REFS AND STATE */
	const upArrowRef = React.createRef('upArrow');
	const downArrowRef = React.createRef('downArrow');
	const [ navItems, setCurrentNav ] = React.useState([
		{
			name: 'About',
			indexNumber: 0,
			isCurrent: true
		},
		{
			name: 'Resume',
			indexNumber: 1,
			isCurrent: false
		},
		{
			name: 'Portfolio',
			indexNumber: 2,
			isCurrent: false
		}
	]);
	const getCurrentNavItemIndex = React.useCallback(
		() => {
			return navItems.findIndex((index) => index.isCurrent === true);
		},
		[ navItems ]
	);
	React.useEffect(() => {
		let isMounted = true;
		if (isMounted === true) {
			try {
				return new Promise((resolve, reject) => {
					resolve(asyncFetchData('assets/data/projects.json', setProjectData));
				});
				// eslint-disable-next-line
			} catch (error) {
				//
				console.log(new Error(error));
			}
		}
		return () => (isMounted = false);
	}, []);
	/* ROOT APP useEffect */
	React.useEffect(
		() => {
			console.log(projectData);
			return () => {};
		},
		[ projectData ]
	);
	const resetPrevNavItem = React.useCallback(
		(newCurrIndex) => {
			let previousCurrent;
			previousCurrent = getCurrentNavItemIndex();
			setCurrentNav((prevState) => {
				let newState = prevState;
				newState[previousCurrent].isCurrent = false;
				newState[newCurrIndex].isCurrent = true;
				return newState;
			});
		},
		[ getCurrentNavItemIndex ]
	);
	const handleSlideUp = React.useCallback(
		() => {
			setPageIndex((prevPageIndex) => {
				if (prevPageIndex === 0) {
					const newIndex = NUM_OF_PAGES - 1;
					resetPrevNavItem(newIndex);
					return newIndex;
				}
				else {
					const newIndex = prevPageIndex - 1;
					resetPrevNavItem(newIndex);
					return newIndex;
				}
			});
		},
		[ resetPrevNavItem ]
	);
	const handleSlideDown = React.useCallback(
		() => {
			setPageIndex((prevPageIndex) => {
				if (prevPageIndex === NUM_OF_PAGES - 1) {
					const newIndex = 0;
					resetPrevNavItem(newIndex);
					return newIndex;
				}
				else {
					const newIndex = prevPageIndex + 1;
					resetPrevNavItem(newIndex);
					return newIndex;
				}
			});
		},
		[ resetPrevNavItem ]
	);
	const handleCardNextClick = React.useCallback(
		() => {
			setCommand(() => 'next');
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
			setCommand(() => 'previous');
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

	switch (pageIndex) {
		case 0:
			cardArrows = false;
			arrows = 'down';
			hasFooter = true;
			appMainContent = (
				<Fade triggerOnce={false} duration={1750}>
					<About
						slideUp={handleSlideUp}
						setPageIndex={setPageIndex}
						upArrowRef={upArrowRef}
						downArrowRef={downArrowRef}
					/>
				</Fade>
			);
			break;
		case 1:
			cardArrows = false;
			arrows = 'updown';
			hasFooter = true;
			appMainContent = (
				<Fade triggerOnce={false} duration={1750}>
					<Resume
						slideUp={handleSlideUp}
						slideDown={handleSlideDown}
						setPageIndex={setPageIndex}
						upArrowRef={upArrowRef}
						downArrowRef={downArrowRef}
					/>
				</Fade>
			);
			break;
		case 2:
			cardArrows = true;
			arrows = 'up';
			hasFooter = true;
			appMainContent = (
				<Portfolio
					lastCommand={lastCommand}
					projectData={projectData}
					projectIndex={projectIndex}
					next={handleCardNextClick}
					previous={handleCardPrevClick}
					slideUp={handleSlideUp}
					slideDown={handleSlideDown}
					setPageIndex={setPageIndex}
					upArrowRef={upArrowRef}
					downArrowRef={downArrowRef}
					leftArrowRef={leftArrowRef}
					rightArrowRef={rightArrowRef}
					cardArrows={true}
				/>
			);
			break;
		default:
			appMainContent = <Loading />;
			break;
	}
	return (
		<Layout
			pageIndex={pageIndex}
			setPageIndex={setPageIndex}
			navItems={navItems}
			setCurrentNav={setCurrentNav}
			resetPrevNavItem={resetPrevNavItem}
			lastCommand={lastCommand}
			projectData={projectData}
			projectIndex={projectIndex}
			next={handleCardNextClick}
			previous={handleCardPrevClick}
			slideUp={handleSlideUp}
			slideDown={handleSlideDown}
			upArrowRef={upArrowRef}
			downArrowRef={downArrowRef}
			leftArrowRef={leftArrowRef}
			rightArrowRef={rightArrowRef}
			cardArrows={cardArrows}
			arrows={arrows}
			hasFooter={hasFooter}
			getCurrentNavItemIndex={getCurrentNavItemIndex}
		>
			{appMainContent}
		</Layout>
	);
};

export default App;
