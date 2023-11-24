import { styled } from '@mui/system';
import { Fragment } from 'react';
import React from 'react';
import resumeData from '../lib/resume.json';
import { convertToArray } from '../lib/helpers';

Object.entries(resumeData.skillsMap_1).forEach(([ category, values ]) => {
	console.log(category, values);
});

const LayoutWrapper = styled('div')(({ theme }) => ({
	display: 'flex',
	justifyContent: 'space-around',
	alignItems: 'center',
	margin: '0 5%'
}));
const ResumeSection = styled('section')(({ theme }) => ({
	backgroundColor: theme.palette.background.secondary,
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-evenly',
	width: '100%',
	height: '100%',
	margin: '2.5% auto',
	borderRadius: '5px',
	padding: '1rem'
}));

const SkillsEducationWrapper = styled('div')(({ theme }) => ({
	display: 'grid',
	gridTemplateColumns: 'repeat(2, 1fr)',
	gridAutoRows: '1fr',
	[theme.breakpoints.down(768)]: {
		display: 'block'
	}
}));

const TechnicalSkills = styled('section')(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'left',
	margin: '0 auto',
	width: '100%',
	maxWidth: '100%',
	[theme.breakpoints.down(768)]: {
		maxWidth: '90%'
	},
	[theme.breakpoints.down(600)]: {
		maxWidth: '375px'
	}
}));

const ListCenterContainer = styled('div')(({ theme }) => ({
	textAlign: 'center'
}));

const ListItemsContainer = styled('ul')(({ theme }) => ({
	display: 'inline-flex',
	flexDirection: 'column',
	textAlign: 'left'
}));

const Header = styled('header')(({ theme }) => ({
	textAlign: 'center',
	fontSize: '1.4rem',
	fontWeight: '700'
}));

const Subheader = styled('header')(({ theme }) => ({
	textAlign: 'center',
	fontSize: '1.2rem',
	fontWeight: '600'
}));

const TechSubContainer = styled('div')(({ theme }) => ({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	width: '90%',
	[theme.breakpoints.down(768)]: {
		display: 'block'
	}
}));

const CertificationsContainer = styled('div')(({ theme }) => ({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	[theme.breakpoints.down(768)]: {
		display: 'block'
	}
}));

const EducationSection = styled('section')(({ theme }) => ({
	margin: '0 auto',
	width: '100%',
	maxWidth: '100%',
	[theme.breakpoints.down(768)]: {
		maxWidth: '90%'
	},
	[theme.breakpoints.down(600)]: {
		maxWidth: '375px'
	}
}));

const EducationTitle = styled('div')(({ theme }) => ({
	display: 'inline-flex',
	flexDirection: 'row',
	justifyContent: 'space-between'
}));

const EducationDiv = styled('div')(({ theme }) => ({
	padding: '0',
	margin: '0',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center'
}));

const PaddingSubContainer = styled('div')(({ theme }) => ({
	padding: '1%'
}));

const EducationList = styled('ul')(({ theme }) => ({
	marginTop: '0.40rem',
	marginBottom: '0.40rem'
}));

const ExperienceSection = styled('section')(({ theme }) => ({
	margin: '0 auto',
	width: '100%',
	maxWidth: '100%',
	[theme.breakpoints.down(768)]: {
		maxWidth: '90%'
	},
	[theme.breakpoints.down(600)]: {
		maxWidth: '375px'
	}
}));

const ExperienceDiv = styled('div')(({ theme }) => ({
	padding: '0',
	margin: '0',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center'
}));

const ExperiencePosition = styled('p')(({ theme }) => ({
	padding: '0',
	margin: '0',
	fontWeight: 'bold'
}));

const ExperienceTitle = styled('div')(({ theme }) => ({
	display: 'inline-flex',
	flexDirection: 'row',
	justifyContent: 'space-between'
}));

const ResearchSection = styled('section')(({ theme }) => ({
	margin: '0 auto',
	width: '100%',
	maxWidth: '100%',
	[theme.breakpoints.down(768)]: {
		maxWidth: '90%'
	},
	[theme.breakpoints.down(600)]: {
		maxWidth: '375px'
	}
}));

const BoldSpan = styled('span')(({ theme }) => ({
	fontWeight: 'bold'
}));

const BoldArticle = styled('article')(({ theme }) => ({
	fontWeight: 'bold'
}));

