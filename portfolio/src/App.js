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
	const [ loading, setLoading ] = React.useState(true);
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
	console.log(getCurrentNavItemIndex());
	// const resetPreviousNavItem = React.useCallback(
	// 	(newCurrIndex) => {
	// 		console.log('new page index ' + newCurrIndex);
	// 		let previousCurrent;
	// 		new Promise((resolve, reject) =>
	// 			resolve(
	// 				(previousCurrent = navItems.findIndex((index) => {
	// 					return index.isCurrent === true;
	// 				}))
	// 			)
	// 		)
	// 			.then(
	// 				new Promise((resolve, reject) => {
	// 					resolve(
	// 						setCurrentNav((prevState) => {
	// 							let newState = prevState;
	// 							// let tempNavItem = newState[previousCurrent];
	// 							// tempNavItem.isCurrent = false;
	// 							console.log('Previous Current ' + previousCurrent);
	// 							newState[previousCurrent].isCurrent = false;
	// 							console.log('newState');
	// 							console.log(newState);
	// 							return newState;
	// 						})
	// 					);
	// 				})
	// 			)
	// 			.then(
	// 				new Promise((resolve, reject) => {
	// 					resolve(
	// 						setCurrentNav((prevState) => {
	// 							let newNavbar = prevState;
	// 							newNavbar[newCurrIndex].isCurrent = true;
	// 							return newNavbar;
	// 						})
	// 					);
	// 				})
	// 			);
	// 		console.log('navItems');
	// 		console.log(navItems);
	// 	},
	// 	[ navItems ]
	// );
	// const resetPreviousNavItem = React.useCallback(
	// 	(newCurrIndex) => {
	// 		console.log('INSIDE RESET NAVITEM');
	// 		console.log('new page index ' + newCurrIndex);
	// 		let previousCurrent;
	// 		previousCurrent = navItems.findIndex((index) => index.isCurrent === true);
	// 		console.log('THE CURRENT TRUE IS ' + previousCurrent);
	// 		setCurrentNav((prevState) => {
	// 			let newState = prevState;
	// 			newState[previousCurrent].isCurrent = false;
	// 			newState[newCurrIndex].isCurrent = true;
	// 			return newState;
	// 		});
	// 		console.log('navItems');
	// 		console.log(navItems);
	// 	},
	// 	[ navItems ]
	// );
	const resetPrevNavItem = React.useCallback(
		(newCurrIndex) => {
			console.log('INSIDE RESET NAVITEM');
			console.log('new page index ' + newCurrIndex);
			let previousCurrent;
			previousCurrent = getCurrentNavItemIndex();
			console.log('THE CURRENT TRUE IS ' + previousCurrent);
			setCurrentNav((prevState) => {
				let newState = prevState;
				newState[previousCurrent].isCurrent = false;
				newState[newCurrIndex].isCurrent = true;
				return newState;
			});
			console.log('navItems');
			console.log(navItems);
		},
		[ navItems, getCurrentNavItemIndex ]
	);
	const resetPreviousNavItem = React.useCallback(
		(previousCurrent, newCurrIndex) => {
			console.log('INSIDE RESET NAVITEM');
			console.log('new page index ' + newCurrIndex);
			// let previousCurrent;
			// previousCurrent = navItems.findIndex((index) => index.isCurrent === true);
			console.log('THE CURRENT TRUE IS ' + previousCurrent);
			setCurrentNav((prevState) => {
				let newState = prevState;
				newState[previousCurrent].isCurrent = false;
				newState[newCurrIndex].isCurrent = true;
				return newState;
			});
			console.log('navItems');
			console.log(navItems);
		},
		[ navItems ]
	);
	const handleSlideUp = React.useCallback(
		() => {
			setPageIndex((prevPageIndex) => {
				if (prevPageIndex === 0) {
					const newIndex = NUM_OF_PAGES - 1;
					resetPreviousNavItem(prevPageIndex, newIndex);
					return newIndex;
				}
				else {
					const newIndex = prevPageIndex - 1;
					resetPreviousNavItem(prevPageIndex, newIndex);
					return newIndex;
				}
			});
		},
		[ resetPreviousNavItem ]
	);
	const handleSlideDown = React.useCallback(
		() => {
			setPageIndex((prevPageIndex) => {
				console.log(`Previous Page Index: ${prevPageIndex}`);
				//resetPreviousNavItem(prevPageIndex);
				if (prevPageIndex === NUM_OF_PAGES - 1) {
					const newIndex = 0;
					console.log('NEW INDEX' + newIndex);
					resetPreviousNavItem(prevPageIndex, newIndex);
					return newIndex;
				}
				else {
					const newIndex = prevPageIndex + 1;
					console.log('NEW INDEX' + newIndex);
					resetPreviousNavItem(prevPageIndex, newIndex);
					return newIndex;
				}
			});
			console.log(`Navbar Items`);
			console.log(navItems);
		},
		[ resetPreviousNavItem, navItems ]
	);
	const handleCardNextClick = React.useCallback(
		() => {
			setCommand(() => 'next');
			setProjectIndex((state) => {
				console.log(`Page Index: ${pageIndex}`);
				console.log(`Navbar Items`);
				console.log(navItems);
				if (state === projectData.length - 1) {
					return 0;
				}
				else {
					return state + 1;
				}
			});
			console.log(`Navbar Items`);
			console.log(navItems);
		},
		[ projectData, pageIndex, navItems ]
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

	// wait for projectData to be fetched before render
	while (loading) {
		if (projectData !== undefined) {
			if (projectData[projectIndex] !== undefined) {
				setLoading(() => false);
			}
		}
		return <Loading />;
	}
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
			hasFooter={hasFooter}
			getCurrentNavItemIndex={getCurrentNavItemIndex}
			resetPrevNavItem={resetPrevNavItem}
		>
			{appMainContent}
		</Layout>
	);
};

export default App;
