import { Button, Grid } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import { TrashCan, Upload } from '@carbon/react/icons';
import { useState } from 'react';
import DeleteUploadModal from '@components/Modals/DeleteUploadModal';
import CampaignApplication from '@model/CampaignApplication';

interface UploadResultsTileProps {
	campaignApplication: CampaignApplication;
}

const UploadResultsTile = ({ campaignApplication }: UploadResultsTileProps) => {
	const [isDeleteOpen, setIsDeleteOpen] = useState(false);
	return (
		<>
			<DeleteUploadModal
				isOpen={isDeleteOpen}
				setIsOpen={setIsDeleteOpen}
				campaignApplication={campaignApplication}
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
							// TODO open upload modal and pass app id
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
				<FullWidthColumn>Table</FullWidthColumn>
			</Grid>
		</>
	);
};
export default UploadResultsTile;
