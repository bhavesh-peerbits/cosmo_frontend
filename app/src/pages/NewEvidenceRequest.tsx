import PageHeader from '@components/PageHeader';
import { Add } from '@carbon/react/icons';
import { useState } from 'react';
import EvidenceRequestTileView from '@components/EvidenceRequest/EvidenceRequestTileView';

const NewEvidenceRequest = () => {
	const [isNewRequestOpen, setIsNewRequestOpen] = useState(false);
	return (
		<>
			{/* da rimuovere aggiunto solo per commit */}
			{isNewRequestOpen}
			<PageHeader
				pageTitle='New Evidence Request'
				actions={[
					{
						name: 'New Request',
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
