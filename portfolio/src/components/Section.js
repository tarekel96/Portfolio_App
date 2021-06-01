import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Footer } from './Footer';
import styles from './Section.module.css';

export const Section = ({
	children,
	className = '',
	column = false,
	cardArrows = false,
	upArrow,
	downArrow,
	upAndDownArrows,
	handleCardNextClick,
	handleCardPrevClick,
	slideUp,
	slideDown,
	upArrowRef,
	downArrowRef,
	leftArrowRef,
	rightArrowRef,
	pageIndex,
	resetPrevNavItem,
	hasFooter,
	projectData,
	setProjectIndex,
	projectType,
	TYPES,
	setWebDevCommand,
	SWEData,
	setSWECardIndex,
	setSWECommand
}) => {
	const { WEB_DEV, GEN_SWE } = TYPES;
	useEffect(
		() => {
			let isMounted = true;
			if (isMounted === false) return;
			let upHandler;
			let upNavHandler;
			let downHandler;
			let downNavHandler;
			let newPageIndex;
			if ((upArrow || upAndDownArrows) && upArrowRef !== null) {
				if (pageIndex === 0) {
					newPageIndex = 2;
				}
				else {
					newPageIndex = pageIndex - 1;
				}
				upNavHandler = setInterval(
					upArrowRef.current.addEventListener('click', () => resetPrevNavItem(newPageIndex)),
					500
				);
				upHandler = setInterval(upArrowRef.current.addEventListener('click', slideUp), 2000);
			}
			if ((downArrow || upAndDownArrows) && downArrowRef !== null) {
				if (pageIndex === 2) {
					newPageIndex = 0;
				}
				else {
					newPageIndex = pageIndex + 1;
				}
				downNavHandler = setInterval(
					downArrowRef.current.addEventListener('click', () => resetPrevNavItem(newPageIndex)),
					500
				);
				downHandler = setInterval(downArrowRef.current.addEventListener('click', slideDown), 500);
			}
			return () => {
				clearInterval(upNavHandler);
				clearInterval(upHandler);
				clearInterval(downNavHandler);
				clearInterval(downHandler);
				isMounted = false;
			};
		},
		[
			handleCardNextClick,
			handleCardPrevClick,
			projectData,
			setProjectIndex,
			setWebDevCommand,
			rightArrowRef,
			leftArrowRef,
			slideUp,
			slideDown,
			upArrowRef,
			downArrowRef,
			pageIndex,
			resetPrevNavItem,
			downArrow,
			upArrow,
			upAndDownArrows,
			cardArrows,
			projectType,
			WEB_DEV,
			GEN_SWE,
			SWEData,
			setSWECardIndex,
			setSWECommand
		]
	);
	return (
		<div className={className}>
			{upArrow || upAndDownArrows ? (
				<section className={`${styles['upArrowContainer']}`}>
					<UpArrow upArrowRef={upArrowRef} />
				</section>
			) : (
				<UpArrow hide={true} upArrowRef={upArrowRef} />
			)}
			<section style={{ flexDirection: column ? 'column' : 'row' }} className={styles['sectionContainer']}>
				{cardArrows ? (
					<LeftArrow
						leftArrowRef={leftArrowRef}
						onClick={() => {
							if (projectType === WEB_DEV) {
								handleCardPrevClick(projectData, setWebDevCommand, setProjectIndex);
							}
							else {
								handleCardPrevClick(SWEData, setSWECommand, setSWECardIndex);
							}
						}}
					/>
				) : (
					<LeftArrow hide={true} leftArrowRef={leftArrowRef} />
				)}
				{children}
				{cardArrows ? (
					<RightArrow
						rightArrowRef={rightArrowRef}
						onClick={() => {
							if (projectType === WEB_DEV) {
								handleCardNextClick(projectData, setWebDevCommand, setProjectIndex);
							}
							else {
								handleCardNextClick(SWEData, setSWECommand, setSWECardIndex);
							}
						}}
					/>
				) : (
					<RightArrow hide={true} rightArrowRef={rightArrowRef} />
				)}
			</section>
			{downArrow || upAndDownArrows ? (
				<section className={`${styles['downArrowContainer']}`}>
					<DownArrow downArrowRef={downArrowRef} />
				</section>
			) : (
				<DownArrow hide={true} downArrowRef={downArrowRef} />
			)}
			{hasFooter && (
				<Footer
					gitHubUrl="https://github.com/tarekel96"
					linkedInUrl="https://www.linkedin.com/in/tarek-e-0a2b1a132/"
				/>
			)}
		</div>
	);
};
Section.propTypes = {
	children: PropTypes.any,
	className: PropTypes.string,
	column: PropTypes.bool,
	cardArrows: PropTypes.bool,
	upArrow: PropTypes.bool,
	downArrow: PropTypes.bool,
	upAndDownArrows: PropTypes.bool,
	next: PropTypes.func,
	previous: PropTypes.func,
	slideUp: PropTypes.func,
	slideDown: PropTypes.func,
	upArrowRef: PropTypes.object,
	downArrowRef: PropTypes.object,
	leftArrowRef: PropTypes.object,
	rightArrowRef: PropTypes.object
};

