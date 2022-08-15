import { styled } from '@mui/system';
import React from 'react';
import resumeData from '../lib/resume.json';
const styles = {};

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

const Header = styled('header')(({ theme }) => ({
	textAlign: 'center',
	fontSize: '1.4rem',
	fontWeight: '700'
}));

const TechSubContainer = styled('div')(({ theme }) => ({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	[theme.breakpoints.down(768)]: {
		display: 'block'
	}
}));

const TechCertMessage = styled('article')(({ theme }) => ({
	fontSize: '.75rem',
	width: '200px',
	'&:hover': {
		fontSize: '1rem',
		width: '100%',
		cursor: 'pointer'
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

const EducationDiv = styled('div')(({ theme }) => ({
	padding: '0',
	margin: '0',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center'
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
				<SkillsEducationWrapper>
					<TechnicalSkills>
						<Header>Technical Skills</Header>
						<hr style={{ width: '100%' }} />
						<TechSubContainer>
							{/* Slice (1st third of arr) -> Map */}
							<ul>
								{convertToArray(resumeData.skills)
									.slice(0, getThirdArrLength(convertToArray(resumeData.skills)))
									.map((skill, index) => <li key={`Skill ID#: ${index}`}>{skill}</li>)}
							</ul>
							{/* Slice (2nd third of arr) -> Map */}
							<ul>
								{convertToArray(resumeData.skills)
									.slice(
										getThirdArrLength(convertToArray(resumeData.skills)),
										2 * getThirdArrLength(convertToArray(resumeData.skills))
									)
									.map((skill, index) => <li key={`Skill ID#: ${index}`}>{skill}</li>)}
							</ul>
							{/* Slice (last third of arr) -> Map */}
							<ul>
								{convertToArray(resumeData.skills)
									.slice(
										2 * getThirdArrLength(convertToArray(resumeData.skills)),
										convertToArray(resumeData.skills).length
									)
									.map((skill, index) => <li key={`Skill ID#: ${index}`}>{skill}</li>)}
							</ul>
						</TechSubContainer>
						<article>"*" indicates certification for skill</article>
						<hr />
					</TechnicalSkills>
					<EducationSection>
						<Header>Education</Header>
						<hr style={{ width: '100%' }} />
						{resumeData.educations.map(({ name, id, duration, major, degreeType, gpa, specialAwards }) => (
							<Education
								key={id}
								name={name}
								duration={duration}
								major={major}
								degreeType={degreeType}
								gpa={gpa}
								specialAwards={specialAwards}
							/>
						))}
					</EducationSection>
				</SkillsEducationWrapper>
				<ExperienceSection>
					<Header>Experiences</Header>
					<hr />
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
					<hr />
				</ExperienceSection>
			</ResumeSection>
		</LayoutWrapper>
	);
};

const Education = ({ name, duration, major, degreeType, gpa, specialAwards }) => {
	return (
		<EducationDiv>
			<article>{name}</article>
			<EducationList>
				<li>
					<BoldSpan>Time Attended:</BoldSpan> {duration}
				</li>
				<li>
					<BoldSpan>Major:</BoldSpan> {major} - {degreeType}
				</li>
				<li
					style={{
						display: gpa !== 'n/a' ? 'block' : 'none',
						listStyleType: gpa !== 'n/a' ? 'circle' : 'none'
					}}
				>
					<BoldSpan>GPA:</BoldSpan> {gpa}
				</li>
				<li
					style={{
						display: specialAwards.length !== 0 ? 'block' : 'none',
						listStyleType: specialAwards.length !== 0 ? 'circle' : 'none'
					}}
				>
					<BoldSpan>Awards:</BoldSpan>{' '}
					{specialAwards.map((award, index) => (
						<span key={`Award ${index}`}>
							{award}
							{index !== specialAwards.length - 1 && ', '}{' '}
						</span>
					))}
				</li>
			</EducationList>
		</EducationDiv>
	);
};

const Experience = ({ companyName, location, duration, position, roles }) => {
	return (
		<div>
			<article>
				{companyName} - {location}
			</article>
			<ul>
				<li>
					<BoldSpan>Duration:</BoldSpan> {duration}
				</li>
				<li>
					<BoldSpan>Position:</BoldSpan> {position}
				</li>
				<li>
					<BoldArticle>Roles: </BoldArticle>
				</li>
				{roles.map((role, index) => (
					<li key={`Role ${index}`} style={{ marginLeft: '2.5%', listStyleType: 'square' }}>
						{role}
						{index !== roles.length - 1 && ', '}{' '}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Resume;
