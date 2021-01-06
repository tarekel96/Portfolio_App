import React from 'react';
import PropTypes from 'prop-types';
import { Navbar } from './Navbar.js';
import { Section } from './Section.js';
import styles from './Layout.module.css';

export const Layout = ({
	children,
	arrows,
	hasNavbar = true,
	pageIndex,
	setPageIndex,
	navItems,
	setCurrentNav,
	resetPrevNavItem,
	handleCardNextClick,
	handleCardPrevClick,
	slideUp,
	slideDown,
	upArrowRef,
	downArrowRef,
	leftArrowRef,
	rightArrowRef,
	cardArrows,
	hasFooter,
	getCurrentNavItem,
	TYPES,
	projectType,
	setProjectType,
	SWECardIndex,
	setSWECardIndex,
	setWebDevCommand,
	setSWECommand,
	projectData,
	setProjectIndex,
	SWEData
}) => {
	return (
		<div className={`${styles['layoutContainer']}`}>
			{hasNavbar && (
				<Navbar
					setPageIndex={setPageIndex}
					navItems={navItems}
					setCurrentNav={setCurrentNav}
					resetPreviousNavItem={resetPrevNavItem}
					pageIndex={pageIndex}
					resetPrevNavItem={resetPrevNavItem}
					getCurrentNavItem={getCurrentNavItem}
				/>
			)}
			<Section
				hasFooter={hasFooter}
				pageIndex={pageIndex}
				upAndDownArrows={arrows === 'updown' ? true : false}
				upArrow={arrows === 'up' ? true : false}
				downArrow={arrows === 'down' ? true : false}
				cardArrows={cardArrows}
				slideUp={slideUp}
				slideDown={slideDown}
				upArrowRef={upArrowRef}
				downArrowRef={downArrowRef}
				leftArrowRef={leftArrowRef}
				rightArrowRef={rightArrowRef}
				setPageIndex={setPageIndex}
				navItems={navItems}
				setCurrentNav={setCurrentNav}
				resetPrevNavItem={resetPrevNavItem}
				getCurrentNavItem={getCurrentNavItem}
				TYPES={TYPES}
				projectType={projectType}
				setProjectType={setProjectType}
				SWECardIndex={SWECardIndex}
				setSWECardIndex={setSWECardIndex}
				handleCardNextClick={handleCardNextClick}
				handleCardPrevClick={handleCardPrevClick}
				setWebDevCommand={setWebDevCommand}
				projectData={projectData}
				setProjectIndex={setProjectIndex}
				SWEData={SWEData}
				setSWECommand={setSWECommand}
			>
				{children}
			</Section>
		</div>
	);
};
Layout.propTypes = {
	children: PropTypes.any,
	hasNavbar: PropTypes.bool,
	setPageIndex: PropTypes.func,
	navItems: PropTypes.array,
	setCurrentNav: PropTypes.func,
	resetPreviousNavItem: PropTypes.func
};
