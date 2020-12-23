import React from 'react';
import { useTransition } from 'react-spring';
import projectData from './data/projects.json';
import { Section } from './components/Section.js';
import { Card } from './components/Card.js';
import './styles/main.css';

const App = () => {
	const [ data, setData ] = React.useState([]);
	const [ index, setIndex ] = React.useState(0);

	const transitions = useTransition(index, (p) => p, {
		from: { opacity: 0, transform: 'translate3d(100%,0,0)', transitionDuration: '.45s' },
		enter: { opacity: 0, transform: 'translate3d(0%,0,0)', transitionDuration: '1.25s' },
		update: { opacity: 1, transform: 'translate3d(0%,0,0)', transitionDuration: '1.25s' },
		leave: { opacity: 0, transform: 'translate3d(-50%,0,0)', transitionDuration: '0s' }
	});
	const handleClick = React.useCallback(
		() => {
			setIndex((state) => {
				if (state === 0) {
					return data.length - 1;
				}
				else {
					return (state + 1) % (data.length - 1);
				}
			});
		},
		[ data ]
	);
	const next = () => {
		if (index === data.length - 1) {
			setIndex(0);
		}
		else {
			setIndex((prevCounter) => prevCounter + 1);
		}
		console.log(index);
	};

	const previous = () => {
		if (index === 0) {
			setIndex(data.length - 1);
		}
		else {
			setIndex((prevCounter) => prevCounter - 1);
		}
		console.log(index);
	};

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
			<Section cardArrows={true} next={next} downArrow={true} previous={previous} onClick={handleClick}>
				{transitions.map(({ props, key }) => {
					return (
						<Card
							style={props}
							key={key}
							id={data[index].id}
							title={data[index].name}
							imageSrc={'assets/images/' + data[index].imageSrc}
							imageAlt={'project ' + String(index)}
							header={data[index].objective}
							subheader_1={data[index].url}
							subheader_2={data[index].githubUrl}
							subheader_3={data[index].technologiesUsed}
						/>
					);
				})}
			</Section>
		</div>
	);
};
// };

export default App;
