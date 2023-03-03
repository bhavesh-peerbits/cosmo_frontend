import { FCReturn, ReactDivAttr } from '../../../typings/shared';

interface FileUploaderItemProps extends ReactDivAttr {
	/**
	 * Error message body for an invalid file upload
	 */
	errorBody?: string;

	/**
	 * Error message subject for an invalid file upload
	 */
	errorSubject?: string;

	/**
	 * Description of status icon (displayed in native tooltip)
	 */
	iconDescription?: string;

	/**
	 * Specify if the currently uploaded file is invalid
	 */
	invalid?: boolean;

	/**
	 * Name of the uploaded file
	 */
	name?: string;

	/**
	 * Event handler that is called after removing a file from the file uploader
	 * The event handler signature looks like `onDelete(evt, { uuid })`
	 */
	onDelete?: () => void;

	/**
	 * Specify the size of the FileUploaderButton, from a list of available
	 * sizes.
	 */
	size?: 'sm' | 'md' | 'lg';

	/**
	 * Status of the file upload
	 */
	status?: 'uploading' | 'edit' | 'complete';

	/**
	 * Unique identifier for the file object
	 */
	uuid?: string;
}

declare const FileUploaderItem: FCReturn<FileUploaderItemProps>;

export default FileUploaderItem;
