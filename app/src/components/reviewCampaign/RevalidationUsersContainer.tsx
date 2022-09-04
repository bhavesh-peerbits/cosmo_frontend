import { Button, Grid } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import { useTranslation } from 'react-i18next';
import CampaignApplication from '@model/CampaignApplication';
import useAnswerStore from '@hooks/user-revalidation-review/useAnswerStore';
import useSaveAnswersToReview from '@api/review-campaign/useSaveAnswersToReview';
import CosmoTableRevalidationUsers from '@components/table/CosmoTableRevalidationUsers';
import { useParams } from 'react-router-dom';

type RevalidationUsersContainerProps = {
	setIsCampaignCompleted: (val: boolean) => void;
	review: CampaignApplication;
};

const Actions = ({ setIsCampaignCompleted, review }: RevalidationUsersContainerProps) => {
	const { t } = useTranslation(['modals', 'userSelect']);
	const { campaignId = '' } = useParams<'campaignId'>();
	const { modifiedAnswers, resetAnswers } = useAnswerStore(review.id);
	const { mutate: saveAnswers } = useSaveAnswersToReview();

	const saveAndContinue = () => {
		saveAnswers(
			{
				answers: [...modifiedAnswers.values()],
				reviewId: review.id,
				campaignId
			},
			{ onSuccess: () => setIsCampaignCompleted(true) }
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

const RevalidationUsersContainer = ({
	setIsCampaignCompleted,
	review
}: RevalidationUsersContainerProps) => {
	return (
		<Grid fullWidth className='h-full space-y-5'>
			<FullWidthColumn className='space-x-5'>
				<Actions setIsCampaignCompleted={setIsCampaignCompleted} review={review} />
			</FullWidthColumn>
			<FullWidthColumn>
				<CosmoTableRevalidationUsers review={review} />
			</FullWidthColumn>
		</Grid>
	);
};
export default RevalidationUsersContainer;
