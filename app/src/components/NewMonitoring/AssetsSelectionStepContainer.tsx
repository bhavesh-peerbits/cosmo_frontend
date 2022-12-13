import { Dispatch, SetStateAction } from 'react';
import { Grid, Column, Button } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import { useTranslation } from 'react-i18next';

type AssetsSelectionStepContainerProps = {
	setCurrentStep: Dispatch<SetStateAction<number>>;
};
const AssetsSelectionStepContainer = ({
	setCurrentStep
}: AssetsSelectionStepContainerProps) => {
	const { t } = useTranslation(['modals', 'changeMonitoring']);
	return (
		<Grid fullWidth narrow className='space-y-5'>
			<FullWidthColumn>
				<FullWidthColumn className='text-heading-3'>
					<span>Assets</span>
				</FullWidthColumn>
				<FullWidthColumn className='text-text-secondary text-body-long-1'>
					<span>{t('changeMonitoring:assets-step-description')}.</span>
				</FullWidthColumn>
			</FullWidthColumn>
			<Column sm={4} md={8} lg={8} className='pt-5'>
				App selection
			</Column>
			<Column sm={4} md={8} lg={8} className='pt-5'>
				Istance selection
			</Column>
			<Column sm={4} md={8} lg={8} className='pt-5'>
				Assets selection
			</Column>
			<FullWidthColumn className='flex justify-end'>
				<Button size='md' onClick={() => setCurrentStep(old => old + 1)}>
					{t('modals:next')}
				</Button>
			</FullWidthColumn>
		</Grid>
	);
};
export default AssetsSelectionStepContainer;
