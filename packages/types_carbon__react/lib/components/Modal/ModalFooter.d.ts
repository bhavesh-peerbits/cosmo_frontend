import { ReactNode, RefObject } from 'react';
import { FCReturn, ReactDivAttr } from '../../../typings/shared';

interface ModalFooterProps extends ReactDivAttr {
	/**
	 * Pass in content that will be rendered in the Modal Footer
	 */
	children?: ReactNode;

	/**
	 * Specify a custom className to be applied to the Modal Footer container
	 */
	className?: string;

	/**
	 * Specify an optional function that is called whenever the modal is closed
	 */
	closeModal?: () => void;

	/**
	 * Specify whether the primary button should be replaced with danger button.
	 * Note that this prop is not applied if you render primary/danger button by yourself
	 */
	danger?: boolean;

	/**
	 * The `ref` callback for the primary button.
	 */
	inputref?: RefObject<HTMLButtonElement>;

	/**
	 * Specify an optional function for when the modal is requesting to be
	 * closed
	 */
	onRequestClose?: () => void;

	/**
	 * Specify an optional function for when the modal is requesting to be
	 * submitted
	 */
	onRequestSubmit?: () => void;

	/**
	 * Specify whether the primary button should be disabled
	 */
	primaryButtonDisabled?: boolean;

	/**
	 * Specify the text for the primary button
	 */
	primaryButtonText?: string;

	/**
	 * Specify a custom className to be applied to the primary button
	 */
	primaryClassName?: string;

	/**
	 * Specify the text for the secondary button
	 */
	secondaryButtonText?: string;

	/**
	 * Specify an array of config objects for secondary buttons
	 * (`Array<{
	 *   buttonText: string,
	 *   onClick: function,
	 * }>`).
	 */
	secondaryButtons?: Array<{
		buttonText: string;
		onClick: () => void;
	}>;

	/**
	 * Specify a custom className to be applied to the secondary button
	 */
	secondaryClassName?: string;
}

declare const ModalFooter: FCReturn<ModalFooterProps>;

export default ModalFooter;
