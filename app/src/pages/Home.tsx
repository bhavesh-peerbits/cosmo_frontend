import LanguagePrompt from '@components/LanguagePrompt';
import Centered from '@components/Centered';
import Fade from '@components/Fade';
import { Button, ButtonSet } from '@carbon/react';
import { Link } from 'react-router-dom';
import usePolicyStore from '@hooks/usePolicyStore';
import routes from '@routes/routes-const';

const Home = () => {
	const { canSeeNarrativeManagement, canReview, hasNoRole } = usePolicyStore();

	return (
		<div className='flex h-full flex-col'>
			<LanguagePrompt />
			<Fade>
				<Centered>
					<div className='m-auto flex flex-col justify-around space-y-container-2 bg-layer-1 p-container-5'>
						<h2 className='text-productive-heading-5'>Welcome in Cosmo</h2>
						{hasNoRole ? (
							<div>You do not have any role, contact an administrator </div>
						) : (
							<>
								<p className='text-body-short-2'>
									Navigate in the following section to start
								</p>
								<div className='w-1/2'>
									<ButtonSet>
										{canSeeNarrativeManagement ? (
											<Button as={Link} to={routes.MANAGEMENT}>
												Management
											</Button>
										) : (
											canReview && (
												<Button as={Link} to={routes.REVIEW_NARRATIVE}>
													Review Narrative
												</Button>
											)
										)}
										<Button kind='secondary' href={routes.LOGOUT}>
											Logout
										</Button>
									</ButtonSet>
								</div>
							</>
						)}
					</div>
				</Centered>
			</Fade>
		</div>
	);
};
export default Home;
