import { FCReturn, ReactAttr } from '../../../typings/shared';
import {ReactNode} from 'react'

interface AccordionItemProps extends ReactAttr<HTMLElement> {
/**
   * Provide the contents of your AccordionItem
   */
  children?: ReactNode

  /**
   * Specify an optional className to be applied to the container node
   */
  className?: string

  /**
   * Specify whether an individual AccordionItem should be disabled
   */
  disabled?: boolean,

  /**
   * The handler of the massaged `click` event.
   */
  onClick?: () => void,

  /**
   * The handler of the massaged `click` event on the heading.
   */
  onHeadingClick?: () => void,

  /**
   * `true` to open the expand.
   */
  open?: boolean,

  /**
   * The callback function to render the expand button.
   * Can be a React component class.
   */
  renderToggle?: () => void,

  /**
   * The accordion title.
   */
  title?: ReactNode,

}
declare const AccordionItem: FCReturn<AccordionItemProps>;

export default AccordionItem;