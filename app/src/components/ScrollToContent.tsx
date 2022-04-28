type ContentType = {
	id: string;
	content: string;
};
type ScrollToContentProps = {
	contentList: ContentType[];
};
const ScrollToContent = ({ contentList }: ScrollToContentProps) => {
	return (
		<div className='flex flex-col pt-5'>
			{contentList.map(content => (
				<a
					href={`#${content.id}`}
					className='hover border-l-[3px] border-solid border-border-subtle-1 py-4 pl-3 text-text-primary text-heading-3 hover:text-link-primary'
				>
					{content.content}
				</a>
			))}
		</div>
	);
};
export default ScrollToContent;
