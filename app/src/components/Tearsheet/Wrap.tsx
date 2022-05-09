import {
	Children,
	ElementType,
	FC,
	forwardRef,
	FunctionComponent,
	isValidElement,
	ReactNode
} from 'react';

// Examine a flat array of children to decide whether it is effectively empty.
// If there are no children, or all the children are falsy, or all the non-falsy
// children are themselves Wrap components that are empty, then return true.

const isWrapElement = (children: ReactNode): children is JSX.Element | JSX.Element[] => {
	return (
		isValidElement(children) &&
		typeof children.type === 'function' &&
		(children.type as FunctionComponent).displayName === 'Wrap'
	);
};

const isEmpty = (children: ReactNode) => {
	let result = true;
	Children.forEach(children, child => {
		if (child) {
			result &&= isWrapElement(child) && isEmpty(child?.props?.children);
		}
	});
	return result;
};

/**
 * A simple conditional wrapper that encloses its children in a <div> (or other
 * element if specified), passing any supplied attributes to the <div> (or other
 * element). The component renders nothing at all if there are no children or
 * the children are empty/falsy, or if all the non-falsy children are themselves
 * Wrap components that do not wish to render. This behavior can be overridden
 * by setting neverRender or alwaysRender to true. Note that if a ref is passed,
 * the ref.current will be set to the wrapper element if it renders, and will
 * remain undefined if it does not render.
 */
const Wrap = forwardRef<HTMLElement, WrapProps>(
	(
		{
			// The component props, in alphabetical order (for consistency).

			alwaysRender,
			children,
			element: Wrapper = 'div',
			neverRender,
			className,
			style
		},
		ref
	) =>
		(neverRender || isEmpty(children)) && !alwaysRender ? null : (
			<Wrapper ref={ref} className={className} style={style}>
				{children}
			</Wrapper>
		)
);

interface WrapProps {
	/**
	 * Specify whether the wrapper element should render even if there are no
	 * children or the children are themselves empty wrappers. Useful if there
	 * are some conditions in which the wrapper element is still required. Note
	 * that this prop takes precedence over neverRender if both are set to true.
	 */
	alwaysRender?: boolean;

	/**
	 * The content of the wrapper element. If no children are supplied, or the
	 * resulting value(s) are falsy, or if all the non-falsy children are Wrap
	 * components that decide not to render, nothing will be rendered in the DOM.
	 */
	children?: ReactNode;

	/**
	 * The element name or component to use as a wrapper for the content.
	 */
	element?: FC | ElementType;

	className?: string;
	/**
	 * Specify whether nothing should be rendered even if there are children
	 * in the content. Useful if there are some circumstances in which the
	 * component should not render at all. Note that if alwaysRender is also
	 * set to true then it will take precedence and the wrapper element and
	 * content will be rendered.
	 */
	neverRender?: boolean;

	style?: React.CSSProperties;
}

export default Wrap;
