import React from 'react';
import styles from './Section.module.css';

export const Section = ({ children, column = false, arrows = false, next, previous, onClick }) => {
	return (
		<section style={{ flexDirection: column ? 'column' : 'row' }} className={styles['sectionContainer']}>
			{arrows && <LeftArrow onClick={onClick} />}
			{children}
			{/* {arrows && <RightArrow onClick={next} />} */}
			{arrows && <RightArrow onClick={onClick} />}
		</section>
	);
};

const LeftArrow = ({ onClick }) => {
	return (
		<svg
			onClick={onClick}
			className={`flipX cursor ${styles['blue']}`}
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
			className={`cursor ${styles['blue']}`}
			xmlns="http://www.w3.org/2000/svg"
			width="48"
			height="48"
			viewBox="0 0 24 24"
		>
			<path d="M0 3.795l2.995-2.98 11.132 11.185-11.132 11.186-2.995-2.981 8.167-8.205-8.167-8.205zm18.04 8.205l-8.167 8.205 2.995 2.98 11.132-11.185-11.132-11.186-2.995 2.98 8.167 8.206z" />
		</svg>
	);
};
