import Fade from '@components/Fade';
import Centered from '@components/Centered';

const FullScreenLoading = () => {
	return (
		<Fade>
			<Centered>
				<p className='text-heading-3'>Loading...</p>
			</Centered>
		</Fade>
	);
};

export default FullScreenLoading;
