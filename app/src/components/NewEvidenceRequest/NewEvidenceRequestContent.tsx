import { Grid, Column } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import { useTranslation } from 'react-i18next';
import NewEvidenceRequestFlowContainer from './NewEvidenceRequestFlowContainer';

const NewEvidenceRequestContent = () => {
	const { t } = useTranslation('evidenceRequest');
	return (
		<Grid fullWidth narrow className='p-container-2'>
			<Column md={8} lg={3} className='space-y-6'>
				{/* // TODO Fix endpoint after creating the flow */}
				<FullWidthColumn className='flex flex-col'>
					<span className='text-heading-2'>{t('workflow-type')}</span>
					<span className='text-text-secondary text-body-short-1'>Type</span>
				</FullWidthColumn>
				<FullWidthColumn className='flex flex-col'>
					<span className='text-heading-2'>{t('request-type')}</span>
					<span className='text-text-secondary text-body-short-1'>Type</span>
				</FullWidthColumn>
			</Column>
			<Column md={8} lg={13}>
				<NewEvidenceRequestFlowContainer />
			</Column>
		</Grid>
	);
};
export default NewEvidenceRequestContent;
