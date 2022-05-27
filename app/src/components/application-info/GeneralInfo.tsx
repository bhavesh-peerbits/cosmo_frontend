import { Column, Grid, TextInput } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import {
	Control,
	FieldErrors,
	useController,
	UseFormGetValues,
	UseFormRegister
} from 'react-hook-form';
import User from '@model/User';
import SingleUserSelect from '@components/SingleUserSelect';
import MultipleUserSelect from '@components/MultipleUserSelect';
import IconPicker, { icons } from '@components/IconPicker';
import TiptapEditor from '@components/tiptap/TiptapEditor';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import useGetApps from '@api/management/useGetApps';

export interface GeneralInfoForm {
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

type GeneralInfoProps = {
	register: UseFormRegister<GeneralInfoForm>;
	errors: FieldErrors<GeneralInfoForm>;
	control: Control<GeneralInfoForm>;
	getValues?: UseFormGetValues<GeneralInfoForm>;
};

const GeneralInfo = ({ register, errors, control, getValues }: GeneralInfoProps) => {
	const { data: apps = [] } = useGetApps();
	const [appNameList, setAppNameList] = useState<string[]>([]);
	const [appCodeList, setAppCodeList] = useState<string[]>([]);
	useEffect(() => {
		setAppNameList(
			getValues
				? apps
						.filter(app => app.name !== getValues('generalInfo.name').toLowerCase())
						.map(app => app.name.toLowerCase())
				: apps.map(app => app.name.toLowerCase())
		);
	}, [apps, getValues]);

	useEffect(() => {
		setAppCodeList(
			getValues
				? apps
						.filter(
							app => app.codeName !== getValues('generalInfo.codeName').toLowerCase()
						)
						.map(app => app.codeName.toLowerCase())
				: apps.map(app => app.codeName.toLowerCase())
		);
	}, [apps, getValues]);

	const { t } = useTranslation('applicationInfo');
	const {
		field: { onChange, value, ref, onBlur }
	} = useController({
		control,
		name: 'generalInfo.icon',
		rules: {
			required: true
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
		<Grid fullWidth>
			<FullWidthColumn>
				<IconPicker
					{...{ ref, onBlur }}
					className={cx({
						'outline outline-support-error': Boolean(errors.generalInfo?.icon)
					})}
					icon={value}
					onChange={onChange}
				/>
			</FullWidthColumn>
			<Column sm={4} md={8} lg={8} className='mb-5'>
				<TextInput
					className='w-full'
					id='name'
					invalidText={errors.generalInfo?.name?.message}
					labelText={`${t('name')} *`}
					placeholder={`${t('name')}`}
					helperText={`${t('application-name')}`}
					invalid={Boolean(errors.generalInfo?.name)}
					{...register('generalInfo.name', {
						required: {
							value: true,
							message: `${t('required')}`
						},
						validate: name =>
							!appNameList.includes(name.toLowerCase()) || `${t('name-exists')}`
					})}
				/>
			</Column>
			<Column sm={4} md={8} lg={8} className='mb-5'>
				<TextInput
					className='w-full'
					id='code'
					invalidText={errors.generalInfo?.codeName?.message}
					labelText={`${t('code')} *`}
					placeholder={`${t('code')}`}
					helperText={`${t('application-acronym')}`}
					invalid={Boolean(errors.generalInfo?.codeName)}
					{...register('generalInfo.codeName', {
						required: {
							value: true,
							message: `${t('required')}`
						},

						validate: code =>
							!appCodeList.includes(code.toLowerCase()) || `${t('code-exists')}`
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
					label={`${t('owner-delegates')}`}
					name='generalInfo.delegates'
				/>
			</FullWidthColumn>
			<Column sm={4} md={8} lg={8} className='mb-5'>
				<TextInput
					className='w-full'
					id='application-maintenance-supplier'
					labelText={t('app-maintenance')}
					placeholder={t('app-maintenance')}
					{...register('generalInfo.appMaintenance')}
				/>
			</Column>
			<Column sm={4} md={8} lg={8} className='mb-5'>
				<TextInput
					className='w-full'
					id='operation-supplier'
					labelText={t('operation-supplier')}
					placeholder={t('operation-supplier')}
					{...register('generalInfo.operationSupplier')}
				/>
			</Column>
			<FullWidthColumn>
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
		</Grid>
	);
};
export default GeneralInfo;
