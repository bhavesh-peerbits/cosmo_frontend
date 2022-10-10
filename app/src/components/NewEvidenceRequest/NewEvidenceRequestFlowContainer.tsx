import {
	Grid,
	ProgressStep,
	ProgressIndicator,
	Layer,
	Tile,
	Button
} from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import Application from '@model/Application';
import EvidenceRequestDraft from '@model/EvidenceRequestDraft';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AdditionalInfoContainer from './AdditionalInfoContainer';
import ApplicationsSelectionContainer from './ApplicationsSelectionContainer';
import RequestTextContainer from './RequestTextContainer';
import UsersSelectionContainer from './UsersSelectionContainer';

type NewEvidenceRequestFlowContainerProps = {
	request: EvidenceRequestDraft;
};
const NewEvidenceRequestFlowContainer = ({
	request
}: NewEvidenceRequestFlowContainerProps) => {
	const { t } = useTranslation(['evidenceRequest', 'modals']);
	const [currentStep, setCurrentStep] = useState(0);
	const [isNextActive, setIsNextActive] = useState(true);
	const [requestDraft, setRequestDraft] = useState(request);

	const contentToRender = () => {
		switch (currentStep) {
			case 1:
				return (
					<UsersSelectionContainer
						appsSelected={
							requestDraft.requests
								?.filter(req => req.selected)
								.map(req => req.application as Application) || []
						} // TODO Fix when BE controls are ready.
						steps={request?.requests?.[0].steps?.slice(1) || []} // TODO Fix when BE controls are ready.
						setIsNextActive={setIsNextActive}
						setRequestDraft={setRequestDraft}
					/>
				);
			case 2:
				return (
					<RequestTextContainer
						setIsNextActive={setIsNextActive}
						setRequestDraft={setRequestDraft}
					/>
				);
			case 3:
				return (
					<AdditionalInfoContainer
						setIsNextActive={setIsNextActive}
						setRequestDraft={setRequestDraft}
					/>
				);
			default:
				return (
					<ApplicationsSelectionContainer
						request={request}
						setIsNextActive={setIsNextActive}
						setRequestDraft={setRequestDraft}
					/>
				);
		}
	};

	return (
		<Grid fullWidth narrow className='space-y-5'>
			<FullWidthColumn>
				<ProgressIndicator
					currentIndex={currentStep}
					spaceEqually
					className=' overflow-hidden'
				>
					<ProgressStep
						className='truncate'
						label={t('evidenceRequest:apps-selection')}
					/>
					<ProgressStep
						className='truncate'
						label={t('evidenceRequest:users-selection')}
					/>
					<ProgressStep className='truncate' label={t('evidenceRequest:request-text')} />
					<ProgressStep
						className='truncate'
						label={t('evidenceRequest:additional-info')}
					/>
					<ProgressStep className='truncate' label={t('evidenceRequest:attachments')} />
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
									<Button
										size='md'
										disabled={!isNextActive}
										onClick={() => setCurrentStep(currentStep + 1)}
									>
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
