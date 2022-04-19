import { ReactNode } from 'react';
import { AriaLabelProps, FCReturn, ReactDivAttr } from '../../../typings/shared';

interface ComposedModalProps extends AriaLabelProps, ReactDivAttr {
	/**
	 * Specify the content to be placed in the ComposedModal
	 */
	children?: ReactNode;

	/**
	 * Specify an optional className to be applied to the modal root node
	 */
	className?: string;

	/**
	 * Specify an optional className to be applied to the modal node
	 */
	containerClassName?: string;

	/**
	 * Specify whether the primary button should be replaced with danger button.
	 * Note that this prop is not applied if you render primary/danger button by yourself
	 */
	danger?: boolean;

	/**
	 * Specify an optional handler for closing modal.
	 * Returning `false` here prevents closing modal.
	 */
	onClose?: ReactDivAttr['onClick'];

	/**
	 * Specify an optional handler for the `onKeyDown` event. Called for all
	 * `onKeyDown` events that do not close the modal
	 */
	onKeyDown?: ReactDivAttr['onKeyDown'];

	/**
	 * Specify whether the Modal is currently open
	 */
	open?: boolean;

	preventCloseOnClickOutside?: boolean;

	/**
	 * Specify a CSS selector that matches the DOM element that should be
	 * focused when the Modal opens
	 */
	selectorPrimaryFocus?: string;

	/**
	 * Specify the CSS selectors that match the floating menus
	 */
	selectorsFloatingMenus?: string[];

	/**
	 * Specify the size variant.
	 */
	size?: 'xs' | 'sm' | 'md' | 'lg';
}

declare const ComposedModal: FCReturn<ComposedModalProps>;

export default ComposedModal;
