import TipTapEditor from '@components/tiptap/TiptapEditor';
import { TextArea, Button, Form } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { useController, useForm } from 'react-hook-form';
import EvidenceRequestStep from '@model/EvidenceRequestStep';
import { useState } from 'react';

interface StepRequestTextForm {
	stepRequestText: string;
}

const EvidenceRequestInfo = ({
	stepRequest,
	currentStep
}: {
	stepRequest: EvidenceRequestStep;
	currentStep: number;
}) => {
	const defaultValue = {
		publicComment: stepRequest.stepInfo
			? JSON.parse(stepRequest.stepInfo).publicComment
			: '',
		privateComment: stepRequest.stepInfo
			? JSON.parse(stepRequest.stepInfo).privateComment
			: ''
	};
	const [stepInfo, setStepInfo] = useState(defaultValue);
	const { t } = useTranslation('evidenceRequest');
	const [resetTip, setResetTip] = useState(false);
	const { control, reset } = useForm<StepRequestTextForm>({
		mode: 'onChange',
		defaultValues: {
			stepRequestText: stepRequest.text
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
	if (!stepRequest) {
		return null;
	}

	return (
		<Form
			onReset={() => {
				setStepInfo(defaultValue);
				reset({ stepRequestText: stepRequest.text });
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
						readOnly={`${currentStep}` !== '1'}
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
						value={stepInfo.publicComment}
						onChange={e => {
							setStepInfo(old => ({ ...old, publicComment: e.currentTarget?.value }));
						}}
					/>
				</div>
				<div className='space-y-2'>
					<p>{t('private-comment')}</p>
					<TextArea
						labelText=''
						value={stepInfo.privateComment}
						onChange={e => {
							setStepInfo(old => ({ ...old, privateComment: e.currentTarget?.value }));
						}}
					/>
				</div>
			</div>
			<div className='space-x-5 p-5 text-right'>
				<Button kind='secondary' type='reset'>
					{t('reset')}
				</Button>
				<Button>{t('save')}</Button>
			</div>
		</Form>
	);
};

export default EvidenceRequestInfo;
