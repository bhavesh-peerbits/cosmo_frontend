import { Grid, ProgressStep, ProgressIndicator } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AssetsSelectionStepContainer from './AssetsSelectionStepContainer';
import FrameworkSelectionStepContainer from './FrameworkSelectionStepContainer';
import NewMonitoringStepTile from './NewMonitoringStepTile';
import PathDefinitionStepContainer from './PathDefinitionStepContainer';

const NewMonitoringStepsContainer = () => {
	const { t } = useTranslation(['changeMonitoring', 'evidenceRequest']);
	const [currentStep, setCurrentStep] = useState(0);
	const contentToRender = () => {
		switch (currentStep) {
			case 0:
				return {
					content: <AssetsSelectionStepContainer />,
					title: 'Assets',
					description: t('changeMonitoring:assets-step-description')
				};
			case 1:
				return {
					content: <PathDefinitionStepContainer />,
					title: 'Path',
					description: t('changeMonitoring:path-step-description')
				};
			case 2:
				return {
					content: <FrameworkSelectionStepContainer />,
					title: 'Framework',
					description: 'Description?????????'
				};
			default:
				return {
					content: <AssetsSelectionStepContainer />,
					title: 'Assets',
					description: t('changeMonitoring:assets-step-description')
				};
		}
	};
	return (
		<Grid fullWidth narrow className='space-y-5'>
			<FullWidthColumn>
				<ProgressIndicator
					currentIndex={currentStep}
					spaceEqually
					className='overflow-x-auto'
				>
					<ProgressStep label='Assets' />
					<ProgressStep label='Path' />
					<ProgressStep label='Framework' />
					<ProgressStep label='Script' />
					<ProgressStep label={t('changeMonitoring:scheduling')} />
					<ProgressStep label={t('evidenceRequest:additional-info')} />
				</ProgressIndicator>
			</FullWidthColumn>
			<FullWidthColumn>
				<NewMonitoringStepTile
					content={contentToRender().content}
					title={contentToRender().title}
					description={contentToRender().description}
					setCurrentStep={setCurrentStep}
					currentStep={currentStep}
				/>
			</FullWidthColumn>
		</Grid>
	);
};
export default NewMonitoringStepsContainer;
