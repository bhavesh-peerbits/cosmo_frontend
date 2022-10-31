import { Group, User } from '@carbon/react/icons';
import { Tooltip } from '@carbon/react';
import { forwardRef, memo, useCallback, useMemo } from 'react';
import cx from 'classnames';

// type CarbonColor = Exclude<keyof typeof carbonColors, 'black' | 'white'>;
// type ColorsType = `${'light' | 'dark'}-${CarbonColor}`;

// const colors: ColorsType[] = Object.keys(carbonColors)
// 	.filter(color => color !== 'black' && color !== 'white')
// 	.reduce(
// 		(acc, color) => [
// 			...acc,
// 			`light-${color as CarbonColor}` as const,
// 			`dark-${color as CarbonColor}` as const
// 		],
// 		[] as ColorsType[]
// 	);

const colors: string[] = ['#1446d2', '#2d60eb', '#06b6d4', '#0891b2', '#0e7490'];
const sizeClass = {
	xlg: 'text-heading-4 w-10 h-10',
	lg: 'text-body-short-1 w-7 h-7',
	md: 'font-semibold text-label-1 w-6 h-6',
	sm: 'font-semibold text-label-1 w-icon-size-2 h-icon-size-2',
	xs: 'font-semibold text-label-1 w-icon-size-1 h-icon-size-1'
};

// if user doesn't provide a color just generate a random one
const getRandomColor = () => {
	return colors[Math.floor(Math.random() * colors.length)];
};

const FillItem = memo(
	({
		image,
		imageDescription,
		initials: initialsParams,
		kind,
		size,
		icon
	}: Omit<UserProfileImageProps, 'backgroundColor' | 'tooltipText'>) => {
		const icons = useMemo(
			() => ({
				user: {
					xs: <User size={12} />,
					sm: <User size={16} />,
					md: <User size={20} />,
					lg: <User size={24} />,
					xlg: <User size={32} />
				},
				group: {
					xs: <Group size={12} />,
					sm: <Group size={16} />,
					md: <Group size={20} />,
					lg: <Group size={24} />,
					xlg: <Group size={32} />
				}
			}),
			[]
		);

		const formatInitials = useCallback((initials: string) => {
			if (initials.length === 2) {
				return initials;
			}
			// RegEx takes in the display name and returns the first and last initials. Thomas Watson and Thomas J. Watson
			// both return JW.
			return (
				initials
					.match(/(^\S\S?|\b\S)?/g)
					?.join('')
					?.match(/(^\S|\S$)?/g)
					?.join('')
					?.toUpperCase() || initials.substring(0, 2)
			);
		}, []);

		if (image) {
			return (
				<img
					alt={imageDescription}
					src={image}
					className={cx(['w-full rounded-full', sizeClass[size]])}
				/>
			);
		}
		if (initialsParams) {
			return (
				<span className='pointer-events-none'>{formatInitials(initialsParams)}</span>
			);
		}
		if (kind && size) {
			return icons[kind][size];
		}
		return icon || <div />;
	}
);

const UserProfileImage = forwardRef<HTMLDivElement, UserProfileImageProps>(
	(
		{
			// backgroundColor: propsBackground,
			className,
			kind,
			icon,
			initials = 'unknown',
			image,
			imageDescription,
			size,
			tooltipText
		},
		ref
	) => {
		// const { theme } = useUiStore();
		// const [backgroundColor, setBackgroundColor] = useState<ColorsType | string>();
		// useEffect(() => {
		// 	setBackgroundColor(propsBackground || getRandomColor());
		// }, [propsBackground]);

		// const themeConf: Record<typeof theme, { light: 60 | 50; dark: 80 | 30 }> = useMemo(
		// 	() => ({
		// 		white: {
		// 			light: 60,
		// 			dark: 80
		// 		},
		// 		g10: {
		// 			light: 60,
		// 			dark: 80
		// 		},
		// 		g90: {
		// 			light: 50,
		// 			dark: 30
		// 		},
		// 		g100: {
		// 			light: 50,
		// 			dark: 30
		// 		}
		// 	}),
		// 	[]
		// );

		// const getImageBackgroundColor = () => {
		// 	const bg = backgroundColor;
		// 	if (!bg) return getRandomColor();
		// 	const [variant, color] = bg.split('-');
		// 	const carbonGrade = themeConf[theme][variant as 'light' | 'dark'];
		// 	return carbonColors[color as CarbonColor][`${carbonGrade}`];
		// };

		const renderUserProfileImage = () => (
			<div
				ref={ref}
				style={{
					backgroundColor: getRandomColor()
				}}
				className={cx([
					'flex flex-col items-center justify-center rounded-full uppercase text-background',
					className,
					sizeClass[size]
				])}
			>
				<FillItem {...{ image, imageDescription, initials, kind, size, icon }} />
			</div>
		);

		return tooltipText ? (
			<Tooltip align='bottom' label={tooltipText}>
				<button
					type='button'
					onClick={e => e.preventDefault()}
					className='cursor-default'
				>
					{renderUserProfileImage()}
				</button>
			</Tooltip>
		) : (
			<div>{renderUserProfileImage()}</div>
		);
	}
);

interface UserProfileImageProps {
	// backgroundColor?: ColorsType;

	/**
	 * Provide an optional class to be applied to the containing node.
	 */
	className?: string;

	/**
	 * Provide a custom icon to use if you need to use an icon other than the included ones
	 */
	icon?: JSX.Element;

	/**
	 * When passing the image prop, supply a full path to the image to be displayed.
	 */
	image?: string;

	/**
	 * When passing the image prop use the imageDescription prop to describe the image for screen reader.
	 */
	imageDescription?: string;

	/**
	 * When passing the initials prop, either send the initials to be used or the user's display name. The first two capital letters of the display name will be used as the initials.
	 */
	initials?: string;

	/**
	 * When passing the kind prop, use either "user" or "group". The values match up to the Carbon Library icons.
	 */
	kind?: 'user' | 'group';

	/**
	 * Set the size of the avatar circle
	 */
	size: keyof typeof sizeClass;

	/**
	 * Pass in the display name to have it shown on hover
	 */
	tooltipText?: string;
}

export default memo(UserProfileImage);
