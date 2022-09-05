import { ToastNotification } from '@carbon/react';
import { ComponentProps } from 'react';

interface NotificationAction {
	label: string;
	onClick: () => void;
}

interface PopupNotification {
	title: string;
	message: string;
	type: NonNullable<ComponentProps<typeof ToastNotification>['kind']>;
	action?: NotificationAction;
	timeout?: 'short' | 'long';
}

export default PopupNotification;
