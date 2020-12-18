import React from 'react';
import styles from './Section.module.css';

export const Section = ({ children, column = false }) => {
	return (
		<section style={{ flexDirection: column ? 'column' : 'row' }} className={styles['sectionContainer']}>
			{children}
		</section>
	);
};
