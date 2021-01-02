import React from 'react';
import PropTypes from 'prop-types';
import { Footer } from './Footer';
import styles from './Section.module.css';

export const Section = ({
	children,
	className,
	column = false,
	cardArrows = false,
	upArrow,
	downArrow,
	upAndDownArrows,
	next,
	previous,
	slideUp,
	slideDown,
	upArrowRef,
	downArrowRef,
	leftArrowRef,
	rightArrowRef,
	setPageIndex,
	pageIndex,
	navItems,
	setCurrentNav,
	resetPreviousNavItem,
	hasFooter
}) => {
	React.useEffect(
		() => {
			let isMounted = true;
			if (isMounted === false) return;
			let upHandler;
			let upNavHandler;
			let downHandler;
			let downNavHandler;
			let leftHandler;
			let rightHandler;
			if ((upArrow || upAndDownArrows) && upArrowRef !== null) {
				upNavHandler = setInterval(
					upArrowRef.current.addEventListener('click', () => resetPreviousNavItem(pageIndex)),
					500
				);
				upHandler = setInterval(upArrowRef.current.addEventListener('click', slideUp), 500);
			}
			if ((downArrow || upAndDownArrows) && downArrowRef !== null) {
				downNavHandler = setInterval(
					downArrowRef.current.addEventListener('click', () => resetPreviousNavItem(pageIndex)),
					500
				);
				downHandler = setInterval(downArrowRef.current.addEventListener('click', slideDown), 500);
			}
			if (cardArrows === true && rightArrowRef !== null && leftArrowRef !== null) {
				rightHandler = setInterval(rightArrowRef.current.addEventListener('click', next), 500);
				leftHandler = setInterval(leftArrowRef.current.addEventListener('click', previous), 500);
			}
			return () => {
				clearInterval(upNavHandler);
				clearInterval(upHandler);
				clearInterval(downNavHandler);
				clearInterval(downHandler);
				clearInterval(rightHandler);
				clearInterval(leftHandler);
				isMounted = false;
			};
		},
		[
			next,
			rightArrowRef,
			previous,
			leftArrowRef,
			slideUp,
			slideDown,
			upArrowRef,
			downArrowRef,
			pageIndex,
			resetPreviousNavItem,
			downArrow,
			upArrow,
			upAndDownArrows,
			cardArrows
		]
	);
	return (
		<div className={className !== undefined ? className : null}>
			{upArrow || upAndDownArrows ? (
				<section className={`${styles['upArrowContainer']}`}>
					<UpArrow onClick={slideUp} upArrowRef={upArrowRef} />
				</section>
			) : null}
			<section style={{ flexDirection: column ? 'column' : 'row' }} className={styles['sectionContainer']}>
				{cardArrows && <LeftArrow leftArrowRef={leftArrowRef} onClick={previous} />}
				{children}
				{cardArrows && <RightArrow rightArrowRef={rightArrowRef} onClick={next} />}
			</section>
			{downArrow || upAndDownArrows ? (
				<section className={`${styles['downArrowContainer']}`}>
					<DownArrow onClick={slideDown} downArrowRef={downArrowRef} />
				</section>
			) : null}
			{hasFooter && <Footer />}
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

const LeftArrow = ({ leftArrowRef }) => {
	return (
		<svg
			ref={leftArrowRef}
			className={`flipX cursor blackCharcoalFill`}
			xmlns="http://www.w3.org/2000/svg"
			width="48"
			height="48"
			viewBox="0 0 24 24"
		>
			<path d="M0 3.795l2.995-2.98 11.132 11.185-11.132 11.186-2.995-2.981 8.167-8.205-8.167-8.205zm18.04 8.205l-8.167 8.205 2.995 2.98 11.132-11.185-11.132-11.186-2.995 2.98 8.167 8.206z" />
		</svg>
	);
};
LeftArrow.propTypes = {
	leftArrowRef: PropTypes.object
};

const UpArrow = ({ upArrowRef }) => {
	return (
		<svg
			className={`flipXHalf cursor blackCharcoalFill`}
			xmlns="http://www.w3.org/2000/svg"
			width="48"
			height="48"
			viewBox="0 0 24 24"
			ref={upArrowRef}
		>
			<path d="M0 3.795l2.995-2.98 11.132 11.185-11.132 11.186-2.995-2.981 8.167-8.205-8.167-8.205zm18.04 8.205l-8.167 8.205 2.995 2.98 11.132-11.185-11.132-11.186-2.995 2.98 8.167 8.206z" />
		</svg>
	);
};
UpArrow.propTypes = {
	onClick: PropTypes.func,
	upArrowRef: PropTypes.object
};

const RightArrow = ({ onClick, rightArrowRef }) => {
	return (
		<svg
			ref={rightArrowRef}
			className={`cursor blackCharcoalFill`}
			xmlns="http://www.w3.org/2000/svg"
			width="48"
			height="48"
			viewBox="0 0 24 24"
		>
			<path d="M0 3.795l2.995-2.98 11.132 11.185-11.132 11.186-2.995-2.981 8.167-8.205-8.167-8.205zm18.04 8.205l-8.167 8.205 2.995 2.98 11.132-11.185-11.132-11.186-2.995 2.98 8.167 8.206z" />
		</svg>
	);
};
RightArrow.propTypes = {
	rightArrowRef: PropTypes.object
};

const DownArrow = ({ onClick, downArrowRef }) => {
	return (
		<svg
			className={`flipXOneAndHalf cursor blackCharcoalFill`}
			xmlns="http://www.w3.org/2000/svg"
			width="48"
			height="48"
			viewBox="0 0 24 24"
			ref={downArrowRef}
		>
			<path d="M0 3.795l2.995-2.98 11.132 11.185-11.132 11.186-2.995-2.981 8.167-8.205-8.167-8.205zm18.04 8.205l-8.167 8.205 2.995 2.98 11.132-11.185-11.132-11.186-2.995 2.98 8.167 8.206z" />
		</svg>
	);
};
DownArrow.propTypes = {
	onClick: PropTypes.func,
	downArrowRef: PropTypes.object
};
