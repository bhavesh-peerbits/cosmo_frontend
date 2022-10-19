import useGetUsersByRoles from '@api/user/useGetUsersByRoles';
import { Button, Grid, Layer, TextArea } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import MultipleUserSelect from '@components/MultipleUserSelect';
import EvidenceRequestDraft from '@model/EvidenceRequestDraft';
import User from '@model/User';
import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface AdditionalInfoForm {
	collaborators: User[];
	publicComment: string;
	privateComment: string;
}

type AdditionalInfoContainerProps = {
	setCurrentStep: (val: number) => void;
	setRequestDraft: Dispatch<SetStateAction<EvidenceRequestDraft>>;
	requestDraft: EvidenceRequestDraft;
};
const AdditionalInfoContainer = ({
	setCurrentStep,
	setRequestDraft,
	requestDraft
}: AdditionalInfoContainerProps) => {
	const { t } = useTranslation(['evidenceRequest', 'modals']);
	const {
		control,
		register,
		watch,
		formState: { errors, isValid }
	} = useForm<AdditionalInfoForm>({
		mode: 'onChange',
		defaultValues: {
			collaborators: requestDraft.collaborators,
			publicComment: requestDraft.stepInfo?.publicComment,
			privateComment: requestDraft.stepInfo?.privateComment
		}
	});

	const handleNext = () => {
		setRequestDraft(old => ({
			...old,
			collaborators: watch('collaborators'),
			stepInfo: {
				privateComment: watch('privateComment'),
				publicComment: watch('publicComment')
			}
		}));
		setCurrentStep(4);
	};

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
				<MultipleUserSelect
					control={control}
					label={t('evidenceRequest:collaborators')}
					name='collaborators'
					level={1}
					defaultValue={requestDraft.collaborators}
					getUserFn={() => {
						// eslint-disable-next-line react-hooks/rules-of-hooks
						return useGetUsersByRoles('REQUEST_ADMIN', 'REQUEST_ANALYST');
					}}
					key={`collaborators-${requestDraft.id}`}
				/>
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
			<FullWidthColumn className='flex justify-end space-x-5'>
				<Button kind='secondary' size='md' onClick={() => setCurrentStep(2)}>
					{t('modals:back')}
				</Button>
				<Button size='md' disabled={!isValid} onClick={handleNext}>
					{t('modals:next')}
				</Button>
			</FullWidthColumn>
		</Grid>
	);
};
export default AdditionalInfoContainer;
