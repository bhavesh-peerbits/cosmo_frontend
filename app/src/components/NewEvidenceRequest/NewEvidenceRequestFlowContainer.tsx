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
						label={t('evidenceRequest:apps-selection')}
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
						label={t('evidenceRequest:users-selection')}
					/>
					<ProgressStep
						className='truncate'
						complete={requestDraft.text !== null}
						label={t('evidenceRequest:request-text')}
					/>
					<ProgressStep
						className='truncate'
						complete={
							!!requestDraft.stepInfo?.privateComment &&
							!!requestDraft.stepInfo.publicComment
						}
						secondaryLabel={t('evidenceRequest:optional-step')}
						label={t('evidenceRequest:additional-info')}
					/>
					<ProgressStep
						className='truncate'
						title={t('evidenceRequest:attachments')}
						complete={!!requestDraft.fileLinks?.length}
						label={t('evidenceRequest:attachments')}
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
