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
import { CampaignDtoLayerEnum, CampaignDtoTypeEnum } from 'cosmo-api/src/v1';
import { mapCampaignTypeToCampaignDisplayType } from '@model/UserRevalidation/CampaignType';
import useGetAllCampaigns from '@api/user-revalidation/useGetAllCampaigns';
import { useEffect, useMemo, useState } from 'react';
import { mapCampaignLayerToCampaignDisplayLayer } from '@model/UserRevalidation/CampaignLayer';

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
	const { t } = useTranslation(['modals', 'userRevalidation', 'applicationInfo']);
	const { data: campaignsList = new Map() } = useGetAllCampaigns();
	const [campaignsName, setCampaignsName] = useState<string[]>([]);
	const campaigns = useMemo(() => [...campaignsList.values()] || [], [campaignsList]);

	useEffect(() => {
		setCampaignsName(campaigns.map(campaign => campaign.name.toLowerCase()));
	}, [campaigns]);

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
			revalidationType: CampaignDtoTypeApiEnum.Firefighter,
			revalidationLayer: CampaignDtoLayerApiEnum.Os
		},
		mode: 'onChange'
	});
	const cleanUp = () => {
		reset();
		setIsOpen(false);
	};

	const revalidationTypes = Object.entries(CampaignDtoTypeEnum);
	const layers = Object.entries(CampaignDtoLayerEnum);

	const createNewCampaign = (data: CreateCampaignForm) => {
		mutate(
			{
				campaign: {
					id: '-1',
					applicationsCount: 0,
					name: data.campaignName,
					type: data.revalidationType,
					layer: data.revalidationLayer,
					contributors: [],
					archived: false
				}
			},
			{
				onSuccess: cleanUp
			}
		);
	};

	return (
		<ComposedModal size='xs' open={isOpen} onClose={cleanUp}>
			<ModalHeader title={t('userRevalidation:create-new')} closeModal={cleanUp} />
			<ModalBody className='m-0 space-y-4 pb-9'>
				<Form className='space-y-6'>
					<TextInput
						id='campaign-name'
						labelText={`${t('userRevalidation:campaign-name')}`}
						placeholder={t('userRevalidation:name-placeholder')}
						invalidText={errors.campaignName?.message}
						invalid={Boolean(errors.campaignName)}
						{...register('campaignName', {
							validate: name =>
								!campaignsName.includes(name.toLowerCase()) ||
								`${t('applicationInfo:name-exists')}`
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
							<SelectItem
								key={id}
								text={mapCampaignTypeToCampaignDisplayType(value as CampaignDtoTypeEnum)}
								value={value}
							/>
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
							<RadioButton
								key={id}
								labelText={mapCampaignLayerToCampaignDisplayLayer(
									id.toUpperCase() as CampaignDtoLayerEnum
								)}
								value={value}
							/>
						))}
					</RadioButtonGroup>
				</Form>
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
				<Button
					disabled={!isValid || isLoading}
					onClick={handleSubmit(createNewCampaign)}
				>
					{t('userRevalidation:create-campaign')}
				</Button>
			</ModalFooter>
		</ComposedModal>
	);
};
export default NewCampaignModal;
