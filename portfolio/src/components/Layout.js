import React from 'react';
import { Navbar } from './Navbar.js';
import styles from './Layout.module.css';

export const Layout = ({ children, hasNavbar = true, setPageIndex }) => {
	return (
		<div className={`${styles['layoutContainer']}`}>
			{hasNavbar && <Navbar setPageIndex={setPageIndex} />}
			{children}
		</div>
	);
};
