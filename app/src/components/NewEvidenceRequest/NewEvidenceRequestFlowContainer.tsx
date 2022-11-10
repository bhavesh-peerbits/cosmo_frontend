/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Grid, ProgressStep, ProgressIndicator, Layer, Tile } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import evidenceRequestDraftStore from '@store/evidenceRequestDraft/evidenceRequestDraftStore';
import { useResponsive } from 'ahooks';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import AdditionalInfoContainer from './AdditionalInfoContainer';
import ApplicationsSelectionContainer from './ApplicationsSelectionContainer';
import AttachmentsContainer from './AttachmentsContainer';
import RequestTextContainer from './RequestTextContainer';
import UsersSelectionContainer from './UsersSelectionContainer';

const NewEvidenceRequestFlowContainer = () => {
	const { t } = useTranslation(['evidenceRequest', 'modals']);
	const { md } = useResponsive();
	const [currentStep, setCurrentStep] = useState(0);
	const requestDraft = useRecoilValue(evidenceRequestDraftStore);
	const isRequestDraftCompleted =
		!!requestDraft?.requests?.filter(req => req.selected).length &&
		!!requestDraft.requests?.filter(req => req.selected).length &&
		requestDraft.requests
			?.filter(req => req.selected)
			.map(req => req.steps.filter(step => step.type !== 'REQUEST'))
			.flat()
			.every(step => !!step.approvers?.length || step.reviewer) &&
		requestDraft.text !== null;

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
					/>
				);
			case 2:
				return <RequestTextContainer setCurrentStep={setCurrentStep} />;
			case 3:
				return <AdditionalInfoContainer setCurrentStep={setCurrentStep} />;
			case 4:
				return <AttachmentsContainer setCurrentStep={setCurrentStep} />; // TODO Fix when BE logic is ready
			default:
				return <ApplicationsSelectionContainer setCurrentStep={setCurrentStep} />;
		}
	};

	return (
		<Grid fullWidth narrow>
			<FullWidthColumn>
				<ProgressIndicator
					currentIndex={currentStep}
					className='overflow-x-auto pb-7 lg:overflow-x-hidden'
					spaceEqually={md}
				>
					<ProgressStep
						className='truncate'
						complete={!!requestDraft.requests?.filter(req => req.selected).length}
						label={
							isRequestDraftCompleted ? (
								<span
									title={t('evidenceRequest:apps-selection')}
									className='cursor-pointer'
									onClick={() => setCurrentStep(0)}
								>
									{t('evidenceRequest:apps-selection')}
								</span>
							) : (
								t('evidenceRequest:apps-selection')
							)
						}
					/>
					<ProgressStep
						className='truncate'
						complete={
							!!requestDraft.requests?.filter(req => req.selected).length &&
							requestDraft.requests
								?.filter(req => req.selected)
								.map(req => req.steps.filter(step => step.type !== 'REQUEST'))
								.flat()
								.every(step => !!step.approvers?.length || step.reviewer)
						}
						label={
							isRequestDraftCompleted ? (
								<span
									title={t('evidenceRequest:users-selection')}
									className='cursor-pointer'
									onClick={() => setCurrentStep(1)}
								>
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
							isRequestDraftCompleted ? (
								<span
									title={t('evidenceRequest:request-text')}
									className='cursor-pointer'
									onClick={() => setCurrentStep(2)}
								>
									{t('evidenceRequest:request-text')}
								</span>
							) : (
								t('evidenceRequest:request-text')
							)
						}
					/>
					<ProgressStep
						className='truncate'
						complete={
							!!requestDraft.stepInfo?.privateComment &&
							!!requestDraft.stepInfo.publicComment
						}
						secondaryLabel={t('evidenceRequest:optional-step')}
						label={
							isRequestDraftCompleted ? (
								<span
									title={t('evidenceRequest:additional-info')}
									className='cursor-pointer'
									onClick={() => setCurrentStep(3)}
								>
									{t('evidenceRequest:additional-info')}
								</span>
							) : (
								t('evidenceRequest:additional-info')
							)
						}
					/>
					<ProgressStep
						className=' truncate'
						title={t('evidenceRequest:attachments')}
						label={
							isRequestDraftCompleted ? (
								<span className='cursor-pointer' onClick={() => setCurrentStep(4)}>
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
