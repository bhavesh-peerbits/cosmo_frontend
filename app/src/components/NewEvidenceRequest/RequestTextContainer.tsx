import { Button, Grid } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import TiptapEditor from '@components/tiptap/TiptapEditor';
import EvidenceRequestDraft from '@model/EvidenceRequestDraft';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useController, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface RequestTextForm {
	requestText: string;
}
type RequestTextContainerProps = {
	setIsNextActive: (val: boolean) => void;
	setRequestDraft: Dispatch<SetStateAction<EvidenceRequestDraft>>;
};
const RequestTextContainer = ({
	setIsNextActive,
	setRequestDraft
}: RequestTextContainerProps) => {
	const { t } = useTranslation('evidenceRequest');
	const { control, watch } = useForm<RequestTextForm>({
		mode: 'onChange',
		defaultValues: {
			requestText: ''
		}
	});
	const requestText = watch('requestText');
	const {
		field: {
			onChange: onChangeRequestText,
			value: requestTextValue,
			ref: requestTextRef,
			onBlur: onBlurRequestText
		}
	} = useController({
		control,
		name: 'requestText'
	});

	useEffect(() => {
		setIsNextActive(requestText !== '<p></p>' && requestText !== null);
	}, [requestText, setIsNextActive]);

	useEffect(() => setRequestDraft(old => ({ ...old, suggestedText: requestText })));

	return (
		<Grid fullWidth narrow className='space-y-5'>
			<FullWidthColumn>
				<FullWidthColumn className='text-heading-3'>
					<span>{t('request-text')}</span>
				</FullWidthColumn>
				<FullWidthColumn className='text-text-secondary text-body-long-1'>
					<span>Description to add</span>
				</FullWidthColumn>
			</FullWidthColumn>
			<FullWidthColumn>
				<Button disabled={requestText !== '<p></p>'} kind='tertiary' size='sm'>
					Suggerisci text
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
		</Grid>
	);
};
export default RequestTextContainer;
