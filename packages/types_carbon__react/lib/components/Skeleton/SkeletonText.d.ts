import { FCReturn, ReactAttr } from '../../../typings/shared';

interface SkeletonTextProps extends ReactAttr<HTMLParagraphElement> {
	/**
	 * Specify an optional className to be applied to the container node
	 */
	className?: string;
	/**
	 * generates skeleton text at a larger size
	 */
	heading?: boolean;
	/**
	 * the number of lines in a paragraph
	 */
	lineCount?: number;
	/**
	 * will generate multiple lines of text
	 */
	paragraph?: boolean;
	/**
	 * width (in px or %) of single line of text or max-width of paragraph lines
	 */
	width?: string;
}

declare const SkeletonText: FCReturn<SkeletonTextProps>;

export default SkeletonText;
