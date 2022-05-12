import React, { ComponentProps, ReactElement, ReactNode } from 'react';
import { Button } from '@carbon/react';
import TearsheetShell from './TearsheetShell';
import './tearsheet.scss';

/**
 * A tearsheet is a mostly full-screen type of dialog that keeps users
 * in-context and focused by bringing actionable content front and center while
 * revealing parts of the UI behind it. There is also a narrow variant of the
 * tearsheet.
 *
 * A tearsheet comprises up to 5 zones, allowing for flexibility depending on
 * the content: a heading area including a title, an optional navigation area
 * that sits just below the heading, an optional influencer which is a side
 * panel on either the left or right side, the main content area, and a set of
 * action buttons.
 */
const Tearsheet = React.forwardRef<HTMLDivElement, TearsheetProps>(
	({ influencerPosition = 'left', influencerWidth = 'narrow', ...rest }, ref) => {
		return (
			<TearsheetShell
				{...{
					...rest,
					influencerPosition,
					influencerWidth,
					portalTarget: document.getElementById('main'),
					ref,
					size: 'wide'
				}}
			/>
		);
	}
);

interface TearsheetProps {
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
	actions?: Array<ComponentProps<typeof Button> & { label?: string; loading?: boolean }>;

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
	 * (when this prop is omitted, or undefined or null) a tearsheet does not
	 * display a close icon if there are navigation actions ("transactional
	 * tearsheet") and displays one if there are no navigation actions ("passive
	 * tearsheet"), and that behavior can be overridden if required by setting
	 * this prop to either true or false.
	 */
	hasCloseIcon?: boolean;

	/**
	 * The content for the influencer section of the tearsheet, displayed
	 * alongside the main content. This is typically a menu, or filter, or
	 * progress indicator, or similar.
	 */
	influencer?: ReactElement;

	/**
	 * The position of the influencer section, 'left' or 'right'.
	 */
	influencerPosition?: 'left' | 'right';

	/**
	 * The width of the influencer: 'narrow' (the default) is 256px, and 'wide'
	 * is 320px.
	 */
	influencerWidth?: 'narrow' | 'wide';

	/**
	 * A label for the tearsheet, displayed in the header area of the tearsheet
	 * to maintain context for the tearsheet (e.g. as the title changes from page
	 * to page of a multi-page task).
	 */
	label?: ReactNode;

	/**
	 * Navigation content, such as a set of tabs, to be displayed at the bottom
	 * of the header area of the tearsheet.
	 */
	navigation?: ReactElement;

	/**
	 * An optional handler that is called when the user closes the tearsheet (by
	 * clicking the close button, if enabled, or clicking outside, if enabled).
	 * Returning `false` here prevents the modal from closing.
	 */
	onClose?: (byCancel: boolean) => void;

	/**
	 * Specifies whether the tearsheet is currently open.
	 */
	open?: boolean;

	/**
	 * The main title of the tearsheet, displayed in the header area.
	 */
	title?: ReactNode;

	isRail?: boolean;

	children?: ReactElement;
}

export default Tearsheet;
