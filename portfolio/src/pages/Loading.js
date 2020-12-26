import React from 'react';
import styles from './Loading.module.css';

const Loading = () => {
	return (
		<div className={`${styles['loadingContainer']}`}>
			<h1>Loading</h1>
			<img src={'assets/gifs/loading.gif'} alt="Loading..." />
		</div>
	);
};

export default Loading;
