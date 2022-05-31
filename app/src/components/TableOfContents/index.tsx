import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import TOCDesktop from '@components/TableOfContents/TOCDesktop';
import useResponsive from '@hooks/useResponsive';
import TOCMobile from '@components/TableOfContents/TOCMobile';

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
	stickyOffset?: number;

	tocStickyOffset?: number;

	isCheckView?: boolean;

	checked?: string[];

	setChecked?: (f: (old: string[]) => string[]) => void;
}

/**
 * Table of Contents pattern.
 */
const TableOfContents = ({
	menuItems,
	children,
	menuLabel,
	isCheckView,
	checked,
	setChecked,
	tocStickyOffset = 0,
	stickyOffset = 0
}: TableOfContentsProps) => {
	const [useMenuItems, setUseMenuItems] = useState<NonNullable<typeof menuItems>>([]);
	const [selectedMenu, setSelectedMenu] = useState<
		NonNullable<typeof menuItems>[number] | undefined
	>();
	const containerStickyOffset = stickyOffset + tocStickyOffset;
	const tocRef = useRef<HTMLDivElement>(null);
	const { md } = useResponsive();

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
	const getElemIdInView = useCallback(() => {
		const items = [...(tocRef.current?.querySelectorAll('*[data-toc-id]') || [])];
		return (
			items
				.find(elem => {
					const rect = elem.getBoundingClientRect();
					const isInViewport =
						rect.top >= 0 &&
						rect.left >= 0 &&
						rect.bottom <=
							(window.innerHeight || document.documentElement.clientHeight) &&
						rect.right <= (window.innerWidth || document.documentElement.clientWidth);
					return isInViewport;
				})
				?.getAttribute('data-toc-id') || null
		);
	}, []);

	/**
	 * Set selected id & title
	 *
	 */
	const setSelectedItem = useCallback(() => {
		const elemId = getElemIdInView();
		if (elemId) {
			const elem = useMenuItems.find(menu => menu.id === elemId);
			setSelectedMenu(elem);
		}
	}, [getElemIdInView, useMenuItems]);

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
	}, [setSelectedItem, useMenuItems]);

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
		stickyOffset: containerStickyOffset + 20,
		selectedId: selectedMenu?.id,
		checked,
		setChecked,
		menuLabel,
		updateState,
		children,
		isCheckbox: isCheckView
	};

	return (
		<div className='flex flex-col md:flex-row' ref={tocRef}>
			<div className='contents w-full md:block md:max-w-[25%] md:flex-[0_0_25%]'>
				<div
					className='sticky z-10'
					style={{
						top: tocStickyOffset
					}}
				>
					{md ? <TOCDesktop {...props} /> : <TOCMobile {...props} />}
				</div>
			</div>
			<div className='w-full md:block md:max-w-[75%] md:flex-[0_0_75%] md:px-5'>
				<div>{children}</div>
			</div>
		</div>
	);
};

export default TableOfContents;
