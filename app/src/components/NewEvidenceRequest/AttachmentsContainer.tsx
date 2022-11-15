import useSaveDraft from '@api/evidence-request/useSaveDraft';
import { Button, Grid, Layer, InlineLoading } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import UploaderS3 from '@components/util/UploaderS3';
import evidenceRequestUploaderStore from '@store/evidence-request/evidenceRequestUploaderStore';
import evidenceRequestDraftStore from '@store/evidenceRequestDraft/evidenceRequestDraftStore';
import { useTranslation } from 'react-i18next';
import { useRecoilState, useRecoilValue } from 'recoil';

type AttachmentsContainerProps = {
	setCurrentStep: (val: number) => void;
};
const AttachmentsContainer = ({ setCurrentStep }: AttachmentsContainerProps) => {
	const { t } = useTranslation(['evidenceRequest', 'modals', 'userRevalidation']);
	const requestDraft = useRecoilValue(evidenceRequestDraftStore);

	const path = `${new Date().getFullYear()}/${requestDraft.workflow.name}/${
		requestDraft.type
	}/${requestDraft.id}/1`.replaceAll(' ', '');

	const { mutate, isLoading } = useSaveDraft();
	const [closeUploadInfo, setCloseUploadInfo] = useRecoilState(
		evidenceRequestUploaderStore
	);
	const saveDraft = () => {
		if (closeUploadInfo.isDirty) {
			setCloseUploadInfo(old => ({ ...old, saveUpload: true }));
		}
		mutate(requestDraft);
	};

	const isRequestDraftCompleted =
		!!requestDraft?.requests?.filter(req => req.selected).length &&
		!!requestDraft.requests?.filter(req => req.selected).length &&
		requestDraft.requests
			?.filter(req => req.selected)
			.map(req => req.steps.filter(step => step.type !== 'REQUEST'))
			.flat()
			.every(step => !!step.approvers?.length || step.reviewer) &&
		requestDraft.text !== null;

	return (
		<Layer>
			<Grid fullWidth narrow className='space-y-5'>
				<FullWidthColumn>
					<FullWidthColumn className='text-heading-3'>
						<span>{t('evidenceRequest:attachments')}</span>
					</FullWidthColumn>
					<FullWidthColumn className='text-text-secondary text-body-long-1'>
						<span>{t('evidenceRequest:attachments-description')}.</span>
					</FullWidthColumn>
				</FullWidthColumn>
				<FullWidthColumn>
					<UploaderS3
						label={t('userRevalidation:upload-instructions')}
						parentFormDirty={false}
						path={path}
						additionalInfo={{ draftId: `${requestDraft.id}` }}
						alreadyUploaded={requestDraft.fileLinks}
					/>
				</FullWidthColumn>
				{isLoading && <InlineLoading />}
				<FullWidthColumn className='flex justify-end space-x-5'>
					<Button kind='secondary' size='md' onClick={() => setCurrentStep(3)}>
						{t('modals:back')}
					</Button>
					<Button
						size='md'
						onClick={saveDraft}
						disabled={!isRequestDraftCompleted || closeUploadInfo.isLoading}
					>
						{t('modals:save')}
					</Button>
				</FullWidthColumn>
			</Grid>
		</Layer>
	);
};
export default AttachmentsContainer;
