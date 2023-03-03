import { ReactNode } from 'react';
import { FCReturn, ReactDivAttr } from '../../../typings/shared';

interface ExpandableTileProps extends ReactDivAttr {
	/**
	 * The child nodes.
	 */
	children?: ReactNode;

	/**
	 * The CSS class names.
	 */
	className?: string;

	/**
	 * `true` if the tile is expanded.
	 */
	expanded?: boolean;

	/**
	 * An ID that can be provided to aria-labelledby
	 */
	id?: string;

	/**
	 * `true` to use the light version. For use on $ui-01 backgrounds only.
	 * Don't use this to make tile background color same as container background color.
	 */
	light?: boolean;

	/**
	 * optional handler to decide whether to ignore a click. returns false if click should be ignored
	 */
	onBeforeClick?: ReactDivAttr['onBeforeClick'];

	/**
	 * Specify the function to run when the ExpandableTile is clicked
	 */
	onClick?: ReactDivAttr['onClick'];

	/**
	 * optional handler to trigger a function when a key is pressed
	 */
	onKeyUp?: ReactDivAttr['onKeyUp'];

	/**
	 * The `tabindex` attribute.
	 */
	tabIndex?: number;

	/**
	 * The description of the "collapsed" icon that can be read by screen readers.
	 */
	tileCollapsedIconText?: string;

	/**
	 * When "collapsed", a label to appear next to the chevron (e.g., "View more").
	 */
	tileCollapsedLabel?: string;

	/**
	 * The description of the "expanded" icon that can be read by screen readers.
	 */
	tileExpandedIconText?: string;

	/**
	 * When "expanded", a label to appear next to the chevron (e.g., "View less").
	 */
	tileExpandedLabel?: string;
}
declare const ExpandableTile: FCReturn<ExpandableTileProps>;

export default ExpandableTile;
