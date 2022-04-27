import { icons } from '@components/IconPicker';
import { ApplicationVirtual } from '@carbon/react/icons';

interface IconResolverProps {
	icon: keyof typeof icons;
	size?: number;
}

const IconResolver = ({ icon, size }: IconResolverProps) => {
	try {
		const Icon = icons[icon].component;
		return <Icon size={size} />;
	} catch (e) {
		// eslint-disable-next-line no-console
		console.warn(`Icon ${icon} not found`);
	}
	return <ApplicationVirtual size={size} />;
};

export default IconResolver;
