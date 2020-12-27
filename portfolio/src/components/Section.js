import React from 'react';
import PropTypes from 'prop-types';
import styles from './Section.module.css';

export const Section = ({
	children,
	column = false,
	cardArrows = false,
	upArrow,
	downArrow,
	upAndDownArrows,
	next,
	previous,
	slideUp,
	slideDown
}) => {
	return (
		<div>
			{upArrow || upAndDownArrows ? (
				<section className={`${styles['upArrowContainer']}`}>
					<UpArrow onClick={slideUp} />
				</section>
			) : null}
			<section style={{ flexDirection: column ? 'column' : 'row' }} className={styles['sectionContainer']}>
				{cardArrows && <LeftArrow onClick={previous} />}
				{children}
				{cardArrows && <RightArrow onClick={next} />}
			</section>
			{downArrow || upAndDownArrows ? (
				<section className={`${styles['downArrowContainer']}`}>
					<DownArrow onClick={slideDown} />
				</section>
			) : null}
		</div>
	);
};
Section.propTypes = {
	children: PropTypes.any,
	column: PropTypes.bool,
	cardArrows: PropTypes.bool,
	upArrow: PropTypes.bool,
	downArrow: PropTypes.bool,
	upAndDownArrows: PropTypes.bool,
	next: PropTypes.func,
	previous: PropTypes.func,
	slideUp: PropTypes.func,
	slideDown: PropTypes.func
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
LeftArrow.propTypes = {
	onClick: PropTypes.func
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
UpArrow.propTypes = {
	onClick: PropTypes.func
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
RightArrow.propTypes = {
	onClick: PropTypes.func
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
DownArrow.propTypes = {
	onClick: PropTypes.func
};
