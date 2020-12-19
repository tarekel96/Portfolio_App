import React from 'react';
import styles from './Card.module.css';
export const Card = ({
	id,
	title,
	imageSrc,
	imageAlt,
	header,
	subheader,
	url_1,
	url_2,
	url_1Title = 'Live Project Link',
	url_2Title = 'GitHub Link',
	next,
	previous
}) => {
	return (
		<div className={styles['card']} id={id}>
			<img src={imageSrc} alt={imageAlt} className={styles['image']} />
			<div className={styles['container']}>
				<b>
					<h2>{title}</h2>
				</b>

				<h4>{header}</h4>
				<p>{subheader}</p>
				<p>
					<a className={'cursor'} href={url_1}>
						{url_1Title}
					</a>
				</p>
				<p>
					<a className={'cursor'} href={url_2}>
						{url_2Title}
					</a>
				</p>
			</div>
		</div>
	);
};
