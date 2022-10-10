import { Grid, Layer, TextArea } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import EvidenceRequestDraft from '@model/EvidenceRequestDraft';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface AdditionalInfoForm {
	publicComment: string;
	privateComment: string;
}

type AdditionalInfoContainerProps = {
	setIsNextActive: (val: boolean) => void;
	setRequestDraft: Dispatch<SetStateAction<EvidenceRequestDraft>>;
};
const AdditionalInfoContainer = ({
	setIsNextActive,
	setRequestDraft
}: AdditionalInfoContainerProps) => {
	const { t } = useTranslation(['evidenceRequest', 'modals']);
	const {
		register,
		watch,
		formState: { errors, isValid }
	} = useForm<AdditionalInfoForm>({
		mode: 'onChange',
		defaultValues: {
			publicComment: '',
			privateComment: ''
		}
	});

	useEffect(() => {
		if (isValid) {
			setRequestDraft(old => ({
				...old,
				stepInfo: {
					privateComment: watch('privateComment'),
					publicComment: watch('publicComment')
				}
			}));
		}
	});

	useEffect(() => {
		setIsNextActive(isValid || false);
	}, [isValid, setIsNextActive]);

	return (
		<Grid fullWidth narrow className='space-y-5'>
			<FullWidthColumn>
				<FullWidthColumn className='text-heading-3'>
					<span>{t('evidenceRequest:additional-info')}</span>
				</FullWidthColumn>
				<FullWidthColumn className='text-text-secondary text-body-long-1'>
					<span>Description to add</span>
				</FullWidthColumn>
			</FullWidthColumn>
			<FullWidthColumn>
				<Layer level={2}>
					<TextArea
						labelText={`${t('evidenceRequest:public-comment')} *`}
						invalid={Boolean(errors.publicComment)}
						invalidText={errors.publicComment?.message}
						placeholder={`${t('evidenceRequest:public-comment-placeholder')}.`}
						{...register('publicComment', {
							required: { value: true, message: `${t('modals:field-required')}` }
						})}
					/>
				</Layer>
			</FullWidthColumn>
			<FullWidthColumn>
				<Layer level={2}>
					<TextArea
						labelText={`${t('evidenceRequest:private-comment')} *`}
						invalid={Boolean(errors.privateComment)}
						invalidText={errors.privateComment?.message}
						placeholder={`${t('evidenceRequest:private-comment-placeholder')}.`}
						{...register('privateComment', {
							required: {
								value: true,
								message: `${t('modals:field-required')}`
							}
						})}
					/>
				</Layer>
			</FullWidthColumn>
		</Grid>
	);
};
export default AdditionalInfoContainer;
