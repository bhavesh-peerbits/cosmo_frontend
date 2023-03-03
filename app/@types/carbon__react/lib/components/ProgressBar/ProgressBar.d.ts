import { FCReturn } from 'typings/shared';

interface ProgressBarProps {
	/**
	 * Additional CSS class names.
	 */
	className?: string;

	/**
	 * The current progress as a textual representation.
	 */
	helperText?: string;

	/**
	 * Whether the label should be visually hidden.
	 */
	hideLabel?: boolean;

	/**
	 * A label describing the progress bar.
	 */
	label: string;

	/**
	 * The maximum value.
	 */
	max?: number;

	/**
	 * Specify the size of the ProgressBar.
	 */
	size?: 'small' | 'big';

	/**
	 * Specify the status.
	 */
	status?: 'active' | 'finished' | 'error';

	/**
	 * Defines the alignment variant of the progress bar.
	 */
	type?: 'default' | 'inline' | 'indented';

	/**
	 * The current value.
	 */
	value?: number;
}

declare const ProgressBar: FCReturn<ProgressBarProps>;

export default ProgressBar;
