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
	resetPreviousNavItem,
	next,
	previous,
	slideUp,
	slideDown,
	upArrowRef,
	downArrowRef,
	leftArrowRef,
	rightArrowRef,
	cardArrows,
	hasFooter
}) => {
	return (
		<div className={`${styles['layoutContainer']}`}>
			{hasNavbar && (
				<Navbar
					setPageIndex={setPageIndex}
					navItems={navItems}
					setCurrentNav={setCurrentNav}
					resetPreviousNavItem={resetPreviousNavItem}
				/>
			)}
			<Section
				hasFooter={hasFooter}
				pageIndex={pageIndex}
				upAndDownArrows={arrows === 'updown' ? true : false}
				upArrow={arrows === 'up' ? true : false}
				downArrow={arrows === 'down' ? true : false}
				cardArrows={cardArrows}
				next={next}
				previous={previous}
				slideUp={slideUp}
				slideDown={slideDown}
				upArrowRef={upArrowRef}
				downArrowRef={downArrowRef}
				leftArrowRef={leftArrowRef}
				rightArrowRef={rightArrowRef}
				setPageIndex={setPageIndex}
				navItems={navItems}
				setCurrentNav={setCurrentNav}
				resetPreviousNavItem={resetPreviousNavItem}
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
