import TipTapEditor from '@components/tiptap/TiptapEditor';
import { TextArea, Button, Form, Layer } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { useController, useForm } from 'react-hook-form';
import EvidenceRequestStep from '@model/EvidenceRequestStep';
import { useState } from 'react';
import UploaderS3 from '@components/util/UploaderS3';
import useSaveStep from '@api/evidence-request/useSaveStep';
import FileLinkTable from './FileLinkTable';

interface StepRequestTextForm {
	stepRequestText: string;
	publicComment: string;
	privateComment: string;
}

const EvidenceRequestInfo = ({
	stepRequest,
	currentStep,
	status,
	disabled,
	action,
	path
}: {
	stepRequest: EvidenceRequestStep;
	currentStep: number;
	status: string;
	disabled?: boolean;
	action?: boolean;
	path?: string;
}) => {
	const { t } = useTranslation(['evidenceRequest', 'userRevalidation']);
	const [resetTip, setResetTip] = useState(false);
	const { mutate } = useSaveStep();

	const {
		register,
		control,
		reset,
		handleSubmit,
		formState: { isDirty }
	} = useForm<StepRequestTextForm>({
		mode: 'onChange',
		defaultValues: {
			stepRequestText: stepRequest.text,
			publicComment: stepRequest.stepInfo?.publicComment,
			privateComment: stepRequest.stepInfo?.privateComment
		}
	});
	const {
		field: {
			onChange: onChangeDescription,
			value: descriptionValue,
			ref: descriptionRef,
			onBlur: onBlurDescription
		}
	} = useController({
		control,
		name: 'stepRequestText'
	});

	const handleSaveStep = (data: StepRequestTextForm) => {
		mutate({
			step: {
				...stepRequest,
				stepInfo: {
					publicComment: data.publicComment,
					privateComment: data.privateComment
				},
				text: descriptionValue
			}
		});
	};

	const attachmentsContent = () => {
		if (disabled || `${currentStep}` !== '1') {
			return stepRequest.fileLinks.length > 0 ? (
				<FileLinkTable files={stepRequest.fileLinks} />
			) : (
				<span className='italic text-text-secondary'>
					{t('evidenceRequest:no-attachment')}
				</span>
			);
		}
		return (
			<UploaderS3
				alreadyUploaded={stepRequest.fileLinks}
				parentFormDirty={isDirty}
				label={t('userRevalidation:upload-instructions')}
				additionalInfo={{ stepId: `${stepRequest.id}` }}
				path={path || ''}
			/>
		);
	};

	if (!stepRequest) {
		return null;
	}

	return (
		<Form
			onReset={() => {
				reset({
					stepRequestText: stepRequest.text,
					publicComment: stepRequest.stepInfo?.publicComment,
					privateComment: stepRequest.stepInfo?.privateComment
				});
				setResetTip(!resetTip);
			}}
		>
			<div className='bg-layer-2 px-5 py-5'>
				<p className='text-productive-heading-3'>{t('evidenceRequest:request-text')}</p>
				<div className='h-max-[400px] mt-6'>
					<TipTapEditor
						content={descriptionValue}
						onChange={onChangeDescription}
						onBlur={onBlurDescription}
						ref={descriptionRef}
						onReset={resetTip}
						readOnly={disabled || status !== 'IN_PROGRESS' || `${currentStep}` !== '1'}
						className='max-h-[300px] overflow-y-auto'
					/>
				</div>
			</div>
			<div className='mt-5 space-y-5 bg-layer-2 px-5 py-5'>
				<p className='text-productive-heading-3'>
					{t('evidenceRequest:additional-info')}
				</p>
				<div className='space-y-3'>
					<p>{t('evidenceRequest:attachments')}</p>
					{attachmentsContent()}
				</div>
				<Layer level={2}>
					<TextArea
						labelText={t('evidenceRequest:public-comment')}
						{...register('publicComment')}
						disabled={disabled || status !== 'IN_PROGRESS'}
					/>
				</Layer>
				{!action && (
					<Layer level={2}>
						<TextArea
							labelText={t('evidenceRequest:private-comment')}
							{...register('privateComment')}
							disabled={disabled || status !== 'IN_PROGRESS'}
						/>
					</Layer>
				)}
			</div>
			<div className='space-x-5 p-5 text-right'>
				{disabled ||
					(status === 'IN_PROGRESS' && (
						<>
							<Button kind='secondary' size='md' type='reset'>
								{t('evidenceRequest:reset')}
							</Button>
							<Button size='md' onClick={handleSubmit(handleSaveStep)}>
								{t('evidenceRequest:save')}
							</Button>
						</>
					))}
			</div>
		</Form>
	);
};

export default EvidenceRequestInfo;
