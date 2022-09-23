import PageHeader from '@components/PageHeader';
import { Add } from '@carbon/react/icons';
import { useState } from 'react';
import EvidenceRequestTileView from '@components/EvidenceRequest/EvidenceRequestTileView';
import { useTranslation } from 'react-i18next';

const NewEvidenceRequest = () => {
	const [isNewRequestOpen, setIsNewRequestOpen] = useState(false);
	const { t } = useTranslation('evidenceRequest');
	return (
		<>
			{/* da rimuovere aggiunto solo per commit */}
			{isNewRequestOpen}
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
					<EvidenceRequestTileView />
				</div>
			</PageHeader>
		</>
	);
};
export default NewEvidenceRequest;
