import PageHeader from '@components/PageHeader';
import { Add } from '@carbon/react/icons';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import NewEvidenceRequestModal from '@pages/EvidenceRequest/NewEvidenceRequestDashboard/Modals/NewEvidenceRequestModal';
import EvidenceRequestTileView from './Containers/EvidenceRequestTileView';

const NewEvidenceRequestDashboard = () => {
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
				<NewEvidenceRequestModal
					isOpen={isNewRequestOpen}
					setIsOpen={setIsNewRequestOpen}
				/>
				<EvidenceRequestTileView />
			</div>
		</PageHeader>
	);
};
export default NewEvidenceRequestDashboard;
