import { styled } from '@mui/system';
import { motion } from 'framer-motion';
import { Card } from '../components/Card';
import { Wheel } from '../components/Wheel';
import webDevProjects from '../lib/web_dev_projects.json';

const CarouselWrapper = styled('section')(({ theme }) => ({
	height: '100%'
}));

const CardWrapper = styled(motion.div)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'center',
	margin: '0 auto'
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
		<CarouselWrapper>
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
		</CarouselWrapper>
	);
};

export default Portfolio;
