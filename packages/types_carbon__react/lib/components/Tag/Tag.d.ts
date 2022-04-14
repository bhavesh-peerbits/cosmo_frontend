import { FCReturn, ReactDivAttr } from '../../../typings/shared';
import { ReactNode, ReactElement } from 'react';

interface TagProps extends ReactDivAttr {
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
	type?: 'blue' | 'cyan';
}

declare const Tag: FCReturn<TagProps>;

export default Tag;
