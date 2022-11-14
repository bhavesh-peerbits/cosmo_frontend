import EvidenceRequest from '@model/EvidenceRequest';
import { useTranslation } from 'react-i18next';

const EvidenceRequestDetails = ({ request }: { request: EvidenceRequest }) => {
	const { t } = useTranslation('evidenceRequest');
	return (
		<div>
			<p className='font-bold text-productive-heading-2'>{t('workflow-type')}</p>
			<p className='text-sm text-body-compact-1'>{request.workflowType}</p>
			<p className='mt-5 font-bold text-productive-heading-2'>Framework</p>
			<p className='text-sm text-body-compact-1'>{request.type}</p>
			<p className='mt-5 font-bold text-productive-heading-2'>{t('application')}</p>
			<p className='text-sm text-body-compact-1'>{request.application?.codeName}</p>
			<p className='mt-5 font-bold text-productive-heading-2'>{t('due-date')}</p>
			<p className='text-sm text-body-compact-1'>
				{request.dueDate.toLocaleDateString()}
			</p>
			<p className='mt-5 font-bold text-productive-heading-2'>{t('step-progress')}</p>
			<p className='text-sm text-body-compact-1'>
				{`${request.currentStep}/${request.steps.length}`}
			</p>
		</div>
	);
};

export default EvidenceRequestDetails;
