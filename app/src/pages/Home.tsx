import LanguagePrompt from '@components/LanguagePrompt';
import usePolicyStore from '@hooks/usePolicyStore';
import Centered from '@components/Centered';
import Fade from '@components/Fade';
import { Button, ButtonSet } from '@carbon/react';
import { Link } from 'react-router-dom';

const Home = () => {
	const { canCreateReport } = usePolicyStore();

	return (
		<div className='flex h-full flex-col'>
			<LanguagePrompt />
			<div>USER CAN CREATE REPORT? {canCreateReport ? 'YES' : 'NO'}</div>

			<Fade>
				<Centered>
					<div className='m-auto flex flex-col justify-around space-y-container-2 bg-layer-2 p-container-5'>
						<h2 className='text-productive-heading-5'>Welcome in Cosmo</h2>
						<p className='text-body-short-2'>
							Navigate in the following section to start
						</p>
						<div className='w-1/2'>
							<ButtonSet>
								<Button as={Link} to='/management'>
									Management
								</Button>
								<Button kind='secondary' className='bg-layer-3'>
									Reports
								</Button>
							</ButtonSet>
						</div>
					</div>
				</Centered>
			</Fade>
		</div>
	);
};
export default Home;
