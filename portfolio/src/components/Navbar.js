import React from 'react';
import styles from './Navbar.module.css';

export const Navbar = ({ setPageIndex, navItems, setCurrentNav, resetPreviousNavItem }) => {
	return (
		<nav className={`${styles['navbar']} blackOliveBackground`}>
			{navItems.map((navItem) => {
				return (
					<NavItem
						name={navItem.name}
						id={navItem.indexNumber}
						key={navItem.indexNumber}
						setPageIndex={setPageIndex}
						isCurrent={navItem.isCurrent}
						setCurrentNav={setCurrentNav}
						resetPreviousNavItem={resetPreviousNavItem}
					/>
				);
			})}
		</nav>
	);
};

const NavItem = ({ name, id, setPageIndex, isCurrent, resetPreviousNavItem }) => {
	const handleClick = React.useCallback(
		(e) => {
			resetPreviousNavItem(id);
			setPageIndex(() => {
				return Number(e.target.id);
			});
		},
		[ id, resetPreviousNavItem, setPageIndex ]
	);
	React.useEffect(
		() => {
			document.getElementById(id).addEventListener('click', handleClick);
			return () => {
				document.removeEventListener('click', handleClick);
			};
		},
		[ id, handleClick ]
	);
	return (
		<div id={id} className={`cursor ${isCurrent ? `whiteColor` : 'greySlateColor'}`}>
			{name}
		</div>
	);
};
