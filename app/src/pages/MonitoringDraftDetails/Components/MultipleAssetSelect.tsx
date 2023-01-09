import { Button, FormLabel, Tile, Tag } from '@carbon/react';
import { EditOff, Add } from '@carbon/react/icons';
import { useState } from 'react';
import MultiAddSelect from '@components/MultiAddSelect';
import User from '@model/User';
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
import { TooltipPosition } from '@carbon/react/typings/shared';
import Asset from '@model/Asset';

type MultipleAssetSelectProps<
	T extends FieldValues,
	TName extends FieldPath<T>
> = UnpackNestedValue<PathValue<T, TName>> extends Asset[]
	? {
			label: string;
			name: TName;
			control: UseControllerProps<T, TName>['control'];
			rules?: UseControllerProps<T, TName>['rules'];
			level?: number;
			helperText?: string;
			readOnly?: boolean;
			defaultValue?: User[];
			tooltipPosition?: TooltipPosition;
			assets?: Asset[];
	  }
	: never;

const MultipleAssetSelect = <T extends FieldValues, TName extends FieldPath<T>>({
	label,
	name,
	control,
	rules,
	level = 1,
	helperText,
	readOnly,
	defaultValue,
	tooltipPosition,
	assets
}: MultipleAssetSelectProps<T, TName>) => {
	const { t } = useTranslation(['changeMonitoring', 'userSelect']);
	const [openSearch, setOpenSearch] = useState(false);
	const {
		field: { onChange, onBlur, value: formValue, ref },
		fieldState: { invalid, error }
	} = useController({
		name,
		control,
		rules,
		defaultValue: defaultValue as UnpackNestedValue<PathValue<T, TName>>
	});

	const invalidText = error?.message;
	const selectAssets = formValue as Asset[] | undefined;

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
									'relative z-0 flex min-h-[2.5rem] w-full items-center border-b-[1px] border-solid border-border-strong-1 p-0',
									{
										'bg-field-1': level === 0,
										'bg-field-2': level === 1,
										'bg-field-3': level === 2,
										'outline-support-error': invalid
									}
								)}
							>
								<div className='absolute top-1/2 right-2 -translate-y-1/2'>
									{readOnly ? (
										<div className='pr-4'>
											<EditOff />
										</div>
									) : (
										<Button
											kind='ghost'
											renderIcon={() => <Add size={20} />}
											size='sm'
											hasIconOnly
											tooltipPosition={tooltipPosition || undefined}
											iconDescription={t('changeMonitoring:add-assets')}
											onClick={() => setOpenSearch(true)}
										/>
									)}
								</div>
								<div className='flex h-full items-center justify-between space-x-2 pl-5 pr-8'>
									{selectAssets?.length ? (
										<div className='flex flex-wrap'>
											{selectAssets?.map(asset => (
												<div
													className='mr-3 flex items-center justify-center space-x-2'
													key={asset.id}
												>
													<Tag
														filter
														onClose={() =>
															onChange(
																selectAssets.filter(
																	selectedAsset => selectedAsset.id !== asset.id
																)
															)
														}
													>
														{asset.os}
													</Tag>
												</div>
											))}
										</div>
									) : (
										<span className='text-text-placeholder text-body-compact-1'>
											{t('changeMonitoring:select-assets')}
										</span>
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
			<MultiAddSelect
				selectedItems={
					selectAssets && {
						entries: selectAssets.map(asset => ({
							id: asset.id,
							title: asset.hostname || '',
							tagInfo: asset.os
						}))
					}
				}
				itemsLabel='Assets'
				noResultsTitle={t('userSelect:no-results')}
				noResultsDescription={t('userSelect:different-keywords')}
				onCloseButtonText={t('userSelect:cancel')}
				onSubmit={id => {
					onChange(assets?.filter(asset => id.includes(asset.id)));
					setOpenSearch(false);
				}}
				onClose={() => setOpenSearch(false)}
				onSubmitButtonText={t('userSelect:select')}
				searchResultsLabel={t('userSelect:search-results')}
				title={t('changeMonitoring:select-assets')}
				description={t('changeMonitoring:select-assets-list')}
				globalSearchLabel={t('changeMonitoring:search-asset')}
				globalSearchPlaceholder={t('changeMonitoring:search-asset-name')}
				open={openSearch}
				influencerTitle={t('changeMonitoring:selected-assets')}
				influencerItemTitle={t('changeMonitoring:asset-name')}
				influencerItemSubtitle='info'
				globalFilters={[
					{
						id: 'os',
						label: 'OS'
					}
				]}
				globalFiltersIconDescription={t('userSelect:filters')}
				globalFiltersPlaceholderText={t('userSelect:choose-option')}
				globalFiltersPrimaryButtonText={t('userSelect:apply')}
				globalFiltersSecondaryButtonText={t('userSelect:reset')}
				clearFiltersText={t('userSelect:clear-filters')}
				items={{
					entries: assets
						? assets.map(asset => ({
								id: asset.id,
								title: asset.hostname || '',
								tagInfo: asset.os,
								subtitle: asset.ip
						  }))
						: []
				}}
			/>
		</>
	);
};

export default MultipleAssetSelect;
