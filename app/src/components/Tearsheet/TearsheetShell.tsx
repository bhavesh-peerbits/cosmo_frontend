// Import portions of React that are needed.
import React, {
	ComponentProps,
	MutableRefObject,
	ReactElement,
	ReactNode,
	useEffect,
	useRef,
	useState
} from 'react';
import { createPortal } from 'react-dom';
import { useSize } from 'ahooks';

// Other standard imports.
import cx from 'classnames';

// Carbon and package components we use.
import {
	Button,
	ComposedModal,
	InlineLoading,
	ModalBody,
	ModalFooter,
	ModalHeader
} from '@carbon/react';
import Wrap from '@components/Tearsheet/Wrap';
import useResponsive from '@hooks/useResponsive';
import { useTranslation } from 'react-i18next';

type HandlerType = {
	(newDepth: number, newPosition: number): void;
	checkFocus(): void;
	claimFocus(): void;
};

const bc = `tearsheet`;
const maxDepth = 3;
const stack: {
	open: HandlerType[];
	all: HandlerType[];
} = { open: [], all: [] };

const tearsheetIsPassive = (actions: unknown[] | undefined) =>
	!actions || !actions?.length;
const tearsheetHasCloseIcon = (
	actions: unknown[] | undefined,
	hasCloseIcon: boolean | undefined,
	md: boolean
) => hasCloseIcon || !md || tearsheetIsPassive(actions);

