import { Grid, ProgressStep, ProgressIndicator, Layer, Tile } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AssetsSelectionStepContainer from './AssetsSelectionStepContainer';

const NewMonitoringStepsContainer = () => {
	const { t } = useTranslation(['changeMonitoring', 'evidenceRequest']);
	const [currentStep, setCurrentStep] = useState(0);
	const contentToRender = () => {
		switch (currentStep) {
			default:
				return <AssetsSelectionStepContainer setCurrentStep={setCurrentStep} />;
		}
	};
	return (
		<Grid fullWidth narrow>
			<FullWidthColumn>
				<ProgressIndicator spaceEqually className='overflow-x-auto pb-7'>
					<ProgressStep label='Assets' />
					<ProgressStep label='Path' />
					<ProgressStep label='Framework' />
					<ProgressStep label='Script' />
					<ProgressStep label={t('changeMonitoring:scheduling')} />
					<ProgressStep label={t('evidenceRequest:additional-info')} />
				</ProgressIndicator>
			</FullWidthColumn>
			<FullWidthColumn>
				<Layer level={1}>
					<Tile>{contentToRender()}</Tile>
				</Layer>
			</FullWidthColumn>
		</Grid>
	);
};
export default NewMonitoringStepsContainer;
