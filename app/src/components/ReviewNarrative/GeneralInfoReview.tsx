import { Button, Column, Form, Grid, TextInput } from '@carbon/react';
import User from '@model/User';
import { icons } from '@components/IconPicker';
import FullWidthColumn from '@components/FullWidthColumn';
import MultipleUserSelect from '@components/MultipleUserSelect';
import SingleUserSelect from '@components/SingleUserSelect';
import { useController, useForm } from 'react-hook-form';
import TiptapEditor from '@components/tiptap/TiptapEditor';
import { Checkmark } from '@carbon/react/icons';
import { useState } from 'react';
import Application from '@model/Application';
import { useTranslation } from 'react-i18next';

interface GeneralInfoForm {
	generalInfo: {
		name: string;
		icon: keyof typeof icons;
		codeName: string;
		owner: User;
		description: string;
		delegates: User[];
		appMaintenance: string;
		operationSupplier: string;
	};
}

interface GeneralInfoReviewProps {
	application: Application;
}

const GeneralInfoReview = ({ application }: GeneralInfoReviewProps) => {
	const { t } = useTranslation('applicationInfo');
	const { applicationData } = application;
	const [isConfirmed, setIsConfirmed] = useState(false);
	const {
		control,
		register,
		reset,
		formState: { errors, isValid, isDirty }
	} = useForm<GeneralInfoForm>({
		mode: 'onChange',
		defaultValues: {
			generalInfo: {
				name: application.name,
				codeName: application.codeName,
				icon: application.icon,
				owner: application.owner,
				description: application.description,
				delegates: application.delegates,
				appMaintenance: applicationData?.appMaintenance,
				operationSupplier: applicationData?.operationSupplier
			}
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
		name: 'generalInfo.description'
	});

	return (
		<Form>
			<Grid fullWidth>
				<Column sm={4} md={8} lg={8} className='mb-5'>
					<TextInput
						className='w-full'
						id='name'
						invalidText={errors.generalInfo?.name?.message}
						labelText={`${t('name')} *`}
						placeholder={`${t('name')} *`}
						helperText={`${t('application-name')} *`}
						invalid={Boolean(errors.generalInfo?.name)}
						{...register('generalInfo.name', {
							required: {
								value: true,
								message: `${t('required')}`
							}
						})}
					/>
				</Column>
				<Column sm={4} md={8} lg={8} className='mb-5'>
					<TextInput
						className='w-full'
						id='code'
						invalidText={errors.generalInfo?.codeName?.message}
						labelText={`${t('code')} *`}
						placeholder={`${t('code')} *`}
						helperText={`${t('application-acronym')}`}
						invalid={Boolean(errors.generalInfo?.codeName)}
						{...register('generalInfo.codeName', {
							required: {
								value: true,
								message: `${t('required')}`
							}
						})}
					/>
				</Column>
				<FullWidthColumn className='mb-5'>
					<SingleUserSelect
						control={control}
						label={`${t('owner')} *`}
						name='generalInfo.owner'
						rules={{
							required: true
						}}
					/>
				</FullWidthColumn>
				<FullWidthColumn className='mb-5'>
					<MultipleUserSelect
						control={control}
						label={`${t('owner-delegates')} *`}
						name='generalInfo.delegates'
					/>
				</FullWidthColumn>
				<Column sm={4} md={8} lg={8} className='mb-5'>
					<TextInput
						className='w-full'
						id='application-maintenance-supplier'
						labelText='Application Maintenance Supplier'
						placeholder='Application maintenance supplier'
						{...register('generalInfo.appMaintenance')}
					/>
				</Column>
				<Column sm={4} md={8} lg={8} className='mb-5'>
					<TextInput
						className='w-full'
						id='operation-supplier'
						labelText='Operation Supplier'
						placeholder='Operation supplier'
						{...register('generalInfo.operationSupplier')}
					/>
				</Column>
				<FullWidthColumn className='mb-5'>
					<div>
						<p className='mb-3 text-text-secondary text-label-1'> {t('description')} </p>
						<TiptapEditor
							content={descriptionValue}
							onChange={onChangeDescription}
							onBlur={onBlurDescription}
							ref={descriptionRef}
						/>
					</div>
				</FullWidthColumn>

				<FullWidthColumn className='flex justify-end'>
					<div className='flex w-full flex-1 items-center justify-end space-x-5'>
						<Button
							type='reset'
							kind='tertiary'
							disabled={!isDirty || isConfirmed}
							onClick={() => reset()}
						>
							Discard Changes
						</Button>
						{isConfirmed ? (
							<div className='flex h-8 items-center space-x-2 text-link-primary'>
								<p className='text-body-short-2'>{t('confirmed')}</p>
								<Checkmark />
							</div>
						) : (
							<Button
								type='submit'
								onClick={() => setIsConfirmed(true)}
								disabled={!isValid}
							>
								{t('confirm')}
							</Button>
						)}
					</div>
				</FullWidthColumn>
			</Grid>
		</Form>
	);
};
export default GeneralInfoReview;
