import LanguagePrompt from '@components/LanguagePrompt';
import Centered from '@components/Centered';
import Fade from '@components/Fade';
import { Button, ButtonSet } from '@carbon/react';
import { Link } from 'react-router-dom';
import usePolicyStore from '@hooks/usePolicyStore';
import routes from '@routes/routes-const';
import { useTranslation } from 'react-i18next';

const Home = () => {
	const { canSeeNarrativeManagement, canReview, hasNoRole } = usePolicyStore();
	const { t } = useTranslation('home');

	return (
		<div className='flex h-full flex-col'>
			<LanguagePrompt />
			<Fade>
				<Centered>
					<div className='m-auto flex flex-col justify-around space-y-container-2 bg-layer-1 p-container-5'>
						<h2 className='text-productive-heading-5'>{t('welcome')} COSMO</h2>
						{hasNoRole ? (
							<div>{t('no-role-message')}</div>
						) : (
							<>
								<p className='text-body-short-2'>{t('navigate-to-start')}</p>
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
