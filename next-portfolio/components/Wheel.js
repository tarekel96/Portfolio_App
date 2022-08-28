import Carousel from 'react-material-ui-carousel';

export const Wheel = ({ children }) => {
	return (
		<Carousel
			sx={{
				width: '100%'
			}}
		>
			{children}
		</Carousel>
	);
};
