import { Accordion, AccordionItem, Button, Tag } from '@carbon/react';
import { SubtractAlt } from '@carbon/react/icons';
import { ItemNoChildren } from '@components/AddSelect/utilities';

const AddSelectSidebar = ({
	influencerTitle,
	influencerItemTitle,
	influencerItemSubtitle,
	items = [],
	multiSelection = [],
	noSelectionDescription,
	noSelectionTitle,
	removeIconDescription,
	setMultiSelection = () => {}
}: AddSelectSidebarProps) => {
	const handleItemRemove = (id: string) => {
		const newSelections = multiSelection.filter(v => v !== id);
		setMultiSelection(newSelections);
	};

	const sidebarItems = multiSelection.reduce((acc, cur) => {
		const selectedItem = items.find(item => item.id === cur);
		if (selectedItem) {
			const { icon, avatar, ...newItem } = selectedItem;
			acc.push(newItem);
		}
		return acc;
	}, [] as ItemNoChildren[]);

	const getTitle = ({ title, subtitle, id }: ItemNoChildren) => (
		<div className='flex items-center justify-between'>
			<div>
				<p className='pr-0 text-text-primary'>{title}</p>
				<p className='pr-0 text-text-secondary text-label-1'>{subtitle}</p>
			</div>
			<Button
				renderIcon={SubtractAlt}
				iconDescription={removeIconDescription}
				hasIconOnly
				onClick={() => handleItemRemove(id)}
				kind='ghost'
				className='opacity-0 hover:bg-background-selected-hover hover:opacity-100'
				size='sm'
			/>
		</div>
	);
	return (
		<div>
			<div className='flex border-b-[1px] border-solid border-border-subtle-0 px-5 pt-6 pb-3'>
				<p className='mr-3 p-0 text-productive-heading-2'>{influencerTitle}</p>
				<div>
					<Tag type='gray' size='sm'>
						{multiSelection.length}
					</Tag>
				</div>
			</div>
			{multiSelection.length > 0 ? (
				<Accordion align='start'>
					{sidebarItems.map(item => (
						<AccordionItem title={getTitle(item)} key={item.id}>
							<div>
								<p className='mb-3 text-text-secondary text-label-1 first-letter:uppercase'>
									{influencerItemTitle || 'Title'}
								</p>
								<p className='mb-5 text-body-long-1'>{item.title}</p>
							</div>
							<div>
								<p className='mb-3 text-text-secondary text-label-1 first-letter:uppercase'>
									{influencerItemSubtitle || 'Subtitle'}
								</p>
								<p className='mb-5 text-body-long-1'>{item.subtitle}</p>
							</div>
							{Object.keys(item)
								.filter(
									key =>
										key !== 'title' &&
										key !== 'subtitle' &&
										key !== 'tagInfo' &&
										key !== 'id'
								)
								.map(key => (
									<div key={key}>
										<p className='mb-3 text-text-secondary text-label-1 first-letter:uppercase'>
											{key}
										</p>
										<p className='mb-5 text-body-long-1'>{item[key] as string}</p>
									</div>
								))}
						</AccordionItem>
					))}
				</Accordion>
			) : (
				<div className='p-5'>
					{/* <NoDataEmptyState */}
					{/* 	subtitle={noSelectionDescription} */}
					{/* 	title={noSelectionTitle} */}
					{/* 	size='sm' */}
					{/* /> */}
					<span>{noSelectionTitle}</span>
					<span>{noSelectionDescription}</span>
				</div>
			)}
		</div>
	);
};

interface AddSelectSidebarProps {
	influencerTitle?: string;
	influencerItemTitle?: string;
	influencerItemSubtitle?: string;
	items?: Array<ItemNoChildren>;
	multiSelection?: Array<string>;
	noSelectionDescription?: string;
	noSelectionTitle?: string;
	removeIconDescription?: string;
	setMultiSelection: (newData: Array<string>) => void;
}

export default AddSelectSidebar;
