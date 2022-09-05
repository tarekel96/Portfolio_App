import Link from 'next/link';
import { styled } from '@mui/system';
import { Fragment } from 'react';
// ui components
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const WrapperImg = styled('div')(({ theme }) => ({
	backgroundColor: theme.palette.background.secondary,
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'spaceEvenly',
	padding: '64px 32px',
	width: '400px',
	minHeight: '560px',
	borderRadius: '8px',
	boxShadow: '12px 12px 12px #666',
	marginTop: '1.5rem',
	marginBottom: '1.5rem',
	transition: '0.3s',
	'&:hover': {
		boxShadow: '0 8px 16px 0 rgba(0, 0, 0, 0.2)'
	},
	[theme.breakpoints.down(600)]: {
		maxWidth: '300px',
		width: '225px',
		margin: '0 auto'
	}
}));

const WrapperNoImg = styled('div')(({ theme }) => ({
	backgroundColor: theme.palette.background.secondary,
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'spaceEvenly',
	padding: '64px 32px',
	width: '400px',
	minHeight: '350px',
	borderRadius: '8px',
	boxShadow: '12px 12px 12px #666',
	marginTop: '1.5rem',
	marginBottom: '1.5rem',
	transition: '0.3s',
	'&:hover': {
		boxShadow: '0 8px 16px 0 rgba(0, 0, 0, 0.2)'
	},
	[theme.breakpoints.down(600)]: {
		maxWidth: '300px',
		width: '225px',
		margin: '0 auto'
	}
}));

const SubContainer = styled('div')(({ theme }) => ({
	padding: '2px 16px'
}));

const CardTitle = styled('h2')(({ theme }) => ({
	fontSize: '24px'
}));

const CardContent = styled('p')(({ theme }) => ({
	fontSize: '16px'
}));

const TagItem = styled('span')(({ theme }) => ({
	display: 'inline-block',
	borderRadius: '16px',
	padding: '4px 6px',
	margin: '4px',
	backgroundColor: '#9598a1'
}));

const CursorLink = styled('p')(({ theme }) => ({
	fontSize: '16px',
	textDecoration: 'underline',
	color: '#0000FF',
	'&:hover': {
		cursor: 'pointer'
	},
	'a:visited': {
		textDecoration: 'underline',
		color: '#800080'
	}
}));

const TechStackHeader = styled('h3')(({ theme }) => ({
	fontSize: '18.72px'
}));

export const Card = ({
	id,
	item,
	title,
	imageSrc,
	imageAlt,
	content,
	style,
	url_1,
	url_2,
	url_1Title = 'Live Project Link',
	url_2Title = 'GitHub Link',
	tags = [],
	webDev = true
}) => {
	if (webDev === true) {
		return (
			<WrapperImg>
				{webDev ? (
					<Fragment>
						<LazyLoadImage
							src={imageSrc}
							alt={imageAlt}
							effect="blur"
							style={{
								maxHeight: '500px',
								height: 'auto',
								width: '100%',
								bordeRadius: '4px'
							}}
							draggable={false}
						/>
					</Fragment>
				) : null}
				<SubContainer>
					<b>
						<CardTitle>{title}</CardTitle>
					</b>
					<hr />
					<CardContent>{content}</CardContent>
					{url_1 !== 'N/A' && webDev === true ? (
						<CursorLink>
							<Link href={url_1}>
								<a
									title={title}
									target="_blank"
									rel="noreferrer"
									style={{
										textDecoration: 'underline',
										color: '#0000FF',
										visited: {
											textDecoration: 'underline',
											color: '#800080'
										}
									}}
								>
									{url_1Title}
								</a>
							</Link>
						</CursorLink>
					) : null}
					{url_2 !== 'N/A' ? (
						<CursorLink>
							<Link href={url_2}>
								<a title={title} target="_blank" rel="noreferrer">
									{url_2Title}
								</a>
							</Link>
						</CursorLink>
					) : null}
					<TechStackHeader>Technologies Used: </TechStackHeader>
					<CardContent>
						{tags.map((tag, tagIndex) => {
							return <Tag content={tag} key={tagIndex} />;
						})}
					</CardContent>
				</SubContainer>
			</WrapperImg>
		);
	}
	return (
		<WrapperNoImg>
			{webDev ? (
				<Fragment>
					<LazyLoadImage
						src={imageSrc}
						alt={imageAlt}
						className={styles['image']}
						effect="blur"
						style={{
							maxHeight: '500px',
							height: 'auto',
							width: '100%',
							bordeRadius: '4px'
						}}
					/>
				</Fragment>
			) : null}
			<SubContainer>
				<b>
					<CardTitle>{title}</CardTitle>
				</b>
				<hr />
				<CardContent>{content}</CardContent>
				{url_1 !== 'N/A' && webDev === true ? (
					<CursorLink>
						<Link href={url_1}>
							<a title={title} target="_blank" rel="noreferrer">
								{url_1Title}
							</a>
						</Link>
					</CursorLink>
				) : null}
				{url_2 !== 'N/A' ? (
					<CursorLink>
						<Link href={url_2}>
							<a title={title} target="_blank" rel="noreferrer">
								{url_2Title}
							</a>
						</Link>
					</CursorLink>
				) : null}
				<TechStackHeader>Technologies Used: </TechStackHeader>
				<CardContent>
					{tags.map((tag, tagIndex) => {
						return <Tag content={tag} key={tagIndex} />;
					})}
				</CardContent>
			</SubContainer>
		</WrapperNoImg>
	);
};

const Tag = ({ content }) => {
	return <TagItem>{content}</TagItem>;
};
