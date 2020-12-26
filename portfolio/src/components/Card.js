import React from 'react';
import { animated } from 'react-spring';
import styles from './Card.module.css';
export const Card = ({
	id,
	title,
	imageSrc,
	imageAlt,
	content,
	style,
	url_1,
	url_2,
	url_1Title = 'Live Project Link',
	url_2Title = 'GitHub Link',
	tags
}) => {
	return (
		<animated.div style={style} className={`${styles['card']} tanBrownBackground`} id={id}>
			<img src={imageSrc} alt={imageAlt} className={styles['image']} />
			<div className={styles['container']}>
				<b>
					<h2>{title}</h2>
				</b>
				<hr />
				<p>{content}</p>
				{url_1 !== 'N/A' ? (
					<p>
						<a className={'cursor'} href={url_1} target="_blank" rel="noreferrer">
							{url_1Title}
						</a>
					</p>
				) : null}
				{url_2 !== 'N/A' ? (
					<p>
						<a className={'cursor'} href={url_2} target="_blank" rel="noreferrer">
							{url_2Title}
						</a>
					</p>
				) : null}
				<h3>Technologies Used: </h3>
				<p>
					{tags.map((tag, tagIndex) => {
						return <Tag content={tag} key={tagIndex} />;
					})}
				</p>
			</div>
		</animated.div>
	);
};

const Tag = ({ content }) => {
	return <span className={`${styles['tag']} brownBurgundyBackground greenLightForestColor`}>{content}</span>;
};
