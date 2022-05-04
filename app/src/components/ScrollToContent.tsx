import { Checkbox, ListItem } from '@carbon/react';

type ContentType = {
	id: string;
	content: string;
};
type ScrollToContentProps = {
	contentList: ContentType[];
	withCheckbox: boolean;
	totalSelected: number;
	setTotalSelected: (val: number) => void;
};

const ScrollToContent = ({
	contentList,
	withCheckbox,
	totalSelected,
	setTotalSelected
}: ScrollToContentProps) => {
	return (
		<div className='flex cursor-pointer flex-col pt-5'>
			{contentList.map(content => (
				<div className='flex h-[54px] items-center border-l-[3px] border-solid border-background-brand py-4 pl-3'>
					{withCheckbox && (
						<Checkbox
							id={content.id}
							labelText=''
							onChange={(event, { checked }) => {
								checked
									? setTotalSelected(totalSelected + 1)
									: setTotalSelected(totalSelected - 1);
							}}
						/>
					)}
					<ListItem
						onClick={() =>
							document
								.getElementById(content.id)
								?.scrollIntoView({ behavior: 'smooth', block: 'center' })
						}
						className='flex justify-self-start text-text-primary hover:text-link-primary'
					>
						{content.content}
					</ListItem>
				</div>
			))}
		</div>
	);
};
export default ScrollToContent;
