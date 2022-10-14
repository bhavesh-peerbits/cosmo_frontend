import ApiError from '@api/ApiError';
import useSaveDraft from '@api/evidence-request/useSaveDraft';
import { Button, Grid } from '@carbon/react';
import CosmoFileUploader from '@components/CosmoFileUploader';
import FullWidthColumn from '@components/FullWidthColumn';
import InlineLoadingStatus from '@components/InlineLoadingStatus';
import EvidenceRequestDraft from '@model/EvidenceRequestDraft';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type FormData = {
	file: File[];
};

type AttachmentsContainerProps = {
	setCurrentStep: (val: number) => void;
	requestDraft: EvidenceRequestDraft;
};
const AttachmentsContainer = ({
	setCurrentStep,
	requestDraft
}: AttachmentsContainerProps) => {
	const { t } = useTranslation(['evidenceRequest', 'modals']);
	const { mutate, isLoading, isError, isSuccess, error } = useSaveDraft();
	const { control } = useForm<FormData>({
		mode: 'onChange',
		criteriaMode: 'all'
	});
	const saveDraft = () => {
		return mutate(requestDraft);
	};

	return (
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
				<CosmoFileUploader
					label='Prova'
					name='file'
					rules={{
						required: true
					}}
					control={control}
				/>
			</FullWidthColumn>
			<InlineLoadingStatus
				{...{ isLoading, isSuccess, isError, error: error as ApiError }}
			/>
			<FullWidthColumn className='flex justify-end space-x-5'>
				<Button kind='secondary' size='md' onClick={() => setCurrentStep(3)}>
					{t('modals:back')}
				</Button>
				<Button size='md' onClick={saveDraft}>
					{t('modals:save')}
				</Button>
			</FullWidthColumn>
		</Grid>
	);
};
export default AttachmentsContainer;
