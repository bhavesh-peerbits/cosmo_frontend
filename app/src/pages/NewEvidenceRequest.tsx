import PageHeader from '@components/PageHeader';
import { Add } from '@carbon/react/icons';
import { useState } from 'react';
import EvidenceRequestTileView from '@components/EvidenceRequest/EvidenceRequestTileView';
import { useTranslation } from 'react-i18next';
import NewEvidenceRequestModal from '@components/Modals/NewEvidenceRequestModal';

const NewEvidenceRequest = () => {
	const [isNewRequestOpen, setIsNewRequestOpen] = useState(false);
	const { t } = useTranslation('evidenceRequest');
	return (
		<PageHeader
			pageTitle='New Evidence Request'
			actions={[
				{
					name: t('new-request'),
					icon: Add,
					onClick: () => {
						setIsNewRequestOpen(true);
					}
				}
			]}
		>
			<div className='h-full p-container-1'>
				{isNewRequestOpen && (
					<NewEvidenceRequestModal
						isOpen={isNewRequestOpen}
						setIsOpen={setIsNewRequestOpen}
					/>
				)}
				<EvidenceRequestTileView />
			</div>
		</PageHeader>
	);
};
export default NewEvidenceRequest;
