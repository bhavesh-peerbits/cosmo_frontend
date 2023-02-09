import { Button, Grid, Form } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import TiptapEditor from '@components/tiptap/TiptapEditor';
import evidenceRequestDraftStore from '@store/evidenceRequestDraft/evidenceRequestDraftStore';
import { useState } from 'react';
import { useController, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';

interface RequestTextForm {
	requestText: string;
}
type RequestTextContainerProps = {
	setCurrentStep: (val: number) => void;
};
const RequestTextContainer = ({ setCurrentStep }: RequestTextContainerProps) => {
	const { t } = useTranslation(['evidenceRequest', 'modals']);
	const [resetTip, setResetTip] = useState(false);
	const [requestDraft, setRequestDraft] = useRecoilState(evidenceRequestDraftStore);

	const { control, watch, reset } = useForm<RequestTextForm>({
		mode: 'onChange',
		defaultValues: {
			requestText: requestDraft.text
		}
	});
	const requestText = watch('requestText');
	const {
		field: {
			onChange: onChangeRequestText,
			value: requestTextValue,
			ref: requestTextRef,
			onBlur: onBlurRequestText
		},
		formState: { isValid }
	} = useController({
		control,
		name: 'requestText',
		rules: { required: true }
	});

	const handleNext = () => {
		setRequestDraft(old => ({ ...old, text: requestText }));
		setCurrentStep(3);
	};

	return (
		<Grid fullWidth narrow className='space-y-5'>
			<FullWidthColumn>
				<FullWidthColumn className='text-heading-3'>
					<span>{t('evidenceRequest:request-text')}</span>
				</FullWidthColumn>
				<FullWidthColumn className='text-text-secondary text-body-long-1'>
					<span>{t('evidenceRequest:request-text-description')}.</span>
				</FullWidthColumn>
			</FullWidthColumn>
			<FullWidthColumn>
				<Form
					onReset={() => {
						reset();
						setResetTip(!resetTip);
					}}
					className='space-y-5'
				>
					<Button
						disabled={(isValid && requestText !== '<p></p>') || !requestDraft.text}
						kind='tertiary'
						size='sm'
						type='reset'
					>
						{t('evidenceRequest:suggest-text')}
					</Button>
					<FullWidthColumn>
						<TiptapEditor
							content={requestTextValue}
							onChange={onChangeRequestText}
							onBlur={onBlurRequestText}
							ref={requestTextRef}
							onReset={resetTip}
						/>
					</FullWidthColumn>
					<FullWidthColumn className='flex justify-end space-x-5'>
						<Button kind='secondary' size='md' onClick={() => setCurrentStep(1)}>
							{t('modals:back')}
						</Button>
						<Button
							size='md'
							disabled={!isValid || requestText === '<p></p>'}
							onClick={handleNext}
						>
							{t('modals:next')}
						</Button>
					</FullWidthColumn>
				</Form>
			</FullWidthColumn>
		</Grid>
	);
};
export default RequestTextContainer;
