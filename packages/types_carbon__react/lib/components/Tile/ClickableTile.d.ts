import { FCReturn, ReactDivAttr } from '../../../typings/shared';
import { ReactNode } from 'react';

interface ClickableTileProps extends ReactDivAttr {
	/**
	 * The child nodes.
	 */
	children?: ReactNode;

	/**
	 * The CSS class names.
	 */
	className?: string;

	/**
	 * Boolean for whether a tile has been clicked.
	 */
	clicked?: boolean;

	/**
	 * The href for the link.
	 */
	href?: string;

	/**
	 * Specify the function to run when the ClickableTile is clicked
	 */
	onClick?: ReactDivAttr['onClick'];

	/**
	 * Specify the function to run when the ClickableTile is interacted with via a keyboard
	 */
	onKeyDown?: ReactDivAttr['onKeyDown'];

	/**
	 * The rel property for the link.
	 */
	rel?: string;
}
declare const ClickableTile: FCReturn<ClickableTileProps>;

export default ClickableTile;
