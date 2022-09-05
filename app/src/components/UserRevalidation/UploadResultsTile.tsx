import { Button, Grid } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import { TrashCan, Upload } from '@carbon/react/icons';
import { useState } from 'react';
import DeleteUploadModal from '@components/Modals/DeleteUploadModal';
import CampaignApplication from '@model/CampaignApplication';
import useGetAnswersForReview from '@api/user-revalidation/useGetAnswersForReview';
import AnswerTable from '@components/UserRevalidation/AnswerTable';
import Answer from '@model/Answer';
import UploadFileModal from '@components/Modals/UploadFileModal';

interface UploadResultsTileProps {
	campaignApplication: CampaignApplication;
}

const UploadResultsTile = ({ campaignApplication }: UploadResultsTileProps) => {
	const [isDeleteOpen, setIsDeleteOpen] = useState(false);
	const [isUpdateOpen, setIsUpdateOpen] = useState(false);

	const { data = new Map<string, Answer>() } = useGetAnswersForReview(
		campaignApplication.campaign.id,
		campaignApplication.id
	);

	return (
		<>
			<DeleteUploadModal
				isOpen={isDeleteOpen}
				setIsOpen={setIsDeleteOpen}
				campaignApplication={campaignApplication}
			/>
			<UploadFileModal
				isOpen={isUpdateOpen}
				setIsOpen={setIsUpdateOpen}
				campaignId={campaignApplication.campaign.id}
				application={campaignApplication.application}
				isEmpty={false}
			/>
			<Grid fullWidth className='space-y-5'>
				<FullWidthColumn
					data-toc-id={campaignApplication.id}
					data-toc-title={campaignApplication.application.name}
					className='flex items-center justify-between text-fluid-heading-3'
				>
					{campaignApplication.application.name}
					<div>
						<Button
							kind='ghost'
							iconDescription='Substitute upload'
							hasIconOnly
							renderIcon={Upload}
							onClick={() => setIsUpdateOpen(true)}
						/>
						<Button
							kind='ghost'
							iconDescription='Remove upload'
							hasIconOnly
							renderIcon={TrashCan}
							onClick={() => setIsDeleteOpen(true)}
						/>
					</div>
				</FullWidthColumn>
				<FullWidthColumn>
					<AnswerTable answers={[...data.values()]} />
				</FullWidthColumn>
			</Grid>
		</>
	);
};
export default UploadResultsTile;