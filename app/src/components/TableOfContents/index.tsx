import { ReactNode, useEffect, useRef, useState } from 'react';
import TOCDesktop from '@components/TableOfContents/TOCDesktop';

interface TableOfContentsProps {
	/**
	 * Array of menu item objects to render within the side nav.
	 * Each items has the following structure:
	 *
	 * | Properties Name | Data Type | Description     |
	 * | --------------- | --------- | --------------- |
	 * | title           | String    | Menu title text |
	 * | id              | String    | Menu id         |
	 *
	 * If `menuItems` is not passed in as a prop, the menu items are dynamically
	 * generated based on anchor links that exist on the page. The anchor links should
	 * follow the following format:
	 *
	 * ```html
	 * <TAG data-toc-id="name-of-section" data-toc-title="Lorem Ipsum"></a>
	 * ```
	 */
	menuItems?: Array<{
		title: string;
		id: string;
	}>;

	/**
	 * Content to display next to the side nav.
	 */
	children: ReactNode;

	/**
	 * Placeholder value for menu label.
	 */
	menuLabel?: string;

	/**
	 * Defines the offset for the sticky column.
	 */
	stickyOffset: number;
}

/**
 * Table of Contents pattern.
 */
const TableOfContents = ({
	menuItems,
	children,
	menuLabel,
	stickyOffset = 0
}: TableOfContentsProps) => {
	const [useMenuItems, setUseMenuItems] = useState<NonNullable<typeof menuItems>>([]);
	const [selectedMenu, setSelectedMenu] = useState<
		NonNullable<typeof menuItems>[number] | undefined
	>();
	const tocRef = useRef<HTMLDivElement>(null);

	const findMenuItems = () => {
		const titles = tocRef.current?.querySelectorAll('*[data-toc-id]') || [];
		return [...titles].map(element => {
			const id = element.getAttribute('data-toc-id');
			if (!id) throw new Error('Missing data-toc-id attribute on element');
			return {
				id,
				title: element.getAttribute('data-toc-title') || element.textContent || ''
			};
		});
	};

	/**
	 * Check whether provided anchor tags are in visible viewport
	 *
	 * @returns {string} name attribute
	 */
	const getElemIdInView = () => {
		const items = [...(tocRef.current?.querySelectorAll('*[data-toc-id]') || [])];
		return (
			items.find(elem => {
				const rect = elem.getBoundingClientRect();
				return rect.top - stickyOffset + 10 > 0;
			}) || items.at(-1)
		)?.getAttribute('data-toc-id');
	};

	/**
	 * Set selected id & title
	 *
	 */
	const setSelectedItem = () => {
		const elemId = getElemIdInView();
		if (elemId) {
			const elem = useMenuItems.find(menu => menu.id === elemId);
			setSelectedMenu(elem);
		}
	};

	useEffect(() => {
		setUseMenuItems(menuItems?.length ? [...menuItems] : findMenuItems());
	}, [children, menuItems]);

	useEffect(() => {
		const id = useMenuItems[0]?.id;
		if (id === 'menuLabel' && useMenuItems[1]) {
			setSelectedMenu(useMenuItems[1]);
		} else {
			setSelectedMenu(useMenuItems[0]);
		}
	}, [useMenuItems]);

	useEffect(() => {
		/**
		 * Function to be added to eventListener and cleaned later on
		 */
		const handleRAF = () => {
			window.requestAnimationFrame(setSelectedItem);
		};

		document.getElementById('main')?.addEventListener('scroll', handleRAF);
		return () =>
			document.getElementById('main')?.removeEventListener('scroll', handleRAF);
	});

	/**
	 * Sets the selected menu item
	 *
	 * @param {*} id selected id of menu item
	 * @param {*} title selected title of menu item
	 */
	const updateState = (id: string, title: string) => {
		setSelectedMenu({ id, title });
	};

	const props = {
		menuItems: useMenuItems,
		stickyOffset: stickyOffset + 20,
		selectedId: selectedMenu?.id,
		menuLabel,
		updateState,
		children
	};

	return (
		<div className='flex flex-wrap' ref={tocRef}>
			<div className='max-w-[25%] flex-[0_0_25%]'>
				<div
					className='sticky'
					style={{
						top: stickyOffset
					}}
				>
					<TOCDesktop {...props} />
					{/* <TOCMobile {...props} /> */}
				</div>
			</div>
			<div className='w-full flex-[0_0_75%] px-5 md:block md:max-w-[75%]'>
				<div>{children}</div>
			</div>
		</div>
	);
};

export default TableOfContents;
