import { FCReturn, ReactDivAttr } from '../../../typings/shared';
import React, { AriaRole, ReactNode } from 'react';

interface ActionableNotificationProps extends ReactDivAttr {
	/**
	 * Pass in the action button label that will be rendered within the ActionableNotification.
	 */
	actionButtonLabel: string;

	/**
	 * Provide a description for "close" icon button that can be read by screen readers
	 */
	ariaLabel?: string;

	/**
	 * Specify the caption
	 */
	caption?: string;

	/**
	 * Specify the content
	 */
	children?: ReactNode;

	/**
	 * Specify an optional className to be applied to the notification box
	 */
	className?: string;

	/**
	 * Specify if pressing the escape key should close notifications
	 */
	closeOnEscape?: boolean;

	/**
	 * Specify if focus should be moved to the component when the notification contains actions
	 */
	hasFocus?: boolean;

	/**
	 * Specify the close button should be disabled, or not
	 */
	hideCloseButton?: boolean;

	/*
	 * Specify if the notification should have inline styling applied instead of toast
	 */
	inline?: boolean;

	/**
	 * Specify what state the notification represents
	 */
	kind: 'error' | 'info' | 'info-square' | 'success' | 'warning' | 'warning-alt';

	/**
	 * Specify whether you are using the low contrast variant of the ActionableNotification.
	 */
	lowContrast?: boolean;

	/**
	 * Provide a function that is called when the action is clicked
	 */
	onActionButtonClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;

	/**
	 * Provide a function that is called when menu is closed
	 */
	onClose?: (event: React.MouseEvent<HTMLButtonElement>) => void;

	/**
	 * Provide a function that is called when the close button is clicked
	 */
	onCloseButtonClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;

	/**
	 * By default, this value is "alertdialog". You can also provide an alternate
	 * role if it makes sense from the accessibility-side.
	 */
	role?: AriaRole;

	/**
	 * Provide a description for "status" icon that can be read by screen readers
	 */
	statusIconDescription?: string;

	/**
	 * Specify the sub-title
	 */
	subtitle?: string;

	/**
	 * Specify the title
	 */
	title?: string;
}

declare const ActionableNotification: FCReturn<ActionableNotificationProps>;

export default ActionableNotification;
