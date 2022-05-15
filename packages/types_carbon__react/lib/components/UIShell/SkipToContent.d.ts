import { FCReturn, ReactAttr } from '../../../typings/shared';

interface SkipToContentProps extends Omit<ReactAttr<HTMLAnchorElement>, 'tabIndex'> {
	/**
	 * Provide text to display in the SkipToContent `a` tag
	 */
	children: string;

	/**
	 * Provide the `href` to the id of the element on your package that is the
	 * main content.
	 */
	href: string;

	/**
	 * Optionally override the default tabindex of 0
	 */
	tabIndex?: string;
}

declare const SkipToContent: FCReturn<SkipToContentProps>;
export default SkipToContent;
