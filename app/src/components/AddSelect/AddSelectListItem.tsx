import {
	Checkbox,
	Dropdown,
	RadioButton,
	StructuredListCell,
	StructuredListRow,
	Tag
} from '@carbon/react';
import UserProfileImage from '@components/UserProfileImage';
import { ChevronRight } from '@carbon/react/icons';
import { useRef, useState } from 'react';
import cx from 'classnames';
import { ItemNoChildren } from '@components/AddSelect/utilities';

interface AddSelectItemProps {
	item: ItemNoChildren;
	handleMultiSelection: (id: string, checked: boolean) => void;
	handleSingleSelection: (value: string) => void;
	multi?: boolean;
	modifiers?: {
		label: string;
		options: string[];
	};
	singleSelection?: string;
	multiSelection?: Array<string>;
	onNavigateItem: (item: ItemNoChildren & { parent?: string }) => void;
	shrink: boolean;
	isFirstLevel: boolean;
}

const AddSelectListItem = ({
	item,
	multi,
	handleSingleSelection,
	handleMultiSelection,
	modifiers,
	singleSelection,
	multiSelection,
	onNavigateItem,
	shrink,
	isFirstLevel
}: AddSelectItemProps) => {
	const [showModifier, setShowModifier] = useState(false);

	const isSelected = (id: string) => multiSelection?.includes(id);
	const getAvatarProps = (props: NonNullable<typeof item['avatar']>) => ({
		className: 'mr-3',
		size: 'lg' as const,
		...props
	});
	const ref = useRef<HTMLInputElement>(null);

	return (
		<StructuredListRow
			className={cx('outline-none', {
				'bg-background-selected': isSelected(item.id)
			})}
		>
			<StructuredListCell
				onMouseEnter={() => setShowModifier(true)}
				onMouseLeave={() => setShowModifier(false)}
				onClick={e => {
					isFirstLevel
						? ref.current?.click()
						: e.target !== ref.current &&
						  (e.target as HTMLElement).tagName !== 'LABEL' &&
						  ref.current?.click();
				}}
				className={cx({ 'p-0': shrink })}
			>
				<div className='flex items-center justify-between'>
					<div className='flex items-center'>
						{multi ? (
							<Checkbox
								ref={ref}
								onChange={(e, { checked }) => handleMultiSelection(item.id, checked)}
								id={item.id}
								checked={isSelected(item.id)}
								labelText=''
							/>
						) : (
							<RadioButton
								ref={ref}
								name='add-select-selections'
								id={item.id}
								className='m-0'
								value={item.id}
								labelText=''
								onChange={() => handleSingleSelection(item.id)}
								checked={item.id === singleSelection}
							/>
						)}
						<div className='ml-3 flex'>
							{item.avatar && <UserProfileImage {...getAvatarProps(item.avatar)} />}
							{item.icon && <div className='mr-3'>{item.icon}</div>}
							<div className='flex flex-col'>
								<span className='block text-text-primary'>{item.title}</span>
								{item.subtitle && (
									<span className='block text-text-secondary text-label-1'>
										{item.subtitle}
									</span>
								)}
							</div>
							{item.tagInfo && (
								<div className='ml-5 whitespace-nowrap'>
									<Tag type='blue'>{item.tagInfo}</Tag>
								</div>
							)}
						</div>
					</div>
					{modifiers?.options?.length && (
						<Dropdown
							id={`${item.id}-modifier`}
							type='inline'
							style={{ outline: 0 }}
							className={cx('transition duration-moderate-2 ease-entrance-expressive', {
								'opacity-0': !showModifier
							})}
							onClick={e => e.preventDefault()}
							items={modifiers.options}
							label={modifiers.label}
							disabled={!isSelected(item.id)}
						/>
					)}
					{item.children && (
						<ChevronRight
							onClick={e => {
								onNavigateItem(item);
								e.stopPropagation();
							}}
						/>
					)}
				</div>
			</StructuredListCell>
		</StructuredListRow>
	);
};

export default AddSelectListItem;
