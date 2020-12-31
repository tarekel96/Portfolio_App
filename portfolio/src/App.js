import React from 'react';
import { Layout } from './components/Layout.js';
import { asyncFetchData } from './utils/fetchData.js';
import Portfolio from './pages/Portfolio.js';
import Loading from './pages/Loading.js';
import Resume from './pages/Resume.js';
import About from './pages/About.js';
import './styles/main.css';

const App = () => {
	let appMainContent;
	const NUM_OF_PAGES = 3;
	let arrows = '';
	let cardArrows = false;
	/* ROOT APP STATE */
	const [ pageIndex, setPageIndex ] = React.useState(0);
	/* PROJECT SECTION REFS AND STATE */
	const leftArrowRef = React.createRef('leftArrow');
	const rightArrowRef = React.createRef('rightArrow');
	const [ lastCommand, setCommand ] = React.useState('');
	const [ projectData, setProjectData ] = React.useState([]);
	const [ projectIndex, setProjectIndex ] = React.useState(0);
	/* NAVBAR REFS AND STATE */
	const upArrowRef = React.createRef('upArrow');
	const downArrowRef = React.createRef('downArrow');
	const [ navItems, setCurrentNav ] = React.useState([
		{
			name: 'Portfolio',
			indexNumber: 0,
			isCurrent: true
		},
		{
			name: 'Resume',
			indexNumber: 1,
			isCurrent: false
		},
		{
			name: 'About',
			indexNumber: 2,
			isCurrent: false
		}
	]);
	const resetPreviousNavItem = React.useCallback(
		(newCurrIndex) => {
			let previousCurrent;
			new Promise((resolve, reject) =>
				resolve(
					(previousCurrent = navItems.findIndex((index) => {
						return index.isCurrent === true;
					}))
				)
			)
				.then(
					new Promise((resolve, reject) => {
						resolve(
							setCurrentNav((prevState) => {
								let newState = prevState;
								let tempNavItem = newState[previousCurrent];
								tempNavItem.isCurrent = false;
								return newState;
							})
						);
					})
				)
				.then(
					new Promise((resolve, reject) => {
						resolve(
							setCurrentNav((prevState) => {
								let newNavbar = prevState;
								newNavbar[newCurrIndex].isCurrent = true;
								return newNavbar;
							})
						);
					})
				);
		},
		[ navItems ]
	);
	const handleSlideUp = React.useCallback(
		() => {
			setPageIndex((prevPageIndex) => {
				if (prevPageIndex === 0) {
					const newIndex = NUM_OF_PAGES - 1;
					resetPreviousNavItem(newIndex);
					return newIndex;
				}
				else {
					const newIndex = prevPageIndex - 1;
					resetPreviousNavItem(newIndex);
					return newIndex;
				}
			});
		},
		[ resetPreviousNavItem ]
	);
	const handleSlideDown = React.useCallback(
		() => {
			setPageIndex((prevPageIndex) => {
				resetPreviousNavItem(prevPageIndex);
				if (prevPageIndex === NUM_OF_PAGES - 1) {
					const newIndex = 0;
					resetPreviousNavItem(newIndex);
					return newIndex;
				}
				else {
					const newIndex = prevPageIndex + 1;
					resetPreviousNavItem(newIndex);
					return newIndex;
				}
			});
		},
		[ resetPreviousNavItem ]
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

	React.useEffect(() => {
		let isCancelled = false;
		if (isCancelled === false) {
			try {
				asyncFetchData('assets/projects.json', setProjectData);
				// eslint-disable-next-line
			} catch (error) {
				//
				console.log(new Error(error));
			}
		}
		return () => (isCancelled = true);
	}, []);
	/* ROOT APP useEffect */
	React.useEffect(
		() => {
			console.log(projectData);
			return () => {};
		},
		[ projectData ]
	);

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
			cardArrows = true;
			arrows = 'down';
			appMainContent = (
				<Portfolio
					lastCommand={lastCommand}
					projectData={projectData}
					index={projectIndex}
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
		case 1:
			cardArrows = false;
			arrows = 'updown';
			appMainContent = (
				<Resume
					slideUp={handleSlideUp}
					slideDown={handleSlideDown}
					setPageIndex={setPageIndex}
					upArrowRef={upArrowRef}
					downArrowRef={downArrowRef}
				/>
			);
			break;
		case 2:
			cardArrows = false;
			arrows = 'up';
			appMainContent = (
				<About
					slideUp={handleSlideUp}
					setPageIndex={setPageIndex}
					upArrowRef={upArrowRef}
					downArrowRef={downArrowRef}
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
			resetPreviousNavItem={resetPreviousNavItem}
			lastCommand={lastCommand}
			projectData={projectData}
			index={projectIndex}
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
		>
			{appMainContent}
		</Layout>
	);
};

export default App;
