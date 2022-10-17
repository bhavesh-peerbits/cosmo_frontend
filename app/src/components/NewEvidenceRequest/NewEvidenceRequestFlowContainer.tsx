/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Grid, ProgressStep, ProgressIndicator, Layer, Tile } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
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
						apps={
							request?.requests
								?.sort((a, b) => Number(b.selected) - Number(a.selected))
								.map(req => req.application) || []
						}
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
						complete={
							requestDraft.requests
								?.filter(req => req.selected)
								.map(req => req.application) &&
							requestDraft.requests
								?.filter(req => req.selected)
								.map(req => req.application).length > 0
						}
						label={
							<span className='cursor-pointer' onClick={() => setCurrentStep(0)}>
								{t('evidenceRequest:apps-selection')}
							</span>
						}
					/>
					<ProgressStep
						className='truncate'
						complete={requestDraft.requests
							?.filter(req => req.selected)
							.every(req => req.steps.some(step => step.approvers && step.reviewer))}
						label={
							requestDraft.requests?.filter(req => req.selected).length ? (
								<span className='cursor-pointer' onClick={() => setCurrentStep(1)}>
									{t('evidenceRequest:users-selection')}
								</span>
							) : (
								t('evidenceRequest:users-selection')
							)
						}
					/>
					<ProgressStep
						className='truncate'
						complete={requestDraft.text !== null}
						label={
							requestDraft.requests?.filter(req =>
								req.steps.find(step => step.approvers?.length)
							).length ? (
								<span className='cursor-pointer' onClick={() => setCurrentStep(2)}>
									{t('evidenceRequest:request-text')}
								</span>
							) : (
								t('evidenceRequest:request-text')
							)
						}
					/>
					<ProgressStep
						className='truncate'
						complete={requestDraft.stepInfo !== null}
						label={
							requestDraft.text ? (
								<span className='cursor-pointer' onClick={() => setCurrentStep(3)}>
									{t('evidenceRequest:additional-info')}
								</span>
							) : (
								t('evidenceRequest:additional-info')
							)
						}
					/>
					<ProgressStep
						className=' truncate'
						label={
							requestDraft.stepInfo ? (
								<span className='cursor-pointer' onClick={() => setCurrentStep(3)}>
									{t('evidenceRequest:attachments')}
								</span>
							) : (
								t('evidenceRequest:attachments')
							)
						}
					/>
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
