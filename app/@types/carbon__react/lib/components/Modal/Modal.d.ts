import { ReactNode } from 'react';
import {
	AriaLabelProps,
	FCReturn,
	ReactButtonAttr,
	ReactDivAttr
} from '../../../typings/shared';

interface ModalProps extends AriaLabelProps, Omit<ReactDivAttr, 'size'> {
	/**
	 * Specify whether the Modal is displaying an alert, error or warning
	 * Should go hand in hand with the danger prop.
	 */
	alert?: boolean;
	/**
	 * Provide the contents of your Modal
	 */
	children?: ReactNode;

	/**
	 * Specify an optional className to be applied to the modal root ReactNode
	 */
	className?: string;

	/**
	 * Specify an label for the close button of the modal; defaults to close
	 */
	closeButtonLabel?: string;

	/**
	 * Specify whether the Modal is for dangerous actions
	 */
	danger?: boolean;

	/**
	 * Specify whether the modal contains scrolling content
	 */
	hasScrollingContent?: boolean;

	/**
	 * Specify the DOM element ID of the top-level ReactNode.
	 */
	id?: string;

	/**
	 * Specify whether or not the Modal content should have any inner padding.
	 */
	isFullWidth?: boolean;

	/**
	 * Specify a label to be read by screen readers on the modal root ReactNode
	 */
	modalAriaLabel?: string;

	/**
	 * Specify the content of the modal header title.
	 */
	modalHeading?: ReactNode;

	/**
	 * Specify the content of the modal header label.
	 */
	modalLabel?: ReactNode;

	/**
	 * Specify a handler for keypresses.
	 */
	onKeyDown?: ReactDivAttr['onKeyDown'];

	/**
	 * Specify a handler for closing modal.
	 * The handler should care of closing modal, e.g. changing `open` prop.
	 */
	onRequestClose?: ReactButtonAttr['onClick'];

	/**
	 * Specify a handler for "submitting" modal.
	 * The handler should care of closing modal, e.g. changing `open` prop, if necessary.
	 */
	onRequestSubmit?: ReactButtonAttr['onClick'];

	/**
	 * Specify a handler for the secondary button.
	 * Useful if separate handler from `onRequestClose` is desirable
	 */
	onSecondarySubmit?: ReactButtonAttr['onClick'];

	/**
	 * Specify whether the Modal is currently open
	 */
	open?: boolean;

	/**
	 * Specify whether the modal should be button-less
	 */
	passiveModal?: boolean;

	/**
	 * Prevent closing on click outside of modal
	 */
	preventCloseOnClickOutside?: boolean;

	/**
	 * Specify whether the Button should be disabled, or not
	 */
	primaryButtonDisabled?: boolean;

	/**
	 * Specify the text for the primary button
	 */
	primaryButtonText?: ReactNode;

	/**
	 * Specify the text for the secondary button
	 */
	secondaryButtonText?: ReactNode;

	/**
	 * Specify an array of config objects for secondary buttons
	 * (`Array<{
	 *   buttonText?: string,
	 *   onClick?: function,
	 * }>`).
	 */
	secondaryButtons?: { buttonText?: ReactNode; onClick?: ReactButtonAttr['onClick'] };

	/**
	 * Specify a CSS selector that matches the DOM element that should
	 * be focused when the Modal opens
	 */
	selectorPrimaryFocus?: string;

	/**
	 * Specify CSS selectors that match DOM elements working as floating menus.
	 * Focusing on those elements won't trigger "focus-wrap" behavior
	 */
	selectorsFloatingMenus?: string[];

	/**
	 * Specify if Enter key should be used as "submit" action
	 */
	shouldSubmitOnEnter?: boolean;

	/**
	 * Specify the size variant.
	 */
	size?: 'xs' | 'sm' | 'md' | 'lg';
}

declare const Modal: FCReturn<ModalProps>;

export default Modal;
