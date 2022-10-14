import { Grid, ProgressStep, ProgressIndicator, Layer, Tile } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import Application from '@model/Application';
import EvidenceRequestDraft from '@model/EvidenceRequestDraft';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AdditionalInfoContainer from './AdditionalInfoContainer';
import ApplicationsSelectionContainer from './ApplicationsSelectionContainer';
import AttachmentsContainer from './AttachmentsContainer';
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
	const [requestDraft, setRequestDraft] = useState(request);

	const contentToRender = () => {
		switch (currentStep) {
			case 1:
				return (
					<UsersSelectionContainer
						appsSelected={
							requestDraft.requests
								?.filter(req => req.selected)
								.map(req => req.application) || []
						}
						setCurrentStep={setCurrentStep}
						setRequestDraft={setRequestDraft}
						requestDraft={requestDraft}
					/>
				);
			case 2:
				return (
					<RequestTextContainer
						setCurrentStep={setCurrentStep}
						setRequestDraft={setRequestDraft}
						requestDraft={requestDraft}
					/>
				);
			case 3:
				return (
					<AdditionalInfoContainer
						setCurrentStep={setCurrentStep}
						setRequestDraft={setRequestDraft}
						requestDraft={requestDraft}
					/>
				);
			case 4:
				return (
					<AttachmentsContainer
						requestDraft={requestDraft}
						setCurrentStep={setCurrentStep}
					/>
				); // TODO Fix when BE logic is ready
			default:
				return (
					<ApplicationsSelectionContainer
						request={requestDraft}
						setCurrentStep={setCurrentStep}
						setRequestDraft={setRequestDraft}
						apps={request?.requests?.map(req => req.application as Application) || []} // TODO remove controls when be controls are ready
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
					className='overflow-hidden'
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
					<Tile>{contentToRender()}</Tile>
				</Layer>
			</FullWidthColumn>
		</Grid>
	);
};
export default NewEvidenceRequestFlowContainer;
