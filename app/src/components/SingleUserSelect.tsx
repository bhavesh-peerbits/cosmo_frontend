import { Button, FormLabel, Tile } from '@carbon/react';
import { Close } from '@carbon/react/icons';
import SingleAddSelect from '@components/SingleAddSelect';
import { useState } from 'react';
import UserProfileImage from '@components/UserProfileImage';

const SingleUserSelect = () => {
	const [openSearch, setOpenSearch] = useState(false);
	const [selectedUser, setSelectedUser] = useState<string | null>(null);

	return (
		<>
			<div className='flex flex-wrap items-end justify-end md:flex-nowrap'>
				<div className='w-full space-y-3'>
					<FormLabel>
						<span>Single User Select</span>
					</FormLabel>
					<Tile className='h-container-3 min-h-fit items-center justify-center border-b-[1px] border-solid border-border-strong-1 p-0'>
						<div className='flex h-full items-center justify-between space-x-2 pl-5 pr-2'>
							{selectedUser ? (
								<>
									<div className='flex items-center justify-center space-x-2'>
										<UserProfileImage imageDescription='Stefano Imperiale' size='md' />
										<span>Stefano Imperiale</span>
									</div>
									<Button
										kind='ghost'
										size='sm'
										renderIcon={Close}
										hasIconOnly
										iconDescription='remove'
										onClick={() => setSelectedUser(null)}
									/>
								</>
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
			<SingleAddSelect
				itemsLabel='Users'
				noResultsTitle='No results'
				noResultsDescription='Try with different keywords'
				onCloseButtonText='Cancel'
				onSubmit={select => {
					setSelectedUser(select);
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
					entries: [
						{
							id: '1',
							title: 'John Doe',
							tagInfo: 'Admin',
							subtitle: 'jhon.doe@mail.com',
							role: 'User',
							avatar: {
								image:
									'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80',
								imageDescription: 'head shot'
							}
						},
						{
							id: '2',
							title: 'John Doe2',
							value: 'John Doe2',
							subtitle: 'jhon2.doe@mail.com',
							role: 'Admin',
							avatar: {
								image:
									'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80',
								imageDescription: 'head shot'
							}
						},
						{
							id: '3',
							title: 'Florida',
							value: 'florida'
						},
						{
							id: '4',
							title: 'California',
							value: 'california',
							children: {
								entries: [
									{
										id: '5',
										title: 'Los Angeles',
										value: 'la',
										children: {
											entries: [
												{
													id: '6',
													title: 'Third Level',
													value: 'third level'
												},
												{
													id: '7',
													title: 'another Level',
													value: 'another level',
													children: {
														entries: [
															{
																id: '8',
																title: 'last level',
																value: 'last level'
															}
														]
													}
												}
											]
										}
									}
								]
							}
						}
					]
				}}
			/>
		</>
	);
};

export default SingleUserSelect;
