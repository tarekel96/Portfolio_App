import { styled } from '@mui/system';
import { Card } from '../components/Card';
import webDevProjects from '../lib/web_dev_projects.json';

console.log(webDevProjects);

const TempSection = styled('section')(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center'
}));

const Portfolio = () => {
	const convertToArray = (stringVar) => {
		let type = typeof stringVar;
		if (type !== 'string') {
			return new Error(`Expected a string for ${stringVar} and instead received ${type}`);
		}
		let newArray = stringVar.split(',');
		return newArray;
	};
	return (
		<h1>
			Portfolio
			<TempSection>
				{webDevProjects.map(({ name, url, githubUrl, imageSrc, objective, technologiesUsed, id }) => (
					<Card
						key={`Web Dev Project #${id}`}
						id={id}
						title={name}
						imageSrc={`assets/images/webDevProjects/${imageSrc}`}
						imageAlt={name + ' ' + imageSrc}
						content={objective}
						tags={convertToArray(technologiesUsed)}
						url_1={url}
						url_2={githubUrl}
						webDev={true}
					/>
				))}
			</TempSection>
		</h1>
	);
};

export default Portfolio;
