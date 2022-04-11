import { ReactNode } from 'react';
import { FCReturn } from '../../../typings/shared';

interface SwitchProps {
  /**
   * Provide child elements to be rendered inside of the Switch
   */
  children?: ReactNode,

  /**
   * Specify an optional className to be added to your Switch
   */
  className?: string,

  /**
   * Specify whether or not the Switch should be disabled
   */
  disabled?: boolean,

  /**
   * The index of your Switch in your ContentSwitcher that is used for event handlers.
   * Reserved for usage in ContentSwitcher
   */
  index?: number,

  /**
   * Provide the name of your Switch that is used for event handlers
   */
  name?: string | number,

  /**
   * A handler that is invoked when a user clicks on the control.
   * Reserved for usage in ContentSwitcher
   */
  onClick?: () => void,

  /**
   * A handler that is invoked on the key down event for the control.
   * Reserved for usage in ContentSwitcher
   */
  onKeyDown?: () => void,

  /**
   * Whether your Switch is selected. Reserved for usage in ContentSwitcher
   */
  selected?: boolean,

  /**
   * Provide the contents of your Switch
   */
  text?: string | ReactNode
}

declare const Switch: FCReturn<SwitchProps>;
export default Switch;