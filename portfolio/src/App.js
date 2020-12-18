import React from 'react';
import projectData from './data/projects.json';
import { Section } from './components/Section.js';
import { Card } from './components/Card.js';
import './styles/main.css';

const App = () => {
	const [ data, setData ] = React.useState([]);
	React.useEffect(
		() => {
			setData(() => setData(projectData));
			console.log(data);
		},
		[ data ]
	);

	if (data === undefined) return <h3>Loading...</h3>;
	else
		return (
			<div className="mainContainer">
				<Section column={true}>
					{data.map((project, index) => {
						const { name, url, githubUrl, imageSrc, objective, technologiesUsed } = project;
						return (
							<Card
								id={index}
								title={name}
								imageSrc={'assets/images/' + imageSrc}
								imageAlt={'project ' + String(index)}
								header={objective}
								subheader_1={url}
								subheader_2={githubUrl}
								subheader_3={technologiesUsed}
							/>
						);
					})}
				</Section>
			</div>
		);
};

export default App;
