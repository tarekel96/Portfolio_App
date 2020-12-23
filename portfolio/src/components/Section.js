import React from 'react';
import styles from './Section.module.css';

export const Section = ({
	children,
	column = false,
	cardArrows = false,
	upArrow,
	downArrow,
	upAndDownArrows,
	next,
	previous
}) => {
	return (
		<div>
			<section className={`${styles['upArrowContainer']}`}>
				{upArrow || upAndDownArrows ? <UpArrow /> : null}
			</section>
			<section style={{ flexDirection: column ? 'column' : 'row' }} className={styles['sectionContainer']}>
				{cardArrows && <LeftArrow onClick={previous} />}
				{children}
				{cardArrows && <RightArrow onClick={next} />}
			</section>
			<section className={`${styles['downArrowContainer']}`}>
				{downArrow || upAndDownArrows ? <DownArrow /> : null}
			</section>
		</div>
	);
};

const LeftArrow = ({ onClick }) => {
	return (
		<svg
			onClick={onClick}
			className={`flipX cursor orangeRedFill`}
			xmlns="http://www.w3.org/2000/svg"
			width="48"
			height="48"
			viewBox="0 0 24 24"
		>
			<path d="M0 3.795l2.995-2.98 11.132 11.185-11.132 11.186-2.995-2.981 8.167-8.205-8.167-8.205zm18.04 8.205l-8.167 8.205 2.995 2.98 11.132-11.185-11.132-11.186-2.995 2.98 8.167 8.206z" />
		</svg>
	);
};

const UpArrow = ({ onClick }) => {
	return (
		<svg
			onClick={onClick}
			className={`flipXHalf cursor orangeRedFill`}
			xmlns="http://www.w3.org/2000/svg"
			width="48"
			height="48"
			viewBox="0 0 24 24"
		>
			<path d="M0 3.795l2.995-2.98 11.132 11.185-11.132 11.186-2.995-2.981 8.167-8.205-8.167-8.205zm18.04 8.205l-8.167 8.205 2.995 2.98 11.132-11.185-11.132-11.186-2.995 2.98 8.167 8.206z" />
		</svg>
	);
};

const RightArrow = ({ onClick }) => {
	return (
		<svg
			onClick={onClick}
			className={`cursor orangeRedFill`}
			xmlns="http://www.w3.org/2000/svg"
			width="48"
			height="48"
			viewBox="0 0 24 24"
		>
			<path d="M0 3.795l2.995-2.98 11.132 11.185-11.132 11.186-2.995-2.981 8.167-8.205-8.167-8.205zm18.04 8.205l-8.167 8.205 2.995 2.98 11.132-11.185-11.132-11.186-2.995 2.98 8.167 8.206z" />
		</svg>
	);
};

const DownArrow = ({ onClick }) => {
	return (
		<svg
			onClick={onClick}
			className={`flipXOneAndHalf cursor orangeRedFill`}
			xmlns="http://www.w3.org/2000/svg"
			width="48"
			height="48"
			viewBox="0 0 24 24"
		>
			<path d="M0 3.795l2.995-2.98 11.132 11.185-11.132 11.186-2.995-2.981 8.167-8.205-8.167-8.205zm18.04 8.205l-8.167 8.205 2.995 2.98 11.132-11.185-11.132-11.186-2.995 2.98 8.167 8.206z" />
		</svg>
	);
};