// TearSheetShell is used internally by TearSheet and TearSheetNarrow
const TearsheetShell = React.forwardRef<HTMLDivElement, TearsheetShellProps>(
	(
		{
			// The component props, in alphabetical order (for consistency).
			actions,
			children,
			className,
			closeIconDescription,
			description,
			hasCloseIcon,
			headerActions,
			influencer,
			influencerPosition,
			influencerWidth,
			label,
			navigation,
			onClose,
			open: propOpen,
			size,
			selectorPrimaryFocus,
			portalTarget: portalTargetIn,
			title,
			isRail,
			removeTertiaryButton,
			// Collect any other property values passed in.
			...rest
		},
		ref
	) => {
		// node the modal tearsheet is hosted in
		const [open, setOpen] = useState(propOpen);
		const { md } = useResponsive();
		const { t } = useTranslation('modals');

		useEffect(() => {
			setOpen(propOpen);
		}, [propOpen]);

		const portalTarget = portalTargetIn || document.body;

		const localRef = useRef<HTMLDivElement>(null);
		const modalRef = (ref || localRef) as MutableRefObject<HTMLDivElement>;

		const refResize = useRef(null);
		const resizer = useSize(refResize);
		const width = resizer?.width || 0;

		// Keep track of the stack depth and our position in it (1-based, 0=closed)
		const [depth, setDepth] = useState(0);
		const [position, setPosition] = useState(0);

		// Keep a record of the previous value of depth.
		const prevDepth = useRef<number>(depth);
		useEffect(() => {
			prevDepth.current = depth;
		}, [depth]);

		// A "passive" tearsheet is one with no navigation actions.
		const isPassive = tearsheetIsPassive(actions);
		const effectiveHasCloseIcon = tearsheetHasCloseIcon(actions, hasCloseIcon, md);

		// Callback that will be called whenever the stacking order changes.
		// position is 1-based with 0 indicating closed.
		function handleStackChange(newDepth: number, newPosition: number) {
			setDepth(newDepth);
			setPosition(newPosition);
		}

		handleStackChange.checkFocus = () => {
			// if we are now the topmost tearsheet, ensure we have focus
			if (
				position === depth &&
				modalRef.current &&
				!modalRef.current.contains(document.activeElement)
			) {
				handleStackChange.claimFocus();
			}
		};

		// Callback to give the tearsheet the opportunity to claim focus
		handleStackChange.claimFocus = () => {
			const element = selectorPrimaryFocus
				? modalRef.current.querySelector(selectorPrimaryFocus)
				: modalRef.current;
			setTimeout(() => (element as HTMLElement)?.focus(), 1);
		};

		useEffect(() => {
			const notify = () =>
				stack.all.forEach(handler => {
					handler(Math.min(stack.open.length, maxDepth), stack.open.indexOf(handler) + 1);
					handler.checkFocus();
				});

			// Register this tearsheet's stack change callback/listener.
			stack.all.push(handleStackChange);

			// If the tearsheet is mounting with open=true or open is changing from
			// false to true to open it then append its notification callback to
			// the end of the stack array (as its ID), and call all the callbacks
			// to notify all open tearsheets that the stacking has changed.
			if (open) {
				stack.open.push(handleStackChange);
				notify();
			}

			// Cleanup function called whenever the tearsheet unmounts or the open
			// prop changes value (in which case it is called prior to this hook
			// being called again).
			return function cleanup() {
				// Remove the notification callback from the all handlers array.
				stack.all.splice(stack.all.indexOf(handleStackChange), 1);

				// Remove the notification callback from the open handlers array, if
				// it's there, and notify all open tearsheets that the stacking has
				// changed (only necessary if this tearsheet was open).
				const openIndex = stack.open.indexOf(handleStackChange);
				if (openIndex >= 0) {
					stack.open.splice(openIndex, 1);
					notify();
				}
			};
		}, [open]);

		// const handleFocus = useCallback(() => {
		// 	// If something within us is receiving focus but we are not the topmost
		// 	// stacked tearsheet, transfer focus to the topmost tearsheet instead
		// 	if (position < depth) {
		// 		stack.open[stack.open.length - 1].claimFocus();
		// 	}
		// }, [depth, position]);

		if (position <= depth) {
			// Include a modal header if and only if one or more of these is given.
			// We can't use a Wrap for the ModalHeader because ComposedModal requires
			// the direct child to be the ModalHeader instance.
			const includeHeader =
				label ||
				title ||
				description ||
				headerActions ||
				navigation ||
				effectiveHasCloseIcon;

			// Include an ActionSet if and only if one or more actions is given.
			const includeActions = actions && actions?.length > 0;
			const influencerClasses = cx(
				'overflow-y-auto border-solid border-border-subtle-1 bg-layer-1',
				{
					'flex-[0_1_321px]': md,
					'flex-[0_0_321px]': !md,
					tearsheet__influencer: isRail,
					'basis-1/2': influencerWidth === 'wide'
				}
			);

			return (portalTarget ? createPortal : (child: ReactNode) => <div>{child}</div>)(
				<ComposedModal
					{
						// Pass through any other property values.
						...rest
					}
					className={cx(bc, className, {
						[`${bc}--stacked-${position}-of-${depth}`]:
							// Don't apply this on the initial open of a single tearsheet.
							depth > 1 || (depth === 1 && prevDepth.current > 1),
						[`${bc}--wide`]: size === 'wide',
						[`${bc}--narrow`]: size !== 'wide'
					})}
					style={{
						[`--${bc}-stacking-scale-factor-single`]: (width - 32) / width,
						[`--${bc}-stacking-scale-factor-double`]: (width - 64) / width
					}}
					containerClassName={cx(`${bc}__container top-auto h-full`)}
					// onFocus={handleFocus}
					preventCloseOnClickOutside={!isPassive}
					ref={modalRef as unknown as MutableRefObject<HTMLDivElement>}
					selectorsFloatingMenus={[
						`.cds--overflow-menu-options`,
						`.cds--tooltip`,
						'.flatpickr-calendar',
						`.${bc}__container`
					]}
					size='sm'
					open={open}
					selectorPrimaryFocus={selectorPrimaryFocus}
					onClose={() => {
						setOpen(false);
						onClose?.(false);
					}}
				>
					{includeHeader && (
						<ModalHeader
							className={`m-0 ${bc}__header`}
							closeClassName={cx({
								hidden: !effectiveHasCloseIcon
							})}
							closeModal={() => {
								setOpen(false);
								onClose?.(true);
							}}
							iconDescription={closeIconDescription}
						>
							<Wrap className='flex justify-between'>
								<Wrap className='flex-[1_1_100%]'>
									{/* we create the label and title here instead of passing them
                      as modal header props so we can wrap them in layout divs */}
									<Wrap element='h2' className='mb-2 text-text-secondary text-label-1'>
										{label}
									</Wrap>
									<Wrap
										element='h3'
										className={cx({
											'text-productive-heading-4': size === 'wide',
											'text-heading-3': size !== 'wide'
										})}
									>
										{title}
									</Wrap>
									<Wrap className='mt-5 max-w-full overflow-hidden text-text-secondary line-clamp-2 text-body-short-1 md:max-w-[60%]'>
										{description}
									</Wrap>
								</Wrap>
								<Wrap className='flex-[0_0_auto] pl-6'>{headerActions}</Wrap>
							</Wrap>
							<Wrap className='mt-4'>{navigation}</Wrap>
						</ModalHeader>
					)}
					<Wrap element={ModalBody} className='m-0 flex flex-row overflow-hidden p-0'>
						<Wrap
							className={cx('border-r-1', influencerClasses)}
							neverRender={influencerPosition === 'right'}
						>
							{influencer}
						</Wrap>
						<Wrap
							className='grid flex-grow-[1]'
							style={{ gridTemplateColumns: '100%', gridTemplateRows: '1fr auto' }}
						>
							<Wrap
								alwaysRender={includeActions}
								className={cx(`flex flex-row overflow-x-auto`, {
									'bg-background': size === 'wide'
								})}
								style={{ gridColumn: '1 / -1', gridRow: '1 / -1' }}
							>
								<Wrap
									alwaysRender={Boolean(influencer && influencerPosition === 'right')}
									className='flex-grow-[1] overflow-auto'
								>
									{children}
								</Wrap>
								<Wrap
									className={cx('border-l-1', influencerClasses)}
									neverRender={influencerPosition !== 'right'}
								>
									{influencer}
								</Wrap>
							</Wrap>
							{includeActions && (
								<Wrap
									element={ModalFooter}
									className='h-fit overflow-x-auto border-t-[1px] border-solid border-border-strong-1'
									style={{ gridColumn: '1 / -1', gridRow: '-1 / -1' }}
								>
									<>
										{size === 'wide' && md && !removeTertiaryButton && (
											<Button
												onClick={() => {
													setOpen(false);
													onClose?.(true);
												}}
												kind='ghost'
												size='2xl'
												className='flex-[1_1_50%] pl-7'
											>
												{t('cancel')}
											</Button>
										)}
										{actions?.map(({ loading, disabled, ...btProps }) => (
											<Button
												{...btProps}
												key={btProps.id}
												size='2xl'
												disabled={disabled || loading}
												className={cx({
													'relative flex-[0_1_25%]': size === 'wide' && md
												})}
											>
												{btProps.label}
												{loading && (
													<span className='absolute top-0 right-0 w-7'>
														<InlineLoading />
													</span>
												)}
											</Button>
										))}
									</>
								</Wrap>
							)}
						</Wrap>
					</Wrap>
					<div className='h-0 w-full' ref={refResize} />
				</ComposedModal>,
				portalTarget
			);
		}
		throw new Error('Tearsheet not rendered: maximum stacking depth exceeded.');
	}
);

