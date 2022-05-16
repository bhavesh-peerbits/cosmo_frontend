import { ReactElement, ReactNode } from 'react';
import { FCReturn, ReactDivAttr } from '../../../typings/shared';

interface TagProps extends Omit<ReactDivAttr, 'size'> {
	/**
	 * Provide content to be rendered inside of a <Tag>
	 */
	children?: ReactNode;

	/**
	 * Provide a custom className that is applied to the containing <span>
	 */
	className?: string;

	/**
	 * Specify if the <Tag> is disabled
	 */
	disabled?: boolean;

	/**
	 * Determine if <Tag> is a filter/chip
	 */
	filter?: boolean;

	/**
	 * Specify the id for the tag.
	 */
	id?: string;

	/**
	 * Click handler for filter tag close button.
	 */
	onClose?: () => void;

	/**
	 * Optional prop to render a custom icon.
	 * Can be a React component class
	 */
	renderIcon?: (() => ReactElement) | ReactElement;

	/**
	 * Specify the size of the Tag. Currently supports either `sm` or
	 * 'md' (default) sizes.
	 */
	size?: 'sm' | 'md';

	/**
	 * Text to show on clear filters
	 */
	title?: string;

	/**
	 * Specify the type of the <Tag>
	 */
	type?:
		| 'red'
		| 'magenta'
		| 'purple'
		| 'blue'
		| 'cyan'
		| 'teal'
		| 'green'
		| 'gray'
		| 'cool-gray'
		| 'warm-gray'
		| 'high-contrast'
		| 'outline';
}

declare const Tag: FCReturn<TagProps>;

export default Tag;
