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
	/* ROOT APP STATE */
	const [ pageIndex, setPageIndex ] = React.useState(0);
	/* PROJECT SECTION STATE */
	const [ projectData, setProjectData ] = React.useState([]);
	const [ projectIndex, setProjectIndex ] = React.useState(0);
	const projectTransitions = useTransition(projectIndex, (p) => p, {
		from: { opacity: 0, transform: 'translate3d(100%,0,0)', transitionDuration: '.45s' },
		enter: { opacity: 0, transform: 'translate3d(0%,0,0)', transitionDuration: '1.25s' },
		update: { opacity: 1, transform: 'translate3d(0%,0,0)', transitionDuration: '1.25s' },
		leave: { opacity: 0, transform: 'translate3d(-50%,0,0)', transitionDuration: '0s' }
	});
	/* NAVBAR STATE */
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
								console.log('previous state');
								console.log(prevState);
								// const previousCurrent = navItems.findIndex((index) => {
								// 	return index.isCurrent === true;
								// });
								let newState = prevState;
								let tempNavItem = newState[previousCurrent];
								tempNavItem.isCurrent = false;
								//newState[previousCurrent] = tempNavItem;
								console.log('New State');
								console.log(newState);
								return newState;
							})
						);
					})
				)
				.then(
					new Promise((resolve, reject) => {
						resolve(
							setCurrentNav((prevState) => {
								console.log('here2');
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
			console.log('hit handle slide down');
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
	/* ROOT APP useEffect */
	React.useEffect(
		() => {
			setProjectData(() => projectDataJSON);
			console.log(projectData);
			if (downArrowRef && downArrowRef.current !== null) {
				downArrowRef.current.addEventListener('click', handleSlideDown);
			}
			if (upArrowRef && upArrowRef.current !== null) {
				upArrowRef.current.addEventListener('click', handleSlideUp);
			}
		},
		[ projectData, projectIndex, handleSlideDown, handleSlideUp, downArrowRef, upArrowRef ]
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
					upArrowRef={upArrowRef}
					downArrowRef={downArrowRef}
				/>
			);
			break;
		case 1:
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
			setPageIndex={setPageIndex}
			navItems={navItems}
			setCurrentNav={setCurrentNav}
			resetPreviousNavItem={resetPreviousNavItem}
		>
			{appMainContent}
		</Layout>
	);
};

export default App;
