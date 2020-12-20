import React from 'react';
import { animated } from 'react-spring';
import styles from './Card.module.css';
export const Card = ({
	id,
	title,
	imageSrc,
	imageAlt,
	header,
	key,
	subheader,
	style,
	url_1,
	url_2,
	url_1Title = 'Live Project Link',
	url_2Title = 'GitHub Link'
}) => {
	return (
		<animated.div style={style} className={`${styles['card']} tanBrownBackground`} id={id} key={key}>
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
		</animated.div>
	);
};