interface TearsheetShellProps {
	/**
	 * The actions to be shown as buttons in the action area at the bottom of the
	 * tearsheet. Each action is specified as an object with optional fields
	 * 'label' to supply the button label, 'kind' to select the button kind (must
	 * be 'primary', 'secondary' or 'ghost'), 'loading' to display a loading
	 * indicator, and 'onClick' to receive notifications when the button is
	 * clicked. Additional fields in the object will be passed to the Button
	 * component, and these can include 'disabled', 'ref', 'className', and any
	 * other Button props. Any other fields in the object will be passed through
	 * to the button element as HTML attributes.
	 *
	 * See https://react.carbondesignsystem.com/?path=/docs/components-button--default#component-api
	 */
	actions?: Array<ComponentProps<typeof Button> & { label?: string; loading?: boolean }>;

	/**
	 * The main content of the tearsheet.
	 */
	children?: JSX.Element | JSX.Element[];

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
	 * The content for the header actions area, displayed alongside the title in
	 * the header area of the tearsheet. This is typically a drop-down, or a set
	 * of small buttons, or similar. NB the headerActions is only applicable for
	 * wide tearsheets.
	 */
	headerActions?: ReactElement;

	/**
	 * The content for the influencer section of the tearsheet, displayed
	 * alongside the main content. This is typically a menu, or filter, or
	 * progress indicator, or similar. NB the influencer is only applicable for
	 * wide tearsheets.
	 */
	influencer?: ReactNode;

	selectorPrimaryFocus?: string;

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
	 * of the header area of the tearsheet. NB the navigation is only applicable
	 * for wide tearsheets.
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
	 * portal target for the all tags modal
	 */
	portalTarget?: HTMLElement | null;

	/**
	 * Specifies the width of the tearsheet, 'narrow' or 'wide'.
	 */
	size: 'narrow' | 'wide';

	/**
	 * The main title of the tearsheet, displayed in the header area.
	 */
	title?: ReactNode;
	isRail?: boolean;
	removeTertiaryButton?: boolean;
}

export default TearsheetShell;
