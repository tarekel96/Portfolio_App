import React from 'react';
import styles from './Card.module.css';
export const Card = ({ id, title, imageSrc, imageAlt, header, subheader_1, subheader_2, subheader_3 }) => {
	return (
		<div className={styles['card']} id={id}>
			<img src={imageSrc} alt={imageAlt} className={styles['image']} />
			<div className={styles['container']}>
				<h4>
					<b>{title}</b>
				</h4>
				<h6>{header}</h6>
				<p>{subheader_1}</p>
				<p>{subheader_2}</p>
				<p>{subheader_3}</p>
			</div>
		</div>
	);
};
