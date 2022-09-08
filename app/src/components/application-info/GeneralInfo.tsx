import { Column, Grid, TextInput } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import {
	Control,
	FieldErrors,
	useController,
	UseFormGetValues,
	UseFormRegister,
	UseFormWatch
} from 'react-hook-form';
import User from '@model/User';
import SingleUserSelect from '@components/SingleUserSelect';
import MultipleUserSelect from '@components/MultipleUserSelect';
import IconPicker, { icons } from '@components/IconPicker';
import TiptapEditor from '@components/tiptap/TiptapEditor';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';
import { useEffect, useMemo, useState } from 'react';
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
		lastModify: Date;
		lastModifier: User;
		lastReview: Date;
		lastReviewer: User;
	};
}

type GeneralInfoProps = {
	watch?: UseFormWatch<GeneralInfoForm>;
	register: UseFormRegister<GeneralInfoForm>;
	errors: FieldErrors<GeneralInfoForm>;
	control: Control<GeneralInfoForm>;
	getValues?: UseFormGetValues<GeneralInfoForm>;
	excludesLastReview?: boolean;
	excludesLastModify?: boolean;
};

const GeneralInfo = ({
	register,
	watch,
	errors,
	control,
	getValues,
	excludesLastReview,
	excludesLastModify
}: GeneralInfoProps) => {
	const { data = new Map() } = useGetApps();
	const apps = useMemo(() => [...data.values()] || [], [data]);

	const [appNameList, setAppNameList] = useState<string[]>([]);
	const [appCodeList, setAppCodeList] = useState<string[]>([]);
	const selectedOwner = watch ? watch('generalInfo.owner') : undefined;
	const selectedDelegates = watch ? watch('generalInfo.delegates') : [];

	useEffect(() => {
		setAppNameList(
			getValues
				? apps
						.filter(
							app =>
								app.name.toLowerCase() !== getValues('generalInfo.name').toLowerCase()
						)
						.map(app => app.name.toLowerCase())
				: apps.map(app => app.name.toLowerCase())
		);
	}, [apps, getValues]);

	useEffect(() => {
		setAppCodeList(
			getValues
				? apps
						.filter(
							app =>
								app.codeName.toLowerCase() !==
								getValues('generalInfo.codeName').toLowerCase()
						)
						.map(app => app.codeName.toLowerCase())
				: apps.map(app => app.codeName.toLowerCase())
		);
	}, [apps, getValues]);

	const { t } = useTranslation(['applicationInfo', 'procedureInfo']);
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
					labelText={`${t('applicationInfo:name')} *`}
					placeholder={`${t('applicationInfo:name')}`}
					helperText={`${t('applicationInfo:application-name')}`}
					invalid={Boolean(errors.generalInfo?.name)}
					{...register('generalInfo.name', {
						required: {
							value: true,
							message: `${t('applicationInfo:required')}`
						},
						validate: name =>
							!appNameList.includes(name.toLowerCase()) ||
							`${t('applicationInfo:name-exists')}`
					})}
				/>
			</Column>
			<Column sm={4} md={8} lg={8} className='mb-5'>
				<TextInput
					className='w-full'
					id='code'
					invalidText={errors.generalInfo?.codeName?.message}
					labelText={`${t('applicationInfo:code')} *`}
					placeholder={`${t('applicationInfo:code')}`}
					helperText={`${t('applicationInfo:application-acronym')}`}
					invalid={Boolean(errors.generalInfo?.codeName)}
					{...register('generalInfo.codeName', {
						required: {
							value: true,
							message: `${t('applicationInfo:required')}`
						},
						pattern: {
							value: /^([a-zA-Z0-9\s._-]+)$/,
							message: t('applicationInfo:wrong-code-pattern')
						},
						validate: code =>
							!appCodeList.includes(code.toLowerCase()) ||
							`${t('applicationInfo:code-exists')}`
					})}
				/>
			</Column>
			<FullWidthColumn className='mb-5'>
				<SingleUserSelect
					control={control}
					label={`${t('applicationInfo:owner')} *`}
					name='generalInfo.owner'
					rules={{
						required: true
					}}
					excludedUsers={selectedDelegates}
				/>
			</FullWidthColumn>
			<FullWidthColumn className='mb-5'>
				<MultipleUserSelect
					control={control}
					label={`${t('applicationInfo:owner-delegates')}`}
					name='generalInfo.delegates'
					excludedUser={selectedOwner}
				/>
			</FullWidthColumn>
			<Column sm={4} md={8} lg={8} className='mb-5'>
				<TextInput
					className='w-full'
					id='application-maintenance-supplier'
					labelText={t('applicationInfo:app-maintenance')}
					placeholder={t('applicationInfo:app-maintenance')}
					{...register('generalInfo.appMaintenance')}
				/>
			</Column>
			<Column sm={4} md={8} lg={8} className='mb-5'>
				<TextInput
					className='w-full'
					id='operation-supplier'
					labelText={t('applicationInfo:operation-supplier')}
					placeholder={t('applicationInfo:operation-supplier')}
					{...register('generalInfo.operationSupplier')}
				/>
			</Column>
			{!excludesLastModify && (
				<>
					<Column sm={4} md={8} lg={8} className='mb-5'>
						<TextInput
							id='last-modifier'
							labelText={`${t('procedureInfo:last-modifier')}`}
							readOnly
							value={
								getValues && getValues('generalInfo.lastModifier')
									? getValues('generalInfo.lastModifier.displayName')
									: ''
							}
						/>
					</Column>
					<Column sm={4} md={8} lg={8} className='mb-5'>
						<TextInput
							id='last-modify'
							labelText={`${t('procedureInfo:last-modify')}`}
							readOnly
							value={
								getValues && getValues('generalInfo.lastModify')
									? getValues('generalInfo.lastModify').toLocaleString()
									: ''
							}
						/>
					</Column>
				</>
			)}
			{!excludesLastReview && (
				<>
					<Column sm={4} md={8} lg={8} className='mb-5'>
						<TextInput
							id='last-reviewer'
							labelText={`${t('procedureInfo:last-reviewer')}`}
							readOnly
							value={
								getValues && getValues('generalInfo.lastReviewer')
									? getValues('generalInfo.lastReviewer.displayName')
									: ''
							}
						/>
					</Column>
					<Column sm={4} md={8} lg={8} className='mb-5'>
						<TextInput
							id='last-review'
							labelText={`${t('procedureInfo:last-review')}`}
							readOnly
							value={
								getValues && getValues('generalInfo.lastReview')
									? getValues('generalInfo.lastReview').toLocaleString()
									: ''
							}
						/>
					</Column>
				</>
			)}

			<FullWidthColumn>
				<div>
					<p className='mb-3 text-text-secondary text-label-1'>
						{t('applicationInfo:description')}
					</p>
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