const LeftArrow = ({ leftArrowRef, hide = false, onClick }) => {
	return (
		<svg
			onClick={onClick}
			ref={leftArrowRef}
			className={`flipX cursor blackCharcoalFill ${styles['arrowIcons']}`}
			xmlns="http://www.w3.org/2000/svg"
			width="48"
			height="48"
			viewBox="0 0 24 24"
			style={{ visibility: hide === true ? 'hidden' : 'visible' }}
		>
			<path d="M0 3.795l2.995-2.98 11.132 11.185-11.132 11.186-2.995-2.981 8.167-8.205-8.167-8.205zm18.04 8.205l-8.167 8.205 2.995 2.98 11.132-11.185-11.132-11.186-2.995 2.98 8.167 8.206z" />
		</svg>
	);
};
LeftArrow.propTypes = {
	leftArrowRef: PropTypes.object
};

const UpArrow = ({ upArrowRef, hide = false }) => {
	return (
		<svg
			className={`flipXHalf cursor blackCharcoalFill ${styles['arrowIcons']}`}
			xmlns="http://www.w3.org/2000/svg"
			width="48"
			height="48"
			viewBox="0 0 24 24"
			ref={upArrowRef}
			style={{ visibility: hide === true ? 'hidden' : 'visible' }}
		>
			<path d="M0 3.795l2.995-2.98 11.132 11.185-11.132 11.186-2.995-2.981 8.167-8.205-8.167-8.205zm18.04 8.205l-8.167 8.205 2.995 2.98 11.132-11.185-11.132-11.186-2.995 2.98 8.167 8.206z" />
		</svg>
	);
};
UpArrow.propTypes = {
	onClick: PropTypes.func,
	upArrowRef: PropTypes.object
};

const RightArrow = ({ onClick, rightArrowRef, hide = false }) => {
	return (
		<svg
			ref={rightArrowRef}
			onClick={onClick}
			className={`cursor blackCharcoalFill ${styles['arrowIcons']}`}
			xmlns="http://www.w3.org/2000/svg"
			width="48"
			height="48"
			viewBox="0 0 24 24"
			style={{ visibility: hide === true ? 'hidden' : 'visible' }}
		>
			<path d="M0 3.795l2.995-2.98 11.132 11.185-11.132 11.186-2.995-2.981 8.167-8.205-8.167-8.205zm18.04 8.205l-8.167 8.205 2.995 2.98 11.132-11.185-11.132-11.186-2.995 2.98 8.167 8.206z" />
		</svg>
	);
};
RightArrow.propTypes = {
	rightArrowRef: PropTypes.object
};

const DownArrow = ({ onClick, downArrowRef, hide = false }) => {
	return (
		<svg
			className={`flipXOneAndHalf cursor blackCharcoalFill ${styles['arrowIcons']}`}
			xmlns="http://www.w3.org/2000/svg"
			width="48"
			height="48"
			viewBox="0 0 24 24"
			ref={downArrowRef}
			style={{ visibility: hide === true ? 'hidden' : 'visible' }}
		>
			<path d="M0 3.795l2.995-2.98 11.132 11.185-11.132 11.186-2.995-2.981 8.167-8.205-8.167-8.205zm18.04 8.205l-8.167 8.205 2.995 2.98 11.132-11.185-11.132-11.186-2.995 2.98 8.167 8.206z" />
		</svg>
	);
};
DownArrow.propTypes = {
	onClick: PropTypes.func,
	downArrowRef: PropTypes.object
};
