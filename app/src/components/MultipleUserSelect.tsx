import { Button, FormLabel, Tile } from '@carbon/react';
import { Close, Document } from '@carbon/react/icons';
import { useState } from 'react';
import UserProfileImage from '@components/UserProfileImage';
import MultiAddSelect from '@components/MultiAddSelect';

const MultipleUserSelect = () => {
	const [openSearch, setOpenSearch] = useState(false);
	const [selectedUser, setSelectedUser] = useState<string[]>([]);

	return (
		<>
			<div className='flex flex-wrap items-end justify-end md:flex-nowrap'>
				<div className='w-full space-y-3'>
					<FormLabel>
						<span>Multiple User Select</span>
					</FormLabel>
					<Tile className='flex min-h-[2.5rem] items-center border-b-[1px] border-solid border-border-strong-1 p-0'>
						<div className='flex h-full items-center justify-between space-x-2 pl-5 pr-2'>
							{selectedUser.length ? (
								<div className='flex flex-wrap'>
									{selectedUser.map(u => (
										<div className='mr-3 flex items-center justify-center space-x-2'>
											<UserProfileImage
												tooltipText={u}
												imageDescription='Stefano Imperiale'
												size='md'
											/>
											<Button
												kind='ghost'
												size='sm'
												renderIcon={Close}
												hasIconOnly
												iconDescription='remove'
												onClick={() => setSelectedUser(old => old.filter(uu => uu !== u))}
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
				clearFiltersText='Clear filters'
				columnInputPlaceholder='Find'
				description='Select business terms from the list'
				globalSearchLabel='test input label'
				globalSearchPlaceholder='Find business terms'
				influencerTitle='Selected business terms'
				globalFilters={[
					{
						id: 'fileType',
						label: 'File type'
					},
					{
						id: 'size',
						label: 'Size'
					},
					{
						id: 'tag',
						label: 'Tag'
					}
				]}
				globalFiltersIconDescription='Filter'
				globalFiltersPlaceholderText='Choose an option'
				globalFiltersPrimaryButtonText='Apply'
				open={openSearch}
				onClose={() => setOpenSearch(false)}
				globalFiltersSecondaryButtonText='Reset'
				// globalSortBy={['title']}
				items={{
					sortBy: [{ label: 'titleLabel', attribute: 'title' }],
					entries: [
						{
							id: '1',
							value: 'folder 1',
							title: 'folder 1',
							children: {
								sortBy: [
									{ label: 'titleLabel', attribute: 'title' },
									{ label: 'sizeLabel', attribute: 'size' }
								],
								filterBy: { label: 'SizeLabel', attribute: 'size' },
								entries: [
									{
										id: '1-1',
										value: 'file1.pdf',
										title: 'file1.pdf',
										fileType: 'pdf',
										size: '100',
										icon: <Document />,
										tag: 'business',
										children: {
											entries: [
												{
													id: '3-2',
													value: 'file1.pdf',
													title: 'file1.pdf',
													fileType: 'pdf',
													size: '100',
													icon: <Document />,
													tag: 'business'
												}
											]
										}
									},
									{
										id: '1-2',
										value: 'index.js',
										title: 'index.js',
										fileType: 'js',
										size: '200',
										icon: <Document />
									},
									{
										id: '1-3',
										value: 'sitemap.xml',
										title: 'sitemap.xml',
										fileType: 'xml',
										size: '10',
										icon: <Document />
									}
								]
							}
						},
						{
							id: '2',
							value: 'folder 2',
							title: 'folder 2'
						}
					]
				}}
				itemsLabel='Business terms'
				noResultsTitle='No results'
				noSelectionDescription='Select a term to include the full set of the governance artifacts it contains in the governance scope.'
				noSelectionTitle='No business terms selected'
				noResultsDescription='Try again'
				onCloseButtonText='Close'
				onSubmit={select => {
					setSelectedUser(select);
					setOpenSearch(false);
				}}
				onSubmitButtonText='Select'
				removeIconDescription='Remove'
				searchResultsLabel='Search results'
				title='Add business terms'
			/>
		</>
	);
};

export default MultipleUserSelect;
