import React, { ReactNode } from 'react';
import { FCReturn, ReactDivAttr } from '../../../typings/shared';

interface ModalHeaderProps extends Omit<ReactDivAttr, 'label' | 'title'> {
	/**
	 * Provide an optional function to be called when the close button is
	 * clicked
	 */
	buttonOnClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;

	/**
	 * Specify the content to be placed in the ModalHeader
	 */
	children?: ReactNode;

	/**
	 * Specify an optional className to be applied to the modal header
	 */
	className?: string;

	/**
	 * Specify an optional className to be applied to the modal close node
	 */
	closeClassName?: string;

	/**
	 * Specify an optional className to be applied to the modal close icon node
	 */
	closeIconClassName?: string;

	/**
	 * Provide an optional function to be called when the modal is closed
	 */
	closeModal?: () => void;

	/**
	 * Specify a description for the close icon that can be read by screen
	 * readers
	 */
	iconDescription?: string;

	/**
	 * Specify an optional label to be displayed
	 */
	label?: ReactNode;

	/**
	 * Specify an optional className to be applied to the modal header label
	 */
	labelClassName?: string;

	/**
	 * Specify an optional title to be displayed
	 */
	title?: ReactNode;

	/**
	 * Specify an optional className to be applied to the modal heading
	 */
	titleClassName?: string;
}

declare const ModalHeader: FCReturn<ModalHeaderProps>;

export default ModalHeader;
