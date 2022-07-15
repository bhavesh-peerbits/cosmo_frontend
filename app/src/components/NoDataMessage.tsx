import { Button, Link } from '@carbon/react';
import { ComponentProps, forwardRef, ReactNode } from 'react';
import cx from 'classnames';
import NoDataIllustration from '@images/NoDataIllustration';

const NoDataEmptyState = forwardRef<HTMLDivElement, NoDataEmptyStateProps>(
	(
		{
			action,
			className,
			illustrationTheme,
			link,
			size = 'lg',
			subtitle,
			title,

			// Collect any other property values passed in.
			...rest
		},
		ref
	) => {
		return (
			<div
				{
					// Pass through any other property values as HTML attributes.
					...rest
				}
				className={`${className} flex flex-col place-items-center`}
				ref={ref}
			>
				<NoDataIllustration size={size} />
				<h3
					className={cx('m-0 pb-2', {
						'text-productive-heading-3': size === 'sm'
					})}
				>
					{title}
				</h3>
				{subtitle && (
					<p
						className={cx(`m-0 pb-2`, {
							'text-body-short-1': size === 'sm'
						})}
					>
						{subtitle}
					</p>
				)}
				{action?.text && action?.onClick && (
					<Button
						{...action}
						className='mt-6'
						kind={action.kind || 'tertiary'}
						onClick={action.onClick}
						renderIcon={action.renderIcon}
					>
						{action.text}
					</Button>
				)}
				{link?.text && link?.href && (
					<Link {...link} className='mt-6' href={link.href}>
						{link.text}
					</Link>
				)}
			</div>
		);
	}
);

interface NoDataEmptyStateProps {
	/**
	 * Empty state action button
	 */
	action?: ComponentProps<typeof Button> & {
		text?: ReactNode;
	};

	/**
	 * Provide an optional class to be applied to the containing node.
	 */
	className?: string;

	/**
	 * Empty state illustration theme variations.
	 * To ensure you use the correct themed illustrations, you can conditionally specify light or dark
	 * based on your app's current theme value. Example:
	 * `illustrationTheme={appTheme === ('carbon--g100' || 'carbon--g90') ? 'dark' : 'light'}`
	 */
	illustrationTheme?: 'light' | 'dark';

	/**
	 * Empty state link object
	 */
	link?: ComponentProps<typeof Link> & {
		text?: string | ReactNode;
		href?: string;
	};

	/**
	 * Empty state size
	 */
	size?: 'lg' | 'sm';

	/**
	 * Empty state subtitle
	 */
	subtitle?: string | ReactNode;

	/**
	 * Empty state title
	 */
	title: string | ReactNode;
}

export default NoDataEmptyState;
