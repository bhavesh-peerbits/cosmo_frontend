import TipTapEditor from '@components/tiptap/TiptapEditor';
import { TextArea, Button, Form } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { useController, useForm } from 'react-hook-form';
import EvidenceRequestStep from '@model/EvidenceRequestStep';
import { useState } from 'react';
import useSaveStep from '@api/evidence-request/useSaveStep';

interface StepRequestTextForm {
	stepRequestText: string;
	publicComment: string;
	privateComment: string;
}

const EvidenceRequestInfo = ({
	stepRequest,
	currentStep,
	status,
	disabled
}: {
	stepRequest: EvidenceRequestStep;
	currentStep: number;
	status: string;
	disabled?: boolean;
}) => {
	const { t } = useTranslation('evidenceRequest');
	const [resetTip, setResetTip] = useState(false);
	const { mutate } = useSaveStep();

	const { register, control, reset, handleSubmit } = useForm<StepRequestTextForm>({
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
			<div className='bg-background px-5 py-5'>
				<p className='text-productive-heading-3'>{t('request-text')}</p>
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
			<div className='mt-7 space-y-5 bg-background px-5 py-5'>
				<p className='text-productive-heading-3'>{t('additional-info')}</p>
				<div className='space-y-2'>
					<p>{t('attachments')}</p>
					<p className='text-body-compact-1'>placeholder attachment files</p>
				</div>
				<div className='space-y-2'>
					<p>{t('public-comment')}</p>
					<TextArea
						labelText=''
						{...register('publicComment')}
						disabled={disabled || status !== 'IN_PROGRESS'}
					/>
				</div>
				<div className='space-y-2'>
					<p>{t('private-comment')}</p>
					<TextArea
						labelText=''
						{...register('privateComment')}
						disabled={disabled || status !== 'IN_PROGRESS'}
					/>
				</div>
			</div>
			<div className='space-x-5 p-5 text-right'>
				{disabled ||
					(status === 'IN_PROGRESS' && (
						<>
							<Button kind='secondary' type='reset' size='md'>
								{t('reset')}
							</Button>
							<Button onClick={handleSubmit(handleSaveStep)}>{t('save')}</Button>
						</>
					))}
			</div>
		</Form>
	);
};

export default EvidenceRequestInfo;
