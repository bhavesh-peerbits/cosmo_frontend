import { AriaLabelProps, FCReturn, ReactDivAttr } from '../../../typings/shared';
import { ReactNode } from 'react';

interface ModalBodyProps extends AriaLabelProps, ReactDivAttr {
	/**
	 * Specify the content to be placed in the ModalBody
	 */
	children?: ReactNode;

	/**
	 * Specify an optional className to be added to the Modal Body node
	 */
	className?: string;

	/**
	 * Provide whether the modal content has a form element.
	 * If `true` is used here, non-form child content should have `bx--modal-content__regular-content` class.
	 */
	hasForm?: boolean;

	/**
	 * Specify whether the modal contains scrolling content
	 */
	hasScrollingContent?: boolean;
}

declare const ModalBody: FCReturn<ModalBodyProps>;

export default ModalBody;
