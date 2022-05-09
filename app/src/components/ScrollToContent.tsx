import { Checkbox, ListItem } from '@carbon/react';
import { useState } from 'react';

type ContentType = {
	id: string;
	content: string;
};
type ScrollToContentProps = {
	contentList: ContentType[];
	withCheckbox: boolean;
	totalSelected?: number;
	setTotalSelected?: (val: number) => void;
};

const ScrollToContent = ({
	contentList,
	withCheckbox,
	totalSelected,
	setTotalSelected
}: ScrollToContentProps) => {
	const [contentInViewport, setContentInViewport] = useState<string | null>(
		contentList[0].id
	);

	const isInViewPort = (id: string) => {
		const content = document.getElementById(id);
		const rect = content?.getBoundingClientRect();
		return (
			rect &&
			rect.top >= 0 &&
			rect.left >= 0 &&
			rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
			rect.right <= (window.innerWidth || document.documentElement.clientWidth)
		);
	};
	document?.getElementById('container')?.addEventListener(
		'scroll',
		() => {
			contentList.map(content =>
				isInViewPort(content.id) ? setContentInViewport(content.id) : ''
			);
		},
		{
			capture: true,
			passive: true
		}
	);

	return (
		<div className='flex cursor-pointer flex-col pt-5'>
			{contentList.map(content => (
				<div
					className={`flex h-[54px] items-center border-l-[3px] ${
						content.id === contentInViewport
							? 'border-background-brand'
							: 'border-border-subtle-0'
					} border-solid py-4 pl-3`}
				>
					{withCheckbox && setTotalSelected && totalSelected !== undefined && (
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
