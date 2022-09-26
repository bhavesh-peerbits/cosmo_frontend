import { Button, Grid } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import { useTranslation } from 'react-i18next';
import CampaignApplication from '@model/CampaignApplication';
import useAnswerStore from '@hooks/user-revalidation-review/useAnswerStore';
import useSaveAnswersToReview from '@api/review-campaign/useSaveAnswersToReview';
import CosmoTableRevalidationUsers from '@components/table/CosmoTableRevalidationUsers';
import { useParams } from 'react-router-dom';
import useNotification from '@hooks/useNotification';
import ApiError from '@api/ApiError';
import { useMemo } from 'react';

type RevalidationUsersContainerProps = {
	review: CampaignApplication;
};

const Actions = ({ review }: RevalidationUsersContainerProps) => {
	const { t } = useTranslation(['modals', 'userSelect', 'userRevalidation']);
	const { campaignId = '' } = useParams<'campaignId'>();
	const { modifiedAnswers, resetAnswers } = useAnswerStore(review.id);
	const { mutate: saveAnswers } = useSaveAnswersToReview();
	const { showNotification } = useNotification();
	const { answers } = useAnswerStore(review.id);
	const answersList = useMemo(() => [...answers.values()], [answers]);

	const saveAndContinue = () => {
		saveAnswers(
			{
				answers: [...modifiedAnswers.values()],
				reviewId: review.id,
				campaignId
			},
			{
				onError: err => {
					showNotification({
						title: t('userRevalidation:saveAnswersError'),
						type: 'error',
						message:
							(err as ApiError).message || 'Error saving answers, please try again later',
						action: {
							label: 'retry',
							onClick: () => saveAndContinue()
						}
					});
				},
				onSuccess: () => {
					answersList.every(answer => answer.answerType) &&
						showNotification({
							title: t('userRevalidation:revalidation-completed'),
							message: `${t('userRevalidation:revalidation-completed-toast', {
								date: review.campaign.dueDate?.toLocaleDateString('it-IT')
							})}.`,
							type: 'success'
						});
					// showNotification({ TODO check feasibility
					// 	message: `${t('userRevalidation:campaign-left-toast', {
					// 		number: 'N',
					// 		application: 'App Name'
					// 	})}.`,
					// 	type: 'error',
					// 	title: t('userRevalidation:campaigns-left', { number: 'N' }),
					// 	action: {
					// 		label: 'Dashboard',
					// 		onClick: () => navigate('/user-revalidation')
					// 	},
					// 	timeout: 'long'
					// });
				}
			}
		);
	};

	return (
		<>
			<Button
				disabled={modifiedAnswers.size === 0}
				onClick={() => saveAndContinue()}
				size='md'
			>
				{t('modals:save')}
			</Button>
			<Button
				disabled={modifiedAnswers.size === 0}
				onClick={() => resetAnswers()}
				size='md'
				kind='secondary'
			>
				{t('userSelect:reset')}
			</Button>
		</>
	);
};

const RevalidationUsersContainer = ({ review }: RevalidationUsersContainerProps) => {
	return (
		<Grid fullWidth className='h-full space-y-5'>
			<FullWidthColumn className='space-x-5'>
				<Actions review={review} />
			</FullWidthColumn>
			<FullWidthColumn>
				<CosmoTableRevalidationUsers review={review} />
			</FullWidthColumn>
		</Grid>
	);
};
export default RevalidationUsersContainer;
