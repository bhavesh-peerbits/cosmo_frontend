import { Button, FormLabel, Tile } from '@carbon/react';
import { Close, EditOff, UserFollow } from '@carbon/react/icons';
import SingleAddSelect from '@components/SingleAddSelect';
import { useState } from 'react';
import UserProfileImage from '@components/UserProfileImage';
import {
	FieldPath,
	FieldValues,
	PathValue,
	UnpackNestedValue,
	useController,
	UseControllerProps
} from 'react-hook-form';
import User from '@model/User';
import cx from 'classnames';
import useGetUsers from '@api/user/useGetUsers';
import { useTranslation } from 'react-i18next';
import { UseQueryResult } from 'react-query';

type SingleUserSelectProps<
	T extends FieldValues,
	TName extends FieldPath<T>
> = UnpackNestedValue<PathValue<T, TName>> extends User
	? {
			label: string;
			name: TName;
			control: UseControllerProps<T, TName>['control'];
			rules?: UseControllerProps<T, TName>['rules'];
			level?: number;
			helperText?: string;
			readOnly?: boolean;
			defaultValue?: User;
			excludedUsers?: User[];
			getUserFn?: () => UseQueryResult<User[]>;
	  }
	: never;

const SingleUserSelect = <T extends FieldValues, TName extends FieldPath<T>>({
	label,
	control,
	name,
	rules,
	level = 1,
	helperText,
	readOnly,
	defaultValue,
	excludedUsers,
	getUserFn = useGetUsers
}: SingleUserSelectProps<T, TName>) => {
	const { t } = useTranslation('userSelect');
	const {
		field: { onChange, onBlur, value: formValue, ref },
		fieldState: { invalid, error }
	} = useController({
		name,
		control,
		rules,
		defaultValue: defaultValue as UnpackNestedValue<PathValue<T, TName>>
	});
	const value = formValue as User | undefined;
	const [openSearch, setOpenSearch] = useState(false);
	const { data: users = [] } = getUserFn();
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
										'bg-field-1': level === 1,
										'bg-field-2': level === 2,
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
												iconDescription={t('remove')}
												onClick={() => onChange(null)}
											/>
										) : (
											<Button
												kind='ghost'
												renderIcon={() => <UserFollow size={20} />}
												size='sm'
												hasIconOnly
												iconDescription={t('add-user')}
												onClick={() => setOpenSearch(true)}
											/>
										))}
								</div>
								<div className='flex h-full w-full items-center justify-between space-x-2 pl-5 pr-8'>
									{value ? (
										<div className='mr-3 flex w-full items-center space-x-4'>
											<UserProfileImage
												initials={value.displayName}
												imageDescription={value.username}
												size='md'
											/>
											<span>{value.displayName}</span>
										</div>
									) : (
										<div className='text-text-placeholder text-body-compact-1'>
											{t('select-user')}
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
				itemsLabel={`${t('users')}:`}
				noResultsTitle={t('no-results')}
				noResultsDescription={t('different-keywords')}
				onCloseButtonText={t('cancel')}
				onSubmit={id => {
					onChange(users.find(user => user.id === id));
					setOpenSearch(false);
				}}
				onClose={() => setOpenSearch(false)}
				onSubmitButtonText={t('select')}
				searchResultsLabel={t('search-results')}
				title={t('select-user')}
				description={t('select-single')}
				globalSearchLabel={t('username-email')}
				globalSearchPlaceholder={t('find-user')}
				open={openSearch}
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
						.filter(u => !excludedUsers?.some(e => e.id === u.id))
						.filter(u => u.id !== value?.id)
						.map(u => ({
							id: u.id,
							title: u.displayName,
							tagInfo: u.principalRole,
							subtitle: u.email || t('no-email'),
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

export default SingleUserSelect;
