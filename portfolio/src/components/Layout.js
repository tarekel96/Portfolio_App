import React from 'react';
import PropTypes from 'prop-types';
import { Navbar } from './Navbar.js';
import { Section } from './Section.js';
import styles from './Layout.module.css';

export const Layout = ({
	children,
	arrows,
	hasNavbar = true,
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
	cardArrows
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
