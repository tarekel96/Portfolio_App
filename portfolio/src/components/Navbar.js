import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Navbar.module.css';

export const Navbar = ({
	setPageIndex,
	navItems,
	setCurrentNav,
	resetPreviousNavItem,
	resetPrevNavItem,
	getCurrentNavItem
}) => {
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
						getCurrentNavItem={getCurrentNavItem}
						resetPrevNavItem={resetPrevNavItem}
					/>
				);
			})}
		</nav>
	);
};
Navbar.propTypes = {
	setPageIndex: PropTypes.func,
	navItems: PropTypes.array,
	setCurrentNav: PropTypes.func,
	resetPreviousNavItem: PropTypes.func
};

const NavItem = ({ name, id, setPageIndex, isCurrent, resetPreviousNavItem, getCurrentNavItem, resetPrevNavItem }) => {
	const handleClick = useCallback(
		(e) => {
			resetPrevNavItem(id);
			setPageIndex(() => {
				return Number(e.target.id);
			});
		},
		[ id, resetPrevNavItem, setPageIndex ]
	);
	useEffect(
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
NavItem.propTypes = {
	name: PropTypes.string,
	id: PropTypes.number,
	setPageIndex: PropTypes.func,
	isCurrent: PropTypes.bool,
	resetPreviousNavItem: PropTypes.func
};
