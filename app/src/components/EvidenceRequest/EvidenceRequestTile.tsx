import { ClickableTile, Layer } from '@carbon/react';
import EvidenceRequest from '@model/EvidenceRequest';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

type EvidenceRequestTileProps = {
	request: EvidenceRequest;
};

const EvidenceRequestTile = ({ request }: EvidenceRequestTileProps) => {
	const navigate = useNavigate();
	const { t } = useTranslation(['evidenceRequest', 'management']);

	return (
		<Layer level={1}>
			<ClickableTile onClick={() => navigate(request.id ?? '')}>
				<div className='space-y-4'>
					<p className='line-clamp-1 text-heading-2'>{request.name}</p>
					<span className='mt-2 flex space-x-2 '>
						<p className='text-text-secondary text-body-short-1 '>
							{t('evidenceRequest:request-type')}:
						</p>
						<p className='text-body-short-1'>{request.type}</p>
					</span>
					<span className='mt-2 flex  space-x-2 '>
						<p className='text-text-secondary text-body-short-1 '>
							{t('evidenceRequest:workflow-type')}:
						</p>
						<p className='text-body-short-1'>{request.workflowtype}</p>
					</span>
					<div>
						<span className='mt-2 flex  space-x-2 '>
							<p className='text-text-secondary text-body-short-1 '>
								{t('management:applications')}:
							</p>
							<p className='text-body-short-1'>{request.applications.length}</p>
						</span>
					</div>
				</div>
			</ClickableTile>
		</Layer>
	);
};
export default EvidenceRequestTile;
