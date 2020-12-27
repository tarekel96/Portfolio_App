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
					<NavItem
						name={navItem.name}
						id={navItem.indexNumber}
						key={navItem.indexNumber}
						setPageIndex={setPageIndex}
					/>
				);
			})}
		</nav>
	);
};

const NavItem = ({ name, id, setPageIndex }) => {
	const [ visited, setVisit ] = React.useState(false);
	return (
		<div
			id={id}
			className={`cursor ${visited ? `whiteColor` : 'greenLightForestColor'}`}
			onClick={(e) => {
				setVisit((prevState) => !prevState);
				setPageIndex(() => {
					return Number(e.target.id);
				});
			}}
		>
			{name}
		</div>
	);
};
