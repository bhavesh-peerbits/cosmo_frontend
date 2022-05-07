import { Column, Grid, TextArea, TextInput, Tile } from '@carbon/react';
import { Document, Group } from '@carbon/react/icons';
import FullWidthColumn from '@components/FullWidthColumn';
import { FieldErrors, UseFormRegister } from 'react-hook-form';
import User from '@model/User';
import SingleAddSelect from '@components/SingleAddSelect';
import MultiAddSelect from '@components/MultiAddSelect';

export interface GeneralInfoForm {
	generalInfo: {
		name: string;
		codeName: string;
		owner: User;
		description: string;
		ownerDelegates: User[];
		appMaintenance: string;
		operationSupplier: string;
	};
}

type GeneralInfoProps = {
	register: UseFormRegister<GeneralInfoForm>;
	errors: FieldErrors<GeneralInfoForm>;
};

const GeneralInfo = ({ register, errors }: GeneralInfoProps) => {
	return (
		<Tile href='ApplicationName' className='w-full bg-layer-accent-1 pb-7'>
			<SingleAddSelect
				description='select a category lorem ipsum'
				globalSearchLabel='test input title'
				globalSearchPlaceholder='Find categories'
				open
				items={{
					entries: [
						{
							id: '1',
							title: 'Kansas',
							value: 'kansas',
							subtitle: 'item 1 subtitle',
							avatar: {
								image:
									'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80',
								imageDescription: 'head shot'
							}
						},
						{
							id: '2',
							title: 'Texas',
							value: 'texas'
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
				itemsLabel='Categories'
				noResultsTitle='No results'
				noResultsDescription='Try again'
				onCloseButtonText='Cancel'
				onSubmit={() => {}}
				onSubmitButtonText='Select'
				searchResultsLabel='Search results'
				title='Select category'
			/>
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
				open
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
				onCloseButtonText='Cancel'
				onSubmit={() => {}}
				onSubmitButtonText='Add'
				removeIconDescription='Remove'
				searchResultsLabel='Search results'
				title='Add business terms'
			/>
			<MultiAddSelect
				clearFiltersText='Clear filters'
				columnInputPlaceholder='Find'
				description='Select business terms from the list'
				globalSearchLabel='test input label'
				globalSearchPlaceholder='Find business terms'
				influencerTitle='Selected business terms'
				open
				items={{
					entries: [
						{
							id: '1',
							value: '1',
							title: 'item 1',
							subtitle: 'item 1 subtitle',
							avatar: {
								image:
									'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80',
								imageDescription: 'head shot'
							},
							children: {
								sortBy: [
									{ label: 'titleLabel', attribute: 'title' },
									{ label: 'sizeLabel', attribute: 'size' }
								],
								filterBy: { label: 'File Type', attribute: 'fileType' },
								entries: [
									{
										id: '1-1',
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
							id: '2',
							value: '2',
							title: 'item 2',
							subtitle: 'item 2 subtitle',
							avatar: {
								icon: <Group size={24} />,
								backgroundColor: 'dark-green'
							}
						},
						{
							id: '3',
							value: '3',
							title: 'item 3',
							subtitle: 'item 3 subtitle',
							avatar: {
								initials: 'Stefano Imperiale'
							}
						}
					]
				}}
				itemsLabel='Business terms'
				noResultsTitle='No results'
				noSelectionDescription='Select a term to include the full set of the governance artifacts it contains in the governance scope.'
				noSelectionTitle='No business terms selected'
				noResultsDescription='Try again'
				onCloseButtonText='Cancel'
				onSubmit={() => {}}
				onSubmitButtonText='Add'
				removeIconDescription='Remove'
				searchResultsLabel='Search results'
				title='Add business terms'
			/>
			<Grid fullWidth className='space-y-7'>
				<FullWidthColumn data-toc-id='general-info' className='text-productive-heading-3'>
					General Information
				</FullWidthColumn>
				<FullWidthColumn>
					<Grid fullWidth>
						<Column sm={4} md={8} lg={8} className='mb-5'>
							<TextInput
								className='w-full'
								id='name'
								invalidText={errors.generalInfo?.name?.message}
								labelText='Name *'
								placeholder='Name'
								invalid={Boolean(errors.generalInfo?.name)}
								{...register('generalInfo.name', {
									required: {
										value: true,
										message: 'Required'
									}
								})}
							/>
						</Column>
						<Column sm={4} md={8} lg={8} className='mb-5'>
							<TextInput
								className='w-full'
								id='code'
								invalidText={errors.generalInfo?.name?.message}
								labelText='Code *'
								placeholder='Code'
								invalid={Boolean(errors.generalInfo?.name)}
								{...register('generalInfo.codeName', {
									required: {
										value: true,
										message: 'Required'
									}
								})}
							/>
						</Column>
						<FullWidthColumn className='mb-5'>
							<TextInput
								className='w-full'
								id='owner'
								invalidText={errors.generalInfo?.owner?.id?.message}
								labelText='Owner *'
								placeholder='Application owner'
								invalid={Boolean(errors.generalInfo?.owner)}
								{...register('generalInfo.owner', {
									required: {
										value: true,
										message: 'Required'
									}
								})}
							/>
						</FullWidthColumn>
						<FullWidthColumn className='mb-5'>
							<TextArea
								className='w-full'
								rows={1}
								id='owner-delegates'
								labelText='Owner Delegates'
								placeholder='Application owner delegates'
								{...register('generalInfo.ownerDelegates')}
							/>
						</FullWidthColumn>
						<Column sm={4} md={8} lg={8} className='mb-5'>
							<TextInput
								className='w-full'
								id='application-maintenance-supplier'
								labelText='Application Maintenance Supplier'
								placeholder='Application maintenance supplier'
								{...register('generalInfo.appMaintenance')}
							/>
						</Column>
						<Column sm={4} md={8} lg={8} className='mb-5'>
							<TextInput
								className='w-full'
								id='operation-supplier'
								labelText='Operation Supplier'
								placeholder='Operation supplier'
								{...register('generalInfo.operationSupplier')}
							/>
						</Column>
						<FullWidthColumn>
							<TextArea
								className='w-full'
								id='description'
								labelText='Description'
								placeholder='Description'
								{...register('generalInfo.description')}
							/>
						</FullWidthColumn>
					</Grid>
				</FullWidthColumn>
			</Grid>
		</Tile>
	);
};
export default GeneralInfo;
