import React from 'react';
import PropTypes from 'prop-types';
import styles from './Card.module.css';
export const Card = ({
	id,
	item,
	title,
	imageSrc,
	imageAlt,
	content,
	style,
	url_1,
	url_2,
	url_1Title = 'Live Project Link',
	url_2Title = 'GitHub Link',
	tags,
	webDev = true
}) => {
	return (
		<div style={style} className={`${webDev ? styles['card'] : styles['cardNoImg']} blackEbonyBackground`} id={id}>
			{webDev ? <img src={imageSrc} alt={imageAlt} className={styles['image']} /> : null}
			<div className={styles['container']}>
				<b>
					<h2>{title}</h2>
				</b>
				<hr />
				<p>{content}</p>
				{url_1 !== 'N/A' && webDev === true ? (
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
		</div>
	);
};
Card.propTypes = {
	id: PropTypes.number,
	title: PropTypes.string,
	imageSrc: PropTypes.string,
	imageAlt: PropTypes.string,
	content: PropTypes.string,
	style: PropTypes.object,
	url_1: PropTypes.string,
	url_2: PropTypes.string,
	url_1Title: PropTypes.string,
	url_2Title: PropTypes.string,
	tags: PropTypes.array
};

const Tag = ({ content }) => {
	return <span className={`${styles['tag']} greyLightBackground`}>{content}</span>;
};
Tag.propTypes = {
	content: PropTypes.string
};
