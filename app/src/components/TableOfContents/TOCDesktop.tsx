import classNames from 'classnames';
import { MouseEvent } from 'react';
import { smoothScroll, triggerFocus } from '@components/TableOfContents/utils';

interface TOCDesktopProps {
	menuItems?: Array<{ title: string; id: string }>;

	/**
	 * Id of a menu item.
	 */
	selectedId?: string;
	stickyOffset?: number;
}

/**
 * DesktopMenu Component.
 */
const TOCDesktop = ({ menuItems, selectedId, stickyOffset }: TOCDesktopProps) => {
	/**
	 * Handle OnClick
	 *
	 * @param {*} e event object
	 * @param {*} id menu item id
	 */
	const handleOnClick = (e: MouseEvent, id: string) => {
		e.preventDefault();
		const selector = `*[data-toc-id="${id}"]`;
		smoothScroll(selector, stickyOffset);
		triggerFocus(selector);
	};

	return (
		<div className='flex[0_0_75%] mt-7 max-w-[75%] pt-7'>
			<ul>
				{menuItems
					?.filter(item => item.id !== 'menuLabel')
					.map(item => {
						const isActive = selectedId === item.id;
						return (
							<li key={item.id}>
								<a
									{...(isActive ? { 'aria-current': 'location' } : {})}
									className={classNames(
										'inline-block w-full border-l-2 border-solid border-l-border-subtle-0 py-4 pl-4 text-body-long-2 hover:text-text-primary',
										{
											'border-l-link-primary': isActive,
											'text-text-primary': isActive,
											'hover:border-l-background-selected-hover': !isActive,
											'text-text-secondary': !isActive
										}
									)}
									onClick={e => handleOnClick(e, item.id)}
									href={`#${item.id}`}
								>
									{item.title}
								</a>
							</li>
						);
					})}
			</ul>
		</div>
	);
};

export default TOCDesktop;
