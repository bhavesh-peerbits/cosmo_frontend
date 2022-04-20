import { ReactNode } from 'react';
import { FCReturn, ReactDivAttr } from '../../../typings/shared';

interface CodeSnippetProps extends ReactDivAttr {
	/**
	 * Specify a label to be read by screen readers on the containing <textbox>
	 * node
	 */
	ariaLabel?: string;

	/**
	 * Provide the content of your CodeSnippet as a node or string
	 */
	children?: ReactNode;

	/**
	 * Specify an optional className to be applied to the container node
	 */
	className?: string;

	/**
	 * Specify the description for the Copy Button
	 */
	copyButtonDescription?: string;

	/**
	 * Optional text to copy. If not specified, the `children` node's `innerText`
	 * will be used as the copy value.
	 */
	copyText?: string;

	/**
	 * Specify whether or not the CodeSnippet should be disabled
	 */
	disabled?: boolean;

	/**
	 * Specify the string displayed when the snippet is copied
	 */
	feedback?: string;

	/**
	 * Specify the time it takes for the feedback message to timeout
	 */
	feedbackTimeout?: number;

	/**
	 * Specify whether or not a copy button should be used/rendered.
	 */
	hideCopyButton?: boolean;

	/**
	 * Specify whether you are using the light variant of the Code Snippet,
	 * typically used for inline snippet to display an alternate color
	 */
	light?: boolean;

	/**
	 * Specify the maximum number of rows to be shown when in collapsed view
	 */
	maxCollapsedNumberOfRows?: number;

	/**
	 * Specify the maximum number of rows to be shown when in expanded view
	 */
	maxExpandedNumberOfRows?: number;

	/**
	 * Specify the minimum number of rows to be shown when in collapsed view
	 */
	minCollapsedNumberOfRows?: number;

	/**
	 * Specify the minimum number of rows to be shown when in expanded view
	 */
	minExpandedNumberOfRows?: number;

	/**
	 * An optional handler to listen to the `onClick` even fired by the Copy
	 * Button
	 */
	onClick?: ReactDivAttr['onClick'];

	/**
	 * Specify a string that is displayed when the Code Snippet has been
	 * interacted with to show more lines
	 */
	showLessText?: string;

	/**
	 * Specify a string that is displayed when the Code Snippet text is more
	 * than 15 lines
	 */
	showMoreText?: string;

	/**
	 * Provide the type of Code Snippet
	 */
	type?: 'single' | 'inline' | 'multi';

	/**
	 * Specify whether or not to wrap the text.
	 */
	wrapText?: boolean;
}
declare const CodeSnippet: FCReturn<CodeSnippetProps>;

export default CodeSnippet;
