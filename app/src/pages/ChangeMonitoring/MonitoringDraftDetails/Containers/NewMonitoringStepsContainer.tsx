import { Grid, ProgressStep, ProgressIndicator } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import MonitoringDraft from '@model/ChangeMonitoring/MonitoringDraft';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AdditionalInfoStepContainer from '../Components/AdditionalInfoStepContainer';
import AssetsSelectionStepContainer from '../Components/AssetsSelectionStepContainer';
import FrameworkSelectionStepContainer from '../Components/FrameworkSelectionStepContainer';
import NewMonitoringStepTile from '../Components/NewMonitoringStepTile';
import PathDefinitionStepContainer from '../Components/PathDefinitionStepContainer';
import ScriptSelectionStepContainer from '../Components/ScriptSelectionStepContainer';
import SchedulingStepContainer from '../Components/SchedulingStepContainer';

type NewMonitoringStepsContainerProps = {
	draft: MonitoringDraft;
};

const NewMonitoringStepsContainer = ({ draft }: NewMonitoringStepsContainerProps) => {
	const { t } = useTranslation(['changeMonitoring', 'evidenceRequest']);
	const [currentStep, setCurrentStep] = useState(0);
	const contentToRender = () => {
		switch (currentStep) {
			case 0:
				return {
					content: (
						<AssetsSelectionStepContainer setCurrentStep={setCurrentStep} draft={draft} />
					),
					title: 'Assets',
					description: t('changeMonitoring:assets-step-description')
				};
			case 1:
				return {
					content: (
						<PathDefinitionStepContainer setCurrentStep={setCurrentStep} draft={draft} />
					),
					title: 'Path',
					description:
						draft.monitoringAssets?.length && draft.monitoringAssets.length > 1
							? t('changeMonitoring:path-step-description-multi')
							: t('changeMonitoring:path-step-description-single')
				};
			case 2:
				return {
					content: (
						<FrameworkSelectionStepContainer
							setCurrentStep={setCurrentStep}
							draft={draft}
						/>
					),
					title: 'Framework',
					description: t('changeMonitoring:framework-step-description')
				};
			case 3:
				return {
					content: (
						<ScriptSelectionStepContainer setCurrentStep={setCurrentStep} draft={draft} />
					),
					title: 'Script',
					description: t('changeMonitoring:script-step-description')
				};
			case 4:
				return {
					content: (
						<SchedulingStepContainer setCurrentStep={setCurrentStep} draft={draft} />
					),
					title: t('changeMonitoring:scheduling'),
					description: t('changeMonitoring:scheduling-step-description')
				};
			case 5:
				return {
					content: (
						<AdditionalInfoStepContainer setCurrentStep={setCurrentStep} draft={draft} />
					),
					title: t('evidenceRequest:additional-info'),
					description:
						draft.monitoringAssets?.length && draft.monitoringAssets.length > 1
							? t('changeMonitoring:additional-info-description-multi')
							: t('changeMonitoring:additional-info-description-single')
				};

			default:
				return {
					content: (
						<AssetsSelectionStepContainer setCurrentStep={setCurrentStep} draft={draft} />
					),
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
				/>
			</FullWidthColumn>
		</Grid>
	);
};
export default NewMonitoringStepsContainer;
