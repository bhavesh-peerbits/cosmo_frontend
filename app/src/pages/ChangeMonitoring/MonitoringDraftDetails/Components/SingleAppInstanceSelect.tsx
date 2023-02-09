import { Button, FormLabel, Tile } from '@carbon/react';
import { Close, EditOff, Add } from '@carbon/react/icons';
import SingleAddSelect from '@components/SingleAddSelect';
import { useState } from 'react';
import {
	FieldPath,
	FieldValues,
	PathValue,
	UnpackNestedValue,
	useController,
	UseControllerProps
} from 'react-hook-form';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';
import Application from '@model/Application';
import Instance from '@model/Instance';

type SingleInstanceSelectProps<
	T extends FieldValues,
	TName extends FieldPath<T>
> = UnpackNestedValue<PathValue<T, TName>> extends Instance
	? {
			label: string;
			name: TName;
			control: UseControllerProps<T, TName>['control'];
			rules?: UseControllerProps<T, TName>['rules'];
			level?: number;
			helperText?: string;
			readOnly?: boolean;
			defaultValue?: Application;
			excludedApps?: string[];
			instances: Instance[];
	  }
	: never;

const SingleApplicationSelect = <T extends FieldValues, TName extends FieldPath<T>>({
	label,
	control,
	name,
	rules,
	level = 1,
	helperText,
	readOnly,
	defaultValue,
	instances
}: SingleInstanceSelectProps<T, TName>) => {
	const { t } = useTranslation(['applicationSelect', 'changeMonitoring']);
	const {
		field: { onChange, onBlur, value: formValue, ref },
		fieldState: { invalid, error }
	} = useController({
		name,
		control,
		rules,
		defaultValue: defaultValue as UnpackNestedValue<PathValue<T, TName>>
	});
	const value = formValue as Application | undefined;
	const [openSearch, setOpenSearch] = useState(false);
	const invalidText = error?.message;

	return (
		<>
			<div className='flex w-full flex-wrap justify-end md:flex-nowrap'>
				<div className='flex w-full flex-col'>
					<FormLabel className='mb-3'>
						<span>{label}</span>
					</FormLabel>
					<div className='flex w-full  flex-auto flex-col'>
						<div className='flex w-full items-center'>
							<Tile
								{...{
									ref,
									onBlur,
									name
								}}
								className={cx(
									'relative flex h-container-3 min-h-fit w-full items-center border-b-[1px] border-solid border-border-strong-1 p-0',
									{
										'bg-field-1': level === 0,
										'bg-field-2': level === 1,
										'bg-field-3': level === 2,
										'outline-support-error': invalid
									}
								)}
							>
								<div className='absolute top-1/2 right-2 -translate-y-1/2'>
									{readOnly && (
										<div className='pr-4'>
											<EditOff />
										</div>
									)}
									{!readOnly &&
										(value ? (
											<Button
												kind='ghost'
												size='sm'
												renderIcon={() => <Close size={20} />}
												hasIconOnly
												iconDescription={t('applicationSelect:remove')}
												onClick={() => onChange(null)}
											/>
										) : (
											<Button
												kind='ghost'
												renderIcon={() => <Add size={20} />}
												size='sm'
												hasIconOnly
												iconDescription={t('changeMonitoring:add-instance')}
												onClick={() => setOpenSearch(true)}
											/>
										))}
								</div>
								<div className='flex h-full w-full items-center justify-between space-x-2 pl-5 pr-8'>
									{value ? (
										<div className='mr-3 flex w-full items-center space-x-4'>
											<span>{value.name}</span>
										</div>
									) : (
										<div className='text-text-placeholder text-body-compact-1'>
											{t('changeMonitoring:select-app-instance')}
										</div>
									)}
								</div>
							</Tile>
						</div>
						{(helperText || invalidText) && (
							<div
								className={cx('mt-2 text-text-secondary text-helper-text-1', {
									'text-text-error': invalid
								})}
							>
								{invalid ? invalidText : helperText}
							</div>
						)}
					</div>
				</div>
			</div>
			<SingleAddSelect
				itemsLabel={`${t('changeMonitoring:app-instances')}:`}
				noResultsTitle={t('applicationSelect:no-results')}
				noResultsDescription={t('applicationSelect:different-keywords')}
				onCloseButtonText={t('applicationSelect:cancel')}
				onSubmit={id => {
					onChange(instances.find(instance => instance.id === id));
					setOpenSearch(false);
				}}
				onClose={() => setOpenSearch(false)}
				onSubmitButtonText={t('applicationSelect:select')}
				searchResultsLabel={t('applicationSelect:search-results')}
				title={t('changeMonitoring:select-app-instance')}
				description={t('changeMonitoring:select-one-app-instance')}
				globalSearchLabel={t('changeMonitoring:search-instance')}
				globalSearchPlaceholder={t('changeMonitoring:search-by-instance-name')}
				open={openSearch}
				items={{
					entries: instances
						.filter(i => i.id !== value?.id)
						.map(i => ({
							id: i.id,
							title: i.name,
							subtitle: i.description
						}))
				}}
			/>
		</>
	);
};

export default SingleApplicationSelect;
