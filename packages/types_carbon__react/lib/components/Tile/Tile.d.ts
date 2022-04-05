import { FCReturn, ReactDivAttr } from '../../../typings/shared';
import { ReactNode } from 'react';

interface TileProps extends ReactDivAttr {
	/**
	 * The child nodes.
	 */
	children?: ReactNode;

	/**
	 * The CSS class names.
	 */
	className?: string;

	/**
	 * `true` to use the light version. For use on $ui-01 backgrounds only.
	 * Don't use this to make tile background color same as container background color.
	 */
	light?: boolean;
}

declare const Tile: FCReturn<TileProps>;

export default Tile;
