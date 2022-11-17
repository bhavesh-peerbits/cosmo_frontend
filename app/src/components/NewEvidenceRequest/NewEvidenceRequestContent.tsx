import { Grid, Column } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import evidenceRequestDraftStore from '@store/evidenceRequestDraft/evidenceRequestDraftStore';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import NewEvidenceRequestFlowContainer from './NewEvidenceRequestFlowContainer';

const NewEvidenceRequestContent = () => {
	const { t } = useTranslation('evidenceRequest');
	const requestDraft = useRecoilValue(evidenceRequestDraftStore);
	return (
		<Grid fullWidth narrow className='space-y-5 p-container-2 lg:space-y-0'>
			<Column sm={4} md={8} lg={3} className='space-y-6'>
				<FullWidthColumn className='flex flex-col'>
					<span className='text-heading-2'>{t('workflow-type')}</span>
					<span className='text-text-secondary text-body-short-1'>
						{requestDraft?.workflow.type}
					</span>
				</FullWidthColumn>
				<FullWidthColumn className='flex flex-col'>
					<span className='text-heading-2'>{t('workflow-name')}</span>
					<span className='text-text-secondary text-body-short-1'>
						{requestDraft?.workflow.name}
					</span>
				</FullWidthColumn>
				<FullWidthColumn className='flex flex-col'>
					<span className='text-heading-2'>{t('request-type')}</span>
					<span className='text-text-secondary text-body-short-1'>
						{requestDraft?.type}
					</span>
				</FullWidthColumn>
				{requestDraft.phaseType && (
					<FullWidthColumn className='flex flex-col'>
						<span className='text-heading-2'>{t('phase-type')}</span>
						<span className='text-text-secondary text-body-short-1'>
							{requestDraft?.phaseType?.name}
						</span>
					</FullWidthColumn>
				)}
			</Column>
			<Column sm={4} md={8} lg={13}>
				<NewEvidenceRequestFlowContainer />
			</Column>
		</Grid>
	);
};
export default NewEvidenceRequestContent;
