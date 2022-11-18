import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Layer, ClickableTile } from '@carbon/react';
import EvidenceRequest from '@model/EvidenceRequest';
import useEvidenceRequestAction from '@hooks/evidence-request/useEvidenceRequestAction';

interface ERATileProp {
	request: EvidenceRequest;
}

const EvidenceRequestActionTile = ({ request }: ERATileProp) => {
	const navigate = useNavigate();
	const { t } = useTranslation('evidenceRequest');
	const { filters } = useEvidenceRequestAction();

	return (
		<Layer level={1}>
			<ClickableTile onClick={() => navigate(request?.id ?? '')} className='mb-5'>
				<div className='space-y-3'>
					<p className='block truncate line-clamp-1 text-heading-2'>{request?.name}</p>
					<span className='mt-2 flex space-x-2 '>
						<p className='whitespace-nowrap text-text-secondary text-body-short-1 '>
							Framework:
						</p>
						<p className='block truncate text-body-short-1'>{request?.type}</p>
					</span>
					<div className='space-y-2'>
						<span className='flex space-x-2'>
							<p className='overflow-visible whitespace-nowrap text-text-secondary text-body-short-1'>
								{t('workflow-name')}:
							</p>
							<p className='block truncate text-body-short-1'>{request.workflowName}</p>
						</span>
						<span className='flex space-x-2'>
							<p className='overflow-visible whitespace-nowrap text-text-secondary text-body-short-1'>
								{t('workflow-type')}:
							</p>
							<p className='block truncate text-body-short-1'>{request.workflowType}</p>
						</span>
					</div>
					<div>
						<span className='mt-2 flex space-x-2'>
							<p className='text-text-secondary text-body-short-1'>{t('application')}:</p>
							<p className='block truncate text-body-short-1'>
								{request.application.name}
							</p>
						</span>
					</div>
					<div>
						<span className='mt-2 flex  space-x-2 '>
							<p className='text-text-secondary text-body-short-1 '>{t('due-date')}:</p>
							<p className='text-body-short-1'>{request.dueDate.toLocaleDateString()}</p>
						</span>
					</div>
					<div>
						<span className='mt-2 flex  space-x-2 '>
							<p className='text-text-secondary text-body-short-1 '>
								{request.completionDate
									? t('completion-date')
									: (filters.tab === 1 && t('current-step')) || t('action-pending')}
								:
							</p>
							<p className='text-body-short-1'>
								{request.completionDate?.toLocaleDateString() ||
									(request.steps.filter(st => st.stepOrder === request.currentStep)[0]
										.type === 'APPROVAL'
										? t('approve')
										: t('upload'))}
							</p>
						</span>
					</div>
				</div>
			</ClickableTile>
		</Layer>
	);
};

export default EvidenceRequestActionTile;