const Resume = () => {
	const getThirdArrLength = (arr) => {
		return Math.round(arr.length / 3);
	};
	const convertToArray = (stringVar) => {
		let type = typeof stringVar;
		if (type !== 'string') {
			return new Error(`Expected a string for ${stringVar} and instead received ${type}`);
		}
		let newArray = stringVar.split(',');
		return newArray;
	};

	return (
		<LayoutWrapper>
			<ResumeSection>
				<TechnicalSkills>
					<Header>Technical Skills</Header>
					<hr style={{ width: '100%' }} />
					<ListItemsContainer>
						{Object.entries(resumeData.skillsMap_1).map(([ category, values ], index) => (
							<li key={index}>
								{category}: {values}
							</li>
						))}
					</ListItemsContainer>
				</TechnicalSkills>
				<EducationSection>
					<Header>Education</Header>
					<hr style={{ width: '100%' }} />
					<PaddingSubContainer>
						{resumeData.educations.map(({ name, id, duration, degreeType, gpa, specialAwards }) => (
							<Education
								key={id}
								name={name}
								duration={duration}
								degreeType={degreeType}
								gpa={gpa}
								specialAwards={specialAwards}
							/>
						))}
					</PaddingSubContainer>
				</EducationSection>
				<ExperienceSection>
					<Header>Experiences</Header>
					<hr style={{ width: '100%' }} />
					<PaddingSubContainer>
						{resumeData.experiences.map(({ companyName, id, location, duration, position, roles }) => (
							<Experience
								key={id}
								companyName={companyName}
								location={location}
								position={position}
								duration={duration}
								roles={roles}
							/>
						))}
					</PaddingSubContainer>
				</ExperienceSection>
				<ResearchSection>
					<Header>Research</Header>
					<hr style={{ width: '100%' }} />
					<PaddingSubContainer>
						{resumeData.research.map(({ companyName, id, location, duration, position, roles }) => (
							<Experience
								key={id}
								companyName={companyName}
								location={location}
								position={position}
								duration={duration}
								roles={roles}
							/>
						))}
					</PaddingSubContainer>
				</ResearchSection>
				<hr style={{ width: '100%' }} />
			</ResumeSection>
		</LayoutWrapper>
	);
};

const Education = ({ name, duration, degreeType, gpa, specialAwards }) => {
	return (
		<EducationDiv>
			<EducationTitle>
				<article>{name}</article> <article>{duration}</article>
			</EducationTitle>
			<EducationList>
				<li
					style={{
						listStyleType: gpa !== 'n/a' && 'none'
					}}
				>
					{degreeType}
				</li>
				<li
					style={{
						display: gpa !== 'n/a' ? 'block' : 'none',
						listStyleType: gpa !== 'n/a' && 'none'
					}}
				>
					GPA: {gpa}
				</li>
				<li
					style={{
						display: specialAwards.length !== 0 ? 'block' : 'none',
						listStyleType: specialAwards.length !== 0 && 'none'
					}}
				>
					Awards:{' '}
					<ul>
						{specialAwards.map((award, index) => (
							<li key={`Award ${index}`} style={{ listStyleType: 'square' }}>
								{award}
							</li>
						))}
					</ul>
				</li>
			</EducationList>
		</EducationDiv>
	);
};

const Experience = ({ companyName, location, duration, position, roles }) => {
	return (
		<ExperienceDiv>
			<ExperienceTitle>
				<article>
					{companyName}, {location}
				</article>
				<article>
					<b>{duration}</b>
				</article>
			</ExperienceTitle>
			<ExperiencePosition>{position}</ExperiencePosition>
			<ul>
				{roles.map((role, index) => (
					<li key={`Role ${index}`} style={{ width: '90%' }}>
						{role}
					</li>
				))}
			</ul>
		</ExperienceDiv>
	);
};

const Research = ({ companyName, location, duration, position, roles }) => {
	return (
		<ExperienceDiv>
			<ExperienceTitle>
				<article>
					{companyName}, {location}
				</article>
				<article>
					<b>{duration}</b>
				</article>
			</ExperienceTitle>
			<ExperiencePosition>{position}</ExperiencePosition>
			<ul>
				{roles.map((role, index) => (
					<li key={`Role ${index}`} style={{ width: '90%' }}>
						{role}
					</li>
				))}
			</ul>
		</ExperienceDiv>
	);
};

export default Resume;
