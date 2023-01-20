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
import Association from '@model/Association';
import UserProfileImage from '@components/UserProfileImage';

type MultipleControlSelectProps<
	T extends FieldValues,
	TName extends FieldPath<T>
> = UnpackNestedValue<PathValue<T, TName>> extends Association[]
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
			controls?: Association[];
	  }
	: never;

const MultipleControlSelect = <T extends FieldValues, TName extends FieldPath<T>>({
	label,
	name,
	control,
	rules,
	level = 1,
	helperText,
	readOnly,
	defaultValue,
	tooltipPosition,
	controls
}: MultipleControlSelectProps<T, TName>) => {
	const { t } = useTranslation(['changeMonitoring', 'userSelect', 'evidenceRequest']);
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
	const selectControls = formValue as Association[] | undefined;

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
											iconDescription={t('changeMonitoring:add-controls')}
											onClick={() => setOpenSearch(true)}
										/>
									)}
								</div>
								<div className='flex h-full items-center justify-between space-x-2 pl-5 pr-8'>
									{selectControls?.length ? (
										<div className='flex flex-wrap'>
											{selectControls?.map(selectControl => (
												<div
													className='mr-3 flex items-center justify-center space-x-2'
													key={selectControl.id}
												>
													<Tag
														filter
														onClose={() =>
															onChange(
																selectControls.filter(
																	selectedControl =>
																		selectedControl.id !== selectControl.id
																)
															)
														}
													>
														{selectControl.name}
													</Tag>
												</div>
											))}
										</div>
									) : (
										<span className='text-text-placeholder text-body-compact-1'>
											{t('changeMonitoring:select-controls')}
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
					selectControls && {
						entries: selectControls.map(selectControl => ({
							id: selectControl.id,
							title: selectControl.name || ''
						}))
					}
				}
				itemsLabel={t('changeMonitoring:controls')}
				noResultsTitle={t('userSelect:no-results')}
				noResultsDescription={t('userSelect:different-keywords')}
				onCloseButtonText={t('userSelect:cancel')}
				onSubmit={id => {
					onChange(controls?.filter(el => id.includes(el.id)));
					setOpenSearch(false);
				}}
				onClose={() => setOpenSearch(false)}
				onSubmitButtonText={t('userSelect:select')}
				searchResultsLabel={t('userSelect:search-results')}
				title={t('changeMonitoring:select-controls')}
				description={t('changeMonitoring:select-controls-list')}
				globalSearchLabel={t('changeMonitoring:search-control-label')}
				globalSearchPlaceholder={t('changeMonitoring:search-control-placeholder')}
				open={openSearch}
				influencerTitle={t('changeMonitoring:selected-controls')}
				influencerItemTitle={t('changeMonitoring:control-name')}
				influencerItemSubtitle='Focal Point'
				globalFilters={[
					{
						id: 'info2',
						label: 'info3'
					}
				]}
				globalFiltersIconDescription={t('userSelect:filters')}
				globalFiltersPlaceholderText={t('userSelect:choose-option')}
				globalFiltersPrimaryButtonText={t('userSelect:apply')}
				globalFiltersSecondaryButtonText={t('userSelect:reset')}
				clearFiltersText={t('userSelect:clear-filters')}
				items={{
					entries: controls
						? controls.map(el => ({
								id: el.id,
								title: el.name || '',
								subtitle: el.reviewer?.displayName,
								[t('evidenceRequest:focal-point-delegates')]: el.delegates?.length
									? el.delegates.map(del => (
											<UserProfileImage
												initials={del.displayName}
												imageDescription={del.username}
												tooltipText={del.displayName}
												size='lg'
												kind='group'
												tooltipPosition='top-left'
											/>
									  ))
									: t('evidenceRequest:no-delegates')
						  }))
						: []
				}}
			/>
		</>
	);
};

export default MultipleControlSelect;
