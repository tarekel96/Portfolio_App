import React from 'react';
import projectData from './data/projects.json';
import { Section } from './components/Section.js';
import { Card } from './components/Card.js';
import './styles/main.css';

const App = () => {
	const [ data, setData ] = React.useState([]);
	const [ index, setIndex ] = React.useState(0);

	const next = () => {
		if (index === data.length - 1) {
			setIndex(0);
		} else {
			setIndex((prevCounter) => prevCounter + 1);
		}
		console.log(index);
	};

	const previous = () => {
		if (index === 0) {
			setIndex(data.length - 1);
		} else {
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
			<Section arrows={true} next={next} previous={previous}>
				{
					<Card
						id={data[index].id}
						title={data[index].name}
						imageSrc={'assets/images/' + data[index].imageSrc}
						imageAlt={'project ' + String(index)}
						header={data[index].objective}
						subheader_1={data[index].url}
						subheader_2={data[index].githubUrl}
						subheader_3={data[index].technologiesUsed}
					/>
				}
			</Section>
		</div>
	);
};
// };

export default App;
