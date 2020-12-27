import React from 'react';
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
