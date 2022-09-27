import {
	Grid,
	ProgressStep,
	ProgressIndicator,
	Layer,
	Tile,
	Button
} from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ApplicationsSelectionContainer from './ApplicationsSelectionContainer';
import UsersSelectionContainer from './UsersSelectionContainer';

const NewEvidenceRequestFlowContainer = () => {
	const { t } = useTranslation(['evidenceRequest', 'modals']);
	const [currentStep, setCurrentStep] = useState(0);

	const contentToRender = () => {
		switch (currentStep) {
			case 1:
				return <UsersSelectionContainer />;
			default:
				return <ApplicationsSelectionContainer />;
		}
	};
	return (
		<Grid fullWidth narrow className='space-y-5'>
			<FullWidthColumn>
				<ProgressIndicator currentIndex={currentStep} className='w-full' spaceEqually>
					<ProgressStep label={t('evidenceRequest:apps-selection')} />
					<ProgressStep label={t('evidenceRequest:users-selection')} />
					<ProgressStep label={t('evidenceRequest:request-text')} />
					<ProgressStep label={t('evidenceRequest:additional-info')} />
					<ProgressStep label={t('evidenceRequest:attachments')} />
				</ProgressIndicator>
			</FullWidthColumn>
			<FullWidthColumn>
				<Layer level={1}>
					<Tile>
						<div className='space-y-5'>
							{contentToRender()}
							<div className='flex justify-end space-x-5 pt-5'>
								{currentStep > 0 && (
									<Button
										size='md'
										kind='secondary'
										onClick={() => setCurrentStep(currentStep - 1)}
									>
										{t('modals:back')}
									</Button>
								)}
								{currentStep !== 4 && (
									<Button size='md' onClick={() => setCurrentStep(currentStep + 1)}>
										{t('modals:next')}
									</Button>
								)}
							</div>
						</div>
					</Tile>
				</Layer>
			</FullWidthColumn>
		</Grid>
	);
};
export default NewEvidenceRequestFlowContainer;
