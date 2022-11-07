import { ClickableTile, Layer } from '@carbon/react';
import EvidenceRequestDraft from '@model/EvidenceRequestDraft';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

type EvidenceRequestTileProps = {
	request?: EvidenceRequestDraft;
};

const EvidenceRequestTile = ({ request }: EvidenceRequestTileProps) => {
	const navigate = useNavigate();
	const { t } = useTranslation(['evidenceRequest', 'management']);

	return (
		<Layer level={1}>
			<ClickableTile onClick={() => navigate(request?.id ?? '')} className='mb-5'>
				<div className='space-y-4'>
					<p className='block truncate line-clamp-1 text-heading-2'>{request?.name}</p>
					<span className='mt-2 flex space-x-2 '>
						<p className='whitespace-nowrap text-text-secondary text-body-short-1'>
							{t('evidenceRequest:request-type')}:
						</p>
						<p className='block truncate text-body-short-1'>{request?.type}</p>
					</span>
					<span className='mt-2 flex space-x-2 '>
						<p className='whitespace-nowrap text-text-secondary text-body-short-1'>
							{t('evidenceRequest:workflow-type')}:
						</p>
						<p className='block truncate text-body-short-1'>{request?.workflow.name}</p>
					</span>
					<div>
						<span className='mt-2 flex  space-x-2 '>
							<p className='text-text-secondary text-body-short-1 '>
								{t('management:applications')}:
							</p>
							<p className='text-body-short-1'>{request?.requests?.length}</p>
						</span>
					</div>
				</div>
			</ClickableTile>
		</Layer>
	);
};
export default EvidenceRequestTile;
