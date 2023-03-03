import { ReactElement, ReactNode } from 'react';
import { ExtendLink, LinkProps } from './Link';
import { AriaLabelProps } from '../../../typings/shared';

type SwitcherItemProps<K extends ExtendLink> = AriaLabelProps &
	LinkProps<K> & {
		/**
		 * Specify the text content for the link
		 */
		children: ReactNode;

		/**
		 * Optionally provide a custom class to apply to the underlying `<li>` node
		 */
		className?: string;

		/**
		 * Specify the tab index of the Link
		 */
		tabIndex?: number;

		isSelected?: boolean;
	};

declare function SwitcherItem<T extends ExtendLink = 'a'>(
	props: SwitcherItemProps<T>
): ReactElement;

export default SwitcherItem;
