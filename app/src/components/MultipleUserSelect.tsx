import { Button, FormLabel, Tile } from '@carbon/react';
import { Close, EditOff, UserFollow } from '@carbon/react/icons';
import { useState } from 'react';
import UserProfileImage from '@components/UserProfileImage';
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
import useGetUsers from '@api/user/useGetUsers';
import cx from 'classnames';
import { useTranslation } from 'react-i18next';
import { TooltipPosition } from '@carbon/react/typings/shared';
import { UseQueryResult } from 'react-query';

type MultipleUserSelectProps<
	T extends FieldValues,
	TName extends FieldPath<T>
> = UnpackNestedValue<PathValue<T, TName>> extends User[]
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
			getUserFn?: () => UseQueryResult<User[]>;
			excludedUser?: User;
	  }
	: never;

const MultipleUserSelect = <T extends FieldValues, TName extends FieldPath<T>>({
	label,
	name,
	control,
	rules,
	level = 1,
	helperText,
	readOnly,
	defaultValue,
	tooltipPosition,
	getUserFn = useGetUsers,
	excludedUser
}: MultipleUserSelectProps<T, TName>) => {
	const { t } = useTranslation('userSelect');
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
	const { data: users = [] } = getUserFn();
	const invalidText = error?.message;
	const selectUsers = formValue as User[] | undefined;

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
										'bg-field-1': level === 1,
										'bg-field-2': level === 2,
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
											renderIcon={() => <UserFollow size={20} />}
											size='sm'
											hasIconOnly
											tooltipPosition={tooltipPosition || undefined}
											iconDescription={t('add-user')}
											onClick={() => setOpenSearch(true)}
										/>
									)}
								</div>
								<div className='flex h-full items-center justify-between space-x-2 pl-5 pr-8'>
									{selectUsers?.length ? (
										<div className='flex flex-wrap'>
											{selectUsers?.map(u => (
												<div
													className='mr-3 flex items-center justify-center space-x-2'
													key={u.id}
												>
													<UserProfileImage
														initials={u.displayName}
														imageDescription={u.username}
														tooltipText={u.displayName}
														size='md'
													/>
													<Button
														kind='ghost'
														size='sm'
														renderIcon={Close}
														hasIconOnly
														iconDescription={t('remove')}
														onClick={() =>
															onChange(selectUsers.filter(uu => uu.id !== u.id))
														}
													/>
												</div>
											))}
										</div>
									) : (
										<span className='text-text-placeholder text-body-compact-1'>
											{t('select-user')}
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
					selectUsers && {
						entries: selectUsers.map(u => ({
							id: u.id,
							title: u.displayName,
							tagInfo: u.principalRole,
							subtitle: u.email || t('no-email'),
							username: u.username,
							role: u.principalRole,
							avatar: {
								imageDescription: u.username,
								initials: u.displayName
							}
						}))
					}
				}
				itemsLabel={t('users')}
				noResultsTitle={t('no-results')}
				noResultsDescription={t('different-keywords')}
				onCloseButtonText={t('cancel')}
				onSubmit={id => {
					onChange(users.filter(user => id.includes(user.id)));
					setOpenSearch(false);
				}}
				onClose={() => setOpenSearch(false)}
				onSubmitButtonText={t('select')}
				searchResultsLabel={t('search-results')}
				title={t('select-user')}
				description={t('select-users')}
				globalSearchLabel={t('username-email')}
				globalSearchPlaceholder={t('find-user')}
				open={openSearch}
				influencerTitle={t('users-selected')}
				influencerItemTitle={t('name')}
				influencerItemSubtitle='email'
				globalFilters={[
					{
						id: 'role',
						label: t('role')
					}
				]}
				globalFiltersIconDescription={t('filters')}
				globalFiltersPlaceholderText={t('choose-option')}
				globalFiltersPrimaryButtonText={t('apply')}
				globalFiltersSecondaryButtonText={t('reset')}
				clearFiltersText={t('clear-filters')}
				items={{
					entries: users
						.filter(u => u.id !== excludedUser?.id)
						.filter(u => !u.inactive)
						.map(u => ({
							id: u.id,
							title: u.displayName,
							tagInfo: u.principalRole,
							subtitle: u.email || t('no-email'),
							username: u.username,
							role: u.principalRole,
							avatar: {
								imageDescription: u.username,
								initials: u.displayName
							}
						}))
				}}
			/>
		</>
	);
};

export default MultipleUserSelect;
