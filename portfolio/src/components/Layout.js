import React from 'react';
import propTypes from 'prop-types';
import { Navbar } from './Navbar.js';
import styles from './Layout.module.css';

export const Layout = ({ children, hasNavbar = true, setPageIndex, navItems, setCurrentNav, resetPreviousNavItem }) => {
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
			{children}
		</div>
	);
};
Layout.propTypes = {
	children: propTypes.any,
	hasNavbar: propTypes.bool,
	setPageIndex: propTypes.func,
	navItems: propTypes.array,
	setCurrentNav: propTypes.func,
	resetPreviousNavItem: propTypes.func
};
