import { styled } from '@mui/system';
import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

const Carousel = styled(motion.div)(({ theme }) => ({
	cursor: 'grab',
	overflow: 'hidden',
	margin: '0 20%'
}));

const InnerCarousel = styled(motion.div)(({ theme }) => ({
	display: 'flex',
	gap: '4%'
}));

export const Wheel = ({ children }) => {
	const [ width, setWidth ] = useState(0);
	const carousel = useRef();

	useEffect(() => {
		setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
	}, []);

	return (
		<Carousel ref={carousel}>
			<InnerCarousel
				drag="x"
				dragConstraints={{
					right: 0,
					left: -width
				}}
			>
				{children}
			</InnerCarousel>
		</Carousel>
	);
};
