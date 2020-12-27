import React from 'react';
import styles from './Navbar.module.css';

export const Navbar = ({ setPageIndex }) => {
	// const navItems = [
	// 	{
	// 		name: 'Portfolio',
	// 		indexNumber: 0,
	// 		isCurrent: true
	// 	},
	// 	{
	// 		name: 'Resume',
	// 		indexNumber: 1,
	// 		isCurrent: false
	// 	},
	// 	{
	// 		name: 'About',
	// 		indexNumber: 2,
	// 		isCurrent: false
	// 	}
	// ];
	const [ navItems, setCurrentNav ] = React.useState([
		{
			name: 'Portfolio',
			indexNumber: 0,
			isCurrent: true
		},
		{
			name: 'Resume',
			indexNumber: 1,
			isCurrent: false
		},
		{
			name: 'About',
			indexNumber: 2,
			isCurrent: false
		}
	]);
	const resetPrevious = (newCurrIndex) => {
		const previousCurrent = navItems.findIndex((index) => {
			return index.isCurrent === true;
		});
		setCurrentNav((prevState) => {
			let newState = prevState;
			let tempNavItem = newState[previousCurrent];
			tempNavItem.isCurrent = false;
			newState[previousCurrent] = tempNavItem;
			console.log(newState);
			return newState;
		});
		setCurrentNav((prevState) => {
			let newNavbar = prevState;
			newNavbar[newCurrIndex].isCurrent = true;
			return newNavbar;
		});
	};
	return (
		<nav className={`${styles['navbar']} brownBurgundyBackground`}>
			{navItems.map((navItem) => {
				return (
					<NavItem
						name={navItem.name}
						id={navItem.indexNumber}
						key={navItem.indexNumber}
						setPageIndex={setPageIndex}
						isCurrent={navItem.isCurrent}
						setCurrentNav={setCurrentNav}
						resetPrevious={resetPrevious}
					/>
				);
			})}
		</nav>
	);
};

const NavItem = ({ name, id, setPageIndex, isCurrent, resetPrevious }) => {
	const handleClick = React.useCallback(
		(e) => {
			resetPrevious(id);
			setPageIndex(() => {
				return Number(e.target.id);
			});
		},
		[ id, resetPrevious, setPageIndex ]
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
		<div id={id} className={`cursor ${isCurrent ? `whiteColor` : 'greenLightForestColor'}`}>
			{name}
		</div>
	);
};
