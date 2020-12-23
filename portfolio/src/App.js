import React from 'react';
import { useTransition } from 'react-spring';
import projectData from './data/projects.json';
import Portfolio from './pages/Portfolio.js';
import './styles/main.css';

const App = () => {
	const [ data, setData ] = React.useState([]);
	const [ index, setIndex ] = React.useState(0);
	console.log(index);
	const transitions = useTransition(index, (p) => p, {
		from: { opacity: 0, transform: 'translate3d(100%,0,0)', transitionDuration: '.45s' },
		enter: { opacity: 0, transform: 'translate3d(0%,0,0)', transitionDuration: '1.25s' },
		update: { opacity: 1, transform: 'translate3d(0%,0,0)', transitionDuration: '1.25s' },
		leave: { opacity: 0, transform: 'translate3d(-50%,0,0)', transitionDuration: '0s' }
	});
	const handleCardNextClick = React.useCallback(
		() => {
			setIndex((state) => {
				if (state === data.length - 1) {
					return 0;
				}
				else {
					return state + 1;
				}
			});
		},
		[ data ]
	);
	const handleCardPrevClick = React.useCallback(
		() => {
			setIndex((state) => {
				if (state === 0) {
					return data.length - 1;
				}
				else {
					return state - 1;
				}
			});
		},
		[ data ]
	);
	// Interfaces for next and previous
	// const next = () => {
	// 	if (index === data.length - 1) {
	// 		setIndex(0);
	// 	}
	// 	else {
	// 		setIndex((prevCounter) => prevCounter + 1);
	// 	}
	// 	console.log(index);
	// };

	// const previous = () => {
	// 	if (index === 0) {
	// 		setIndex(data.length - 1);
	// 	}
	// 	else {
	// 		setIndex((prevCounter) => prevCounter - 1);
	// 	}
	// 	console.log(index);
	// };

	React.useEffect(
		() => {
			setData(() => projectData);
		},
		[ data, index ]
	);
	// wait for data to be fetched before render
	while (true) {
		if (data !== undefined) {
			if (data[index] !== undefined) {
				break;
			}
		}
		return <h3>Loading...</h3>;
	}
	return (
		<div>
			<Portfolio
				projectData={data}
				index={index}
				transitions={transitions}
				next={handleCardNextClick}
				previous={handleCardPrevClick}
			/>
		</div>
	);
};
// };

export default App;
