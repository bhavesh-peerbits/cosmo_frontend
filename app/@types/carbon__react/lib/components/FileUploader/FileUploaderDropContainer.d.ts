import { FCReturn, ReactDivAttr } from '../../../typings/shared';

interface FileUploaderDropContainerProps extends Omit<ReactDivAttr, 'accept'> {
	/**
	 * Specify the types of files that this input should be able to receive
	 */
	accept?: string[];

	/**
	 * Provide a custom className to be applied to the container node
	 */
	className?: string;

	/**
	 * Specify whether file input is disabled
	 */
	disabled?: boolean;

	/**
	 * Provide a unique id for the underlying `<input>` node
	 */
	id?: string;

	/**
	 * Provide the label text to be read by screen readers when interacting with
	 * this control
	 */
	labelText: string;

	/**
	 * Specify if the component should accept multiple files to upload
	 */
	multiple?: boolean;

	/**
	 * Provide a name for the underlying `<input>` node
	 */
	name?: string;

	/**
	 * Event handler that is called after files are added to the uploader
	 * The event handler signature looks like `onAddFiles(evt, { addedFiles })`
	 */
	onAddFiles?: (e: Event, { addedFiles }: { addedFiles: FileList }) => void;

	/**
	 * Provide a custom regex pattern for the acceptedTypes
	 */
	pattern?: string;

	/**
	 * Provide an accessibility role for the `<FileUploaderButton>`
	 */
	role?: string;

	/**
	 * Provide a custom tabIndex value for the `<FileUploaderButton>`
	 */
	tabIndex?: number;
}

declare const FileUploaderDropContainer: FCReturn<FileUploaderDropContainerProps>;

export default FileUploaderDropContainer;
