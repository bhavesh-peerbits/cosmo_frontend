import { Button, FormLabel, Tile } from '@carbon/react';
import { Close, UserFollow } from '@carbon/react/icons';
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
	  }
	: never;

const SingleUserSelect = <T extends FieldValues, TName extends FieldPath<T>>({
	label,
	control,
	name,
	rules,
	level = 1,
	helperText
}: SingleUserSelectProps<T, TName>) => {
	const {
		field: { onChange, onBlur, value: formValue, ref },
		fieldState: { invalid, error }
	} = useController({
		name,
		control,
		rules
	});
	const value = formValue as User;
	const [openSearch, setOpenSearch] = useState(false);
	const { data: users = [] } = useGetUsers();
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
									{value ? (
										<Button
											kind='ghost'
											size='sm'
											renderIcon={() => <Close size={20} />}
											hasIconOnly
											iconDescription='remove'
											onClick={() => onChange(null)}
										/>
									) : (
										<Button
											kind='ghost'
											renderIcon={() => <UserFollow size={20} />}
											size='sm'
											hasIconOnly
											iconDescription='add user'
											onClick={() => setOpenSearch(true)}
										/>
									)}
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
											Select a user
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
				itemsLabel='Users'
				noResultsTitle='No results'
				noResultsDescription='Try with different keywords'
				onCloseButtonText='Cancel'
				onSubmit={id => {
					onChange(users.find(user => user.id === id));
					setOpenSearch(false);
				}}
				onClose={() => setOpenSearch(false)}
				onSubmitButtonText='Select'
				searchResultsLabel='Search results'
				title='Select User'
				description='Select a single user from the list'
				globalSearchLabel='Username or email'
				globalSearchPlaceholder='Find user'
				open={openSearch}
				globalFilters={[
					{
						id: 'role',
						label: 'Role'
					}
				]}
				globalFiltersIconDescription='Filters'
				globalFiltersPlaceholderText='Choose an option'
				globalFiltersPrimaryButtonText='Apply'
				globalFiltersSecondaryButtonText='Reset'
				clearFiltersText='Clear filters'
				items={{
					entries: users
						.filter(u => u.id !== value?.id)
						.map(u => ({
							id: u.id,
							title: u.displayName,
							tagInfo: u.principalRole,
							subtitle: u.email || 'No email provided',
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
