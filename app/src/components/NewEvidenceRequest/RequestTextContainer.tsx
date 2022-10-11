import { Button, Grid } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import TiptapEditor from '@components/tiptap/TiptapEditor';
import EvidenceRequestDraft from '@model/EvidenceRequestDraft';
import { Dispatch, SetStateAction } from 'react';
import { useController, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface RequestTextForm {
	requestText: string;
}
type RequestTextContainerProps = {
	setCurrentStep: (val: number) => void;
	setRequestDraft: Dispatch<SetStateAction<EvidenceRequestDraft>>;
	requestDraft: EvidenceRequestDraft;
};
const RequestTextContainer = ({
	setCurrentStep,
	setRequestDraft,
	requestDraft
}: RequestTextContainerProps) => {
	const { t } = useTranslation(['evidenceRequest', 'modals']);

	const { control, watch } = useForm<RequestTextForm>({
		mode: 'onChange',

		defaultValues: {
			requestText: requestDraft.suggestedText
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
		setRequestDraft(old => ({ ...old, suggestedText: requestText }));
		setCurrentStep(3);
	};

	return (
		<Grid fullWidth narrow className='space-y-5'>
			<FullWidthColumn>
				<FullWidthColumn className='text-heading-3'>
					<span>{t('evidenceRequest:request-text')}</span>
				</FullWidthColumn>
				<FullWidthColumn className='text-text-secondary text-body-long-1'>
					<span>Description to add</span>
				</FullWidthColumn>
			</FullWidthColumn>
			<FullWidthColumn>
				<Button disabled={isValid && requestText !== '<p></p>'} kind='tertiary' size='sm'>
					{t('evidenceRequest:suggest-text')}
				</Button>
			</FullWidthColumn>
			<FullWidthColumn>
				<TiptapEditor
					content={requestTextValue}
					onChange={onChangeRequestText}
					onBlur={onBlurRequestText}
					ref={requestTextRef}
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
		</Grid>
	);
};
export default RequestTextContainer;
