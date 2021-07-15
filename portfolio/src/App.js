// import API and libraries
import React, { useState, createRef, useCallback, useEffect } from 'react';
// import UI components
import { Layout } from './components/Layout.js';
import { Fade } from 'react-awesome-reveal';
// import util methods & data
import { asyncFetchData } from './utils/fetchData.js';
import { nav_items } from './utils/appUtils';
// import custom React hooks
import { UseCurrListIndex } from './utils/hooks';
// import UI pages
import Portfolio from './pages/Portfolio.js';
import Loading from './pages/Loading.js';
import Resume from './pages/Resume.js';
import About from './pages/About.js';
// import styles
import './styles/main.css';

const App = () => {
	let appMainContent;
	const NUM_OF_PAGES = 3;
	let arrows = '';
	let cardArrows = false;
	let hasFooter = false;
	/* ROOT APP STATE */
	const [ pageIndex, setPageIndex ] = useState(0);
	/* PROJECT SECTION REFS AND STATE */
	// WebDev Section
	const leftArrowRef = createRef('leftArrow');
	const rightArrowRef = createRef('rightArrow');
	const [ projectData, setProjectData ] = useState([]);
	const [ projectIndex, setProjectIndex ] = useState(0);
	const [ lastWebDevCommand, setWebDevCommand ] = useState('');
	// SWE Section
	const TYPES = {
		WEB_DEV: 'webDevelopment',
		GEN_SWE: 'generalSoftwareEngineneering',
		DS_ML: 'dataScienceMachineLearning'
	};
	const { WEB_DEV } = TYPES;
	const [ projectType, setProjectType ] = useState(WEB_DEV);
	const [ SWEData, setSWEData ] = useState([]);
	const [ SWECardIndex, setSWECardIndex ] = useState(0);
	const [ lastSWECommand, setSWECommand ] = useState('');
	// DS & ML Section
	const [ DS_ML_Data, set_DS_ML_Data ] = useState([]);
	const [ DS_ML_CardIndex, set_DS_ML_CardIndex ] = useState(0);
	const [ last_DS_ML_Command, set_DS_ML_Command ] = useState('');
	/* NAVBAR REFS AND STATE */
	const upArrowRef = createRef('upArrow');
	const downArrowRef = createRef('downArrow');
	const [ navItems, setCurrentNav ] = useState(nav_items);
	const getCurrentNavItemIndex = UseCurrListIndex(navItems);

	// fetch json data onMount
	useEffect(() => {
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
	useEffect(
		() => {
			console.log(projectData);
			return () => {};
		},
		[ projectData ]
	);

	/* Nav-UI methods */
	const resetPrevNavItem = useCallback(
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
	const handleSlideUp = useCallback(
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
	const handleSlideDown = useCallback(
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
	const handleCardNextClick = useCallback((arr, setCommand, setIndex) => {
		setCommand(() => 'next');
		setIndex((state) => {
			if (state === arr.length - 1) {
				return 0;
			}
			else {
				return state + 1;
			}
		});
	}, []);
	const handleCardPrevClick = useCallback((arr, setCommand, setIndex) => {
		setCommand(() => 'previous');
		setIndex((state) => {
			if (state === 0) {
				return arr.length - 1;
			}
			else {
				return state - 1;
			}
		});
	}, []);

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
			hasFooter = false;
			appMainContent = (
				<Portfolio
					lastWebDevCommand={lastWebDevCommand}
					lastSWECommand={lastSWECommand}
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
					TYPES={TYPES}
					projectType={projectType}
					setProjectType={setProjectType}
					SWEData={SWEData}
					setSWEData={setSWEData}
					SWECardIndex={SWECardIndex}
					setSWECardIndex={setSWECardIndex}
					DS_ML_Data={DS_ML_Data}
					set_DS_ML_Data={set_DS_ML_Data}
					DS_ML_CardIndex={DS_ML_CardIndex}
					set_DS_ML_CardIndex={set_DS_ML_CardIndex}
					last_DS_ML_Command={last_DS_ML_Command}
					set_DS_ML_Command={set_DS_ML_Command}
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
			lastWebDevCommand={lastWebDevCommand}
			projectData={projectData}
			projectIndex={projectIndex}
			setProjectIndex={setProjectIndex}
			handleCardNextClick={handleCardNextClick}
			handleCardPrevClick={handleCardPrevClick}
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
			TYPES={TYPES}
			projectType={projectType}
			setProjectType={setProjectType}
			SWEData={SWEData}
			setSWEData={setSWEData}
			SWECardIndex={SWECardIndex}
			setSWECardIndex={setSWECardIndex}
			setWebDevCommand={setWebDevCommand}
			setSWECommand={setSWECommand}
			DS_ML_Data={DS_ML_Data}
			set_DS_ML_Data={set_DS_ML_Data}
			DS_ML_CardIndex={DS_ML_CardIndex}
			set_DS_ML_CardIndex={set_DS_ML_CardIndex}
			last_DS_ML_Command={last_DS_ML_Command}
			set_DS_ML_Command={set_DS_ML_Command}
		>
			{appMainContent}
		</Layout>
	);
};

export default App;
