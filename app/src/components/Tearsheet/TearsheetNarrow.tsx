import { Button } from '@carbon/react';
import { ComponentProps, forwardRef, ReactElement, ReactNode, useRef } from 'react';

import TearsheetShell from './TearsheetShell';

/**
 * A narrow tearsheet is a slimmer variant of the tearsheet, providing a dialog
 * that keeps users in-context and focused by bringing actionable content front
 * and center while revealing more of the UI behind it.
 *
 * A narrow tearsheet comprises 3 zones: a heading area including a title, the
 * main content area, and a set of action buttons.
 */
const TearsheetNarrow = forwardRef<HTMLDivElement, TearsheetNarrowProps>(
	({ ...rest }, ref) => {
		const portalRef = useRef<HTMLDivElement>(null);
		return (
			<div ref={portalRef}>
				<TearsheetShell
					{...{
						...rest,
						portalTarget: portalRef.current,
						ref,
						size: 'narrow'
					}}
				/>
			</div>
		);
	}
);

interface TearsheetNarrowProps {
	/**
	 * The navigation actions to be shown as buttons in the action area at the
	 * bottom of the tearsheet. Each action is specified as an object with
	 * optional fields: 'label' to supply the button label, 'kind' to select the
	 * button kind (must be 'primary', 'secondary' or 'ghost'), 'loading' to
	 * display a loading indicator, and 'onClick' to receive notifications when
	 * the button is clicked. Additional fields in the object will be passed to
	 * the Button component, and these can include 'disabled', 'ref', 'className',
	 * and any other Button props. Any other fields in the object will be passed
	 * through to the button element as HTML attributes.
	 *
	 * See https://react.carbondesignsystem.com/?path=/docs/components-button--default#component-api
	 */
	actions?: Array<ComponentProps<typeof Button> & { label?: string }>;

	/**
	 * An optional class or classes to be added to the outermost element.
	 */
	className?: string;

	/**
	 * The accessibility title for the close icon (if shown).
	 *
	 * **Note:** This prop is only required if a close icon is shown, i.e. if
	 * there are a no navigation actions and/or hasCloseIcon is true.
	 */
	closeIconDescription?: string;

	/**
	 * A description of the flow, displayed in the header area of the tearsheet.
	 */
	description?: ReactNode;

	/**
	 * Enable a close icon ('x') in the header area of the tearsheet. By default,
	 * a tearsheet does not display a close icon, but one should be enabled if
	 * the tearsheet is read-only or has no navigation actions (sometimes called
	 * a "passive tearsheet").
	 */
	hasCloseIcon?: boolean;

	/**
	 * A label for the tearsheet, displayed in the header area of the tearsheet
	 * to maintain context for the tearsheet (e.g. as the title changes from page
	 * to page of a multi-page task).
	 */
	label?: ReactNode;

	/**
	 * An optional handler that is called when the user closes the tearsheet (by
	 * clicking the close button, if enabled, or clicking outside, if enabled).
	 * Returning `false` here prevents the modal from closing.
	 */
	onClose?: () => void;

	/**
	 * Specifies whether the tearsheet is currently open.
	 */
	open?: boolean;

	/**
	 * The main title of the tearsheet, displayed in the header area.
	 */
	title?: ReactNode;

	children?: ReactElement;
}

export default TearsheetNarrow;
