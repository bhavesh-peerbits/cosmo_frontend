import LanguagePrompt from '@components/LanguagePrompt';
import Centered from '@components/Centered';
import Fade from '@components/Fade';
import { Button, ButtonSet } from '@carbon/react';
import { Link } from 'react-router-dom';
import usePolicyStore from '@hooks/usePolicyStore';
import routes from '@routes/routes-const';
import { useTranslation } from 'react-i18next';

const Home = () => {
	const { t } = useTranslation('home');

	const {
		hasNoRole,
		canSeeNarrativeManagement,
		canReview,
		canAdmin,
		canNarrativeAdmin,
		canUserAdmin,
		canRevalidateUser
	} = usePolicyStore();
	const buttonToNavigate = () => {
		if (canUserAdmin || canNarrativeAdmin || canAdmin) {
			return (
				<Button as={Link} to={routes.ADMIN}>
					Admin
				</Button>
			);
		}
		if (canReview) {
			return (
				<Button as={Link} to={routes.USER_REVALIDATION}>
					User Revalidation
				</Button>
			);
		}
		if (canSeeNarrativeManagement) {
			return (
				<Button as={Link} to={routes.MANAGEMENT}>
					Management
				</Button>
			);
		}
		if (canRevalidateUser) {
			return (
				<Button as={Link} to={routes.REVALIDATIONS_ONGOING}>
					Revalidations Ongoing
				</Button>
			);
		}
		return (
			<Button as={Link} to={routes.REVIEW_NARRATIVE}>
				Review Narrative
			</Button>
		);
	};

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
										{buttonToNavigate()}
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
