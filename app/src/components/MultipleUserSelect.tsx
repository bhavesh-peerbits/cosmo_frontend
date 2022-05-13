import { Button, FormLabel, Tile } from '@carbon/react';
import { Close } from '@carbon/react/icons';
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

type MultipleUserSelectProps<
	T extends FieldValues,
	TName extends FieldPath<T>
> = UnpackNestedValue<PathValue<T, TName>> extends User[]
	? {
			label: string;
			name: TName;
			control: UseControllerProps<T, TName>['control'];
			rules?: UseControllerProps<T, TName>['rules'];
	  }
	: never;

const MultipleUserSelect = <T extends FieldValues, TName extends FieldPath<T>>({
	label,
	name,
	control,
	rules
}: MultipleUserSelectProps<T, TName>) => {
	const [openSearch, setOpenSearch] = useState(false);
	const {
		field: { onChange, onBlur, value: formValue, ref },
		fieldState: { invalid }
	} = useController({
		name,
		control,
		rules
	});
	const { data: users = [] } = useGetUsers();

	const selectUsers = formValue as User[] | undefined;

	return (
		<>
			<div className='flex flex-wrap items-end justify-end md:flex-nowrap'>
				<div className='w-full space-y-3'>
					<FormLabel>
						<span>{label}</span>
					</FormLabel>
					<Tile
						{...{
							ref,
							onBlur,
							name
						}}
						className={cx(
							'z-0 flex min-h-[2.5rem] items-center border-b-[1px] border-solid border-border-strong-1 p-0',
							{
								'outline-support-error': invalid
							}
						)}
					>
						<div className='flex h-full items-center justify-between space-x-2 pl-5 pr-2'>
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
												iconDescription='remove'
												onClick={() => onChange(selectUsers.filter(uu => uu.id !== u.id))}
											/>
										</div>
									))}
								</div>
							) : (
								<span className='text-text-placeholder text-body-compact-1'>
									Select a user
								</span>
							)}
						</div>
					</Tile>
				</div>

				<div>
					<Button kind='ghost' onClick={() => setOpenSearch(true)}>
						Add user
					</Button>
				</div>
			</div>
			<MultiAddSelect
				itemsLabel='Users'
				noResultsTitle='No results'
				noResultsDescription='Try with different keywords'
				onCloseButtonText='Close'
				onSubmit={id => {
					onChange(users.filter(user => id.includes(user.id)));
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
				influencerTitle='Users selected'
				influencerItemTitle='Name'
				influencerItemSubtitle='email'
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
						.filter(u => !selectUsers?.some(s => s.id === u.id))
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

export default MultipleUserSelect;
