import { ReactNode } from 'react';
import { FCReturn, ReactDivAttr } from '../../../typings/shared';

interface TileAboveTheFoldContentProps extends ReactDivAttr {
	/**
	 * The child nodes.
	 */
	children?: ReactNode;
}
declare const TileAboveTheFoldContent: FCReturn<TileAboveTheFoldContentProps>;

export default TileAboveTheFoldContent;
