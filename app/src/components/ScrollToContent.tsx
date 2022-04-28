import { Checkbox } from '@carbon/react';

type ContentType = {
	id: string;
	content: string;
};
type ScrollToContentProps = {
	contentList: ContentType[];
	withCheckbox: boolean;
};
const ScrollToContent = ({ contentList, withCheckbox }: ScrollToContentProps) => {
	return (
		<div className='flex flex-col pt-5'>
			{contentList.map(content => (
				<div className='flex h-[54px] items-center border-l-[3px] border-solid border-border-subtle-1 py-4 pl-3'>
					{withCheckbox && <Checkbox id={content.id} labelText='' />}

					<a
						className='flex justify-self-start text-text-primary hover:text-link-primary'
						href={`#${content.id}`}
					>
						{content.content}
					</a>
				</div>
			))}
		</div>
	);
};
export default ScrollToContent;
