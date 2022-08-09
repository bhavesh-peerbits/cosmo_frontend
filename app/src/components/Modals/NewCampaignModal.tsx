import {
	ComposedModal,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	RadioButton,
	RadioButtonGroup,
	TextInput,
	Select,
	SelectItem,
	Form,
	InlineNotification
} from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import {
	CampaignDtoLayerApi,
	CampaignDtoLayerApiEnum,
	CampaignDtoTypeApi,
	CampaignDtoTypeApiEnum
} from 'cosmo-api/src';
import useCreateCampaign from '@api/user-revalidation/useCreateCampaign';
import ApiError from '@api/ApiError';

type NewCampaignModalProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
};

interface CreateCampaignForm {
	campaignName: string;
	revalidationType: CampaignDtoTypeApi;
	revalidationLayer: CampaignDtoLayerApi;
}

const NewCampaignModal = ({ isOpen, setIsOpen }: NewCampaignModalProps) => {
	const { t } = useTranslation(['modals', 'userRevalidation']);
	const { mutate, isLoading, error, isError: isApiError } = useCreateCampaign();
	const {
		handleSubmit,
		register,
		reset,
		setValue,
		getValues,
		formState: { isValid, errors }
	} = useForm<CreateCampaignForm>({
		defaultValues: {
			campaignName: '',
			revalidationType: CampaignDtoTypeApiEnum.Firefight,
			revalidationLayer: CampaignDtoLayerApiEnum.Os
		},
		mode: 'onChange'
	});
	const cleanUp = () => {
		reset();
		setIsOpen(false);
	};

	const revalidationTypes = Object.entries(CampaignDtoTypeApiEnum);
	const layers = Object.entries(CampaignDtoLayerApiEnum);

	const createNewCampaign = (data: CreateCampaignForm) => {
		mutate({
			campaign: {
				id: '-1',
				applicationsCount: 0,
				name: data.campaignName,
				type: data.revalidationType,
				layer: data.revalidationLayer,
				contributors: [],
				archived: false
			}
		});
	};

	return (
		<ComposedModal size='xs' open={isOpen} onClose={cleanUp}>
			<ModalHeader title={t('userRevalidation:create-new')} closeModal={cleanUp} />
			<Form onSubmit={handleSubmit(createNewCampaign)}>
				<ModalBody className='m-0 space-y-4 pb-9'>
					<TextInput
						id='campaign-name'
						labelText={`${t('userRevalidation:campaign-name')} *`}
						placeholder={t('userRevalidation:name-placeholder')}
						invalidText={errors.campaignName?.message}
						invalid={Boolean(errors.campaignName)}
						{...register('campaignName', {
							required: {
								value: true,
								message: t('userRevalidation:campaign-name-required')
							}
						})}
					/>
					<Select
						id='revalidation-types'
						labelText={`${t('userRevalidation:revalidation-type')} *`}
						{...register('revalidationType', {
							required: true
						})}
					>
						{revalidationTypes.map(([id, value]) => (
							<SelectItem key={id} text={id} value={value} />
						))}
					</Select>
					<RadioButtonGroup
						orientation='vertical'
						legendText={`${t('userRevalidation:layer')} *`}
						onChange={value => {
							setValue('revalidationLayer', value as CampaignDtoLayerApi);
						}}
						defaultSelected={getValues('revalidationLayer')}
						name='revalidation-layer'
					>
						{layers.map(([id, value]) => (
							<RadioButton className='uppercase' key={id} labelText={id} value={value} />
						))}
					</RadioButtonGroup>
					{isApiError && (
						<InlineNotification
							kind='error'
							title='Error'
							hideCloseButton
							subtitle={
								(error as ApiError)?.message ||
								'An error has occurred, please try again later'
							}
						/>
					)}
				</ModalBody>
				<ModalFooter>
					<Button kind='secondary' onClick={cleanUp}>
						{t('modals:cancel')}
					</Button>
					<Button disabled={!isValid || isLoading} type='submit'>
						{t('userRevalidation:create-campaign')}
					</Button>
				</ModalFooter>
			</Form>
		</ComposedModal>
	);
};
export default NewCampaignModal;
