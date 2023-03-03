import { FCReturn, ReactDivAttr } from '../../../typings/shared';
import ButtonKinds from '../Button/ButtonKinds';

interface FileUploaderProps extends ReactDivAttr {
	/**
	 * Specify the types of files that this input should be able to receive
	 */
	accept?: string[];

	/**
	 * Specify the type of the `<FileUploaderButton>`
	 */
	buttonKind?: ButtonKinds;

	/**
	 * Provide the label text to be read by screen readers when interacting with
	 * the `<FileUploaderButton>`
	 */
	buttonLabel?: string;

	/**
	 * Provide a custom className to be applied to the container node
	 */
	className?: string;

	/**
	 * Specify whether file input is disabled
	 */
	disabled?: boolean;

	/**
	 * Specify the status of the File Upload
	 */
	filenameStatus: 'edit' | 'complete' | 'uploading';

	/**
	 * Provide a description for the complete/close icon that can be read by screen readers
	 */
	iconDescription: string;

	/**
	 * Specify the description text of this `<FileUploader>`
	 */
	labelDescription?: string;

	/**
	 * Specify the title text of this `<FileUploader>`
	 */
	labelTitle?: string;

	/**
	 * Specify if the component should accept multiple files to upload
	 */
	multiple?: boolean;

	/**
	 * Provide a name for the underlying `<input>` node
	 */
	name?: string;

	/**
	 * Provide an optional `onChange` hook that is called each time the input is
	 * changed
	 */
	onChange?: () => void;

	/**
	 * Provide an optional `onClick` hook that is called each time the
	 * FileUploader is clicked
	 */
	onClick?: () => void;

	/**
	 * Provide an optional `onDelete` hook that is called when an uploaded item
	 * is removed
	 */
	onDelete?: () => void;

	/**
	 * Specify the size of the FileUploaderButton, from a list of available
	 * sizes.
	 */
	size?: 'sm' | 'md' | 'lg';
}

declare const FileUploader: FCReturn<FileUploaderProps>;

export default FileUploader;
