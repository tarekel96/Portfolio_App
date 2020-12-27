import React from 'react';
import styles from './Navbar.module.css';

export const Navbar = ({ setPageIndex }) => {
	const navItems = [
		{
			name: 'Portfolio',
			indexNumber: 0
		},
		{
			name: 'Resume',
			indexNumber: 1
		},
		{
			name: 'About',
			indexNumber: 2
		}
	];
	return (
		<nav className={`${styles['navbar']} brownBurgundyBackground`}>
			{navItems.map((navItem) => {
				return (
					<div
						id={navItem.indexNumber}
						className={`cursor greenLightForestColor`}
						key={navItem.indexNumber}
						onClick={(e) => {
							setPageIndex((prevPageIndex) => {
								return Number(e.target.id);
							});
						}}
					>
						{navItem.name}
					</div>
				);
			})}
		</nav>
	);
};
