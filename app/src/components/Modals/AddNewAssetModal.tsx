import { Form, Grid, TextInput, Column, Select, SelectItem } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import TearsheetNarrow from '@components/Tearsheet/TearsheetNarrow';
import Instance from '@model/Instance';
import { AssetDtoTypeEnum, AssetDtoOsEnum } from 'cosmo-api/src/v1';
import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type NewAssetFormData = {
	hostname: string;
	ports: string;
	type: AssetDtoTypeEnum;
	os: AssetDtoOsEnum;
	ip: string;
	dbVersion: string;
	dbType: string;
};

type AddNewAssetModalProps = {
	isOpen: 'new' | 'existing' | undefined;
	setIsOpen: Dispatch<SetStateAction<'new' | 'existing' | undefined>>;
	instance: Instance;
};
const AddNewAssetModal = ({ isOpen, setIsOpen, instance }: AddNewAssetModalProps) => {
	const { t } = useTranslation(['modals', 'applicationInstances']);
	// const [isNewSelected, setIsNewSelected] = useState(false);

	const {
		register,
		watch,
		formState: { isValid, errors }
	} = useForm<NewAssetFormData>({ mode: 'onChange' });

	const cleanUp = () => {
		setIsOpen(undefined);
	};
	// TODO remove last comma in ports
	return (
		<TearsheetNarrow
			hasCloseIcon
			label={instance.name}
			title={t('applicationInstances:add-new-asset-instance')}
			open={isOpen === 'new'}
			onClose={cleanUp}
			actions={[
				{
					label: t('modals:cancel'),
					kind: 'secondary',
					onClick: cleanUp,
					id: 'cancel-send-focal-point'
				},
				{
					label: t('modals:create'),
					id: 'send-focal-point',
					disabled: !isValid
					// onClick: handleSubmit(createInstance)
				}
			]}
		>
			<Form className='space-y-5 pl-5'>
				<Grid narrow fullWidth className='space-y-5'>
					{/* <FullWidthColumn>
						<Toggle
							labelA='Nuovo'
							labelB='Esistente'
							labelText='Asset da aggiungere'
							id='new-asset-togddgle'
							aria-label='New Asset Toggle'
							toggled={isNewSelected}
							onToggle={() => {
								setIsNewSelected(!isNewSelected);
							}}
						/>
					</FullWidthColumn> */}
					<FullWidthColumn>
						<TextInput
							id='new-asset-hostname-input'
							labelText='Hostname *'
							placeholder={t('applicationInstances:hostname-placeholder')}
							invalid={Boolean(errors.hostname)}
							invalidText={errors.hostname?.message}
							{...register(`hostname`, {
								required: { value: true, message: t('modals:field-required') }
							})}
						/>
					</FullWidthColumn>
					<FullWidthColumn>
						<TextInput
							id='new-asset-ip-input'
							labelText='IP *'
							placeholder={t('applicationInstances:ip-placeholder')}
							invalid={Boolean(errors.ip)}
							invalidText={errors.ip?.message}
							{...register(`ip`, {
								required: { value: true, message: t('modals:field-required') }
							})}
						/>
					</FullWidthColumn>
					<FullWidthColumn>
						<TextInput
							id='new-asset-ports-input'
							labelText={t('applicationInstances:ports')}
							placeholder={t('applicationInstances:ports-input-placeholder')}
							{...register('ports', {
								pattern: {
									value: /^([0-9]+,?)+$/,
									message: t('applicationInstances:error-ports-input')
								},
								validate: ports =>
									ports.length > 0 &&
									(ports.split(',').every(port => +port < 65535) ||
										t('applicationInstances:erros-ports-greater'))
							})}
						/>
					</FullWidthColumn>
					<Column lg={8} md={4} sm={4}>
						<Select
							id='new-asset-os-select'
							labelText={`${t('applicationInstances:operating-system')} *`}
							{...register(`os`, {
								required: { value: true, message: t('modals:field-required') }
							})}
						>
							<SelectItem text='Windows' value='WINDOWS' />
							<SelectItem text='Unix' value='UNIX' />
							<SelectItem text='Mainframe' value='MAINFRAME' />
						</Select>
					</Column>
					<Column lg={8} md={4} sm={4}>
						<Select
							id='new-asset-type-select'
							labelText={`${t('applicationInstances:asset-type')} *`}
							{...register(`type`, {
								required: { value: true, message: t('modals:field-required') }
							})}
						>
							<SelectItem text={t('applicationInstances:operating-system')} value='OS' />
							<SelectItem text='Database' value='DB' />
						</Select>
					</Column>
					<Column lg={8} md={4} sm={4}>
						<TextInput
							id='new-asset-db-version-input'
							labelText={`${t('applicationInstances:db-version')} ${
								watch(`type`) !== 'OS' ? ' *' : ''
							}`}
							invalid={Boolean(errors.dbVersion)}
							invalidText={errors.dbVersion?.message}
							disabled={watch(`type`) === 'OS'}
							{...register(`dbVersion`, {
								required: {
									value: watch(`type`) !== 'OS',
									message: t('modals:field-required')
								}
							})}
						/>
					</Column>
					<Column lg={8} md={4} sm={4}>
						<TextInput
							id='new-asset-db-type-input'
							labelText={`${t('applicationInstances:db-type')} ${
								watch(`type`) !== 'OS' ? ' *' : ''
							}`}
							invalid={Boolean(errors.dbType)}
							invalidText={errors.dbType?.message}
							disabled={watch(`type`) === 'OS'}
							{...register(`dbType`, {
								required: {
									value: watch(`type`) !== 'OS',
									message: t('modals:field-required')
								}
							})}
						/>
					</Column>
				</Grid>
				{/* {isError && (
					<div className='mt-5 flex items-center justify-center'>
						<InlineNotification
							kind='error'
							title='Error'
							hideCloseButton
							subtitle={
								(error as ApiError)?.message ||
								'An error has occurred, please try again later'
							}
						/>
					</div>
				)} */}
			</Form>
		</TearsheetNarrow>
	);
};
export default AddNewAssetModal;
