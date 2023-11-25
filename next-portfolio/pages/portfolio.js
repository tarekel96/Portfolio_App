// import packages
import { useState } from 'react';
import { styled } from '@mui/system';
// import components
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { motion } from 'framer-motion';
// import local components
import { Card } from '../components/Card';
import { Wheel } from '../components/Wheel';
// import helpers
import { convertToArray } from '../lib/helpers';
// import data
import webDevProjects from '../lib/web_dev_projects.json';
import sweProjects from '../lib/swe_projects.json';
import mlProjects from '../lib/ml_stats_projects.json';
import deAnalytics from '../lib/data_eng_analytics.json';

const menuOptions = [
	{ label: 'Machine Learning & Statistical Modeling', active: true },
	{ label: 'Data Engineering', active: false },
	{ label: 'Software Engineering', active: false },
	{ label: 'Web Development', active: false }
];

const CarouselWrapper = styled('section')(({ theme }) => ({
	height: '100%',
	paddingTop: '2%'
}));

const Menu = styled('div')(({ theme }) => ({
	backgroundColor: theme.palette.background.default,
	color: theme.palette.text.secondary,
	display: 'flex',
	justifyContent: 'center',
	width: '100%'
}));

const MenuStack = styled(Stack)(({ theme }) => ({}));

const MenuOption = styled(Chip)(({ theme }) => ({
	color: theme.palette.text.secondary,
	padding: '1rem 2rem',
	fontWeight: 'bold',
	'&:hover': {
		boxShadow: '6px 6px 6px #666',
		cursor: 'pointer'
	}
}));

const Instructions = styled('article')(({ theme }) => ({
	color: theme.palette.text.secondary,
	textAlign: 'center',
	fontWeight: 'bold',
	fontSize: 'large',
	margin: '0.5% auto'
}));
const CardWrapper = styled(motion.div)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'center',
	margin: '0 auto'
}));

const Portfolio = () => {
	const [ options, setOptions ] = useState(menuOptions);
	const [ currentWheel, setWheel ] = useState('Machine Learning & Statistical Modeling');

	const handleClick = (event, label) => {
		let currentOptions = [ ...options ];
		for (let i = 0; i < currentOptions.length; ++i) {
			if (currentOptions[i].label === label) {
				currentOptions[i].active = true;
			}
			else {
				currentOptions[i].active = false;
			}
		}
		setWheel(label);
		setOptions(currentOptions);
	};

	const DS_ML_Wheel = () => (
		<Wheel>
			{mlProjects.map(({ name, githubUrl, objective, modelsAndConcepts, id }) => (
				<CardWrapper>
					<Card
						key={`DS/ML Project #${id}`}
						id={id}
						title={name}
						content={objective}
						tags={convertToArray(modelsAndConcepts)}
						url_2={githubUrl}
						webDev={false}
					/>
				</CardWrapper>
			))}
		</Wheel>
	);

	const DE_Wheel = () => (
		<Wheel>
			{deAnalytics.map(({ name, githubUrl, objective, technologiesUsed, id }) => (
				<CardWrapper>
					<Card
						key={`DL Project #${id}`}
						id={id}
						title={name}
						content={objective}
						tags={convertToArray(technologiesUsed)}
						url_2={githubUrl}
						webDev={false}
					/>
				</CardWrapper>
			))}
		</Wheel>
	);

	const SWE_Wheel = () => (
		<Wheel>
			{sweProjects.map(({ name, githubUrl, objective, technologiesUsed, id }) => (
				<CardWrapper>
					<Card
						key={`SWE Project #${id}`}
						id={id}
						title={name}
						content={objective}
						tags={convertToArray(technologiesUsed)}
						url_2={githubUrl}
						webDev={false}
					/>
				</CardWrapper>
			))}
		</Wheel>
	);

	const WebDevWheel = () => (
		<Wheel>
			{webDevProjects.map(({ name, url, githubUrl, imageSrc, objective, technologiesUsed, id }) => (
				<CardWrapper>
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
				</CardWrapper>
			))}
		</Wheel>
	);

	return (
		<CarouselWrapper>
			<Menu>
				<MenuStack direction="row" spacing={1}>
					{options.map(({ label, active }) => (
						<MenuOption
							key={label}
							label={label}
							variant={active ? 'outlined' : 'filled'}
							onClick={(e) => handleClick(e, label)}
						/>
					))}
				</MenuStack>
			</Menu>
			<Instructions>** Slide/drag cards to the left with mouse to view more cards. **</Instructions>
			{currentWheel === 'Machine Learning & Statistical Modeling' && <DS_ML_Wheel />}
			{currentWheel === 'Data Engineering' && <DE_Wheel />}
			{currentWheel === 'Software Engineering' && <SWE_Wheel />}
			{currentWheel === 'Web Development' && <WebDevWheel />}
		</CarouselWrapper>
	);
};

export default Portfolio;
