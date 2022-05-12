import { FC, ReactNode } from 'react';

interface InlineNotificationProps {
	/**
	 * Specify the content
	 */
	children?: ReactNode;

	/**
	 * Specify an optional className to be applied to the notification box
	 */
	className?: string;

	/**
	 * Specify the close button should be disabled, or not
	 */
	hideCloseButton?: boolean;

	/**
	 * Specify what state the notification represents
	 */
	kind?: 'error' | 'info' | 'info-square' | 'success' | 'warning' | 'warning-alt';

	/**
	 * Specify whether you are using the low contrast variant of the InlineNotification.
	 */
	lowContrast?: boolean;

	/**
	 * Provide a function that is called when menu is closed
	 */
	onClose?: () => void;

	/**
	 * Provide a function that is called when the close button is clicked
	 */
	onCloseButtonClick?: () => void;

	/**
	 * By default, this value is "status". You can also provide an alternate
	 * role if it makes sense from the accessibility-side.
	 */
	role?: 'alert' | 'log' | 'status';

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

declare const InlineNotification: FC<InlineNotificationProps>;
export default InlineNotification;
