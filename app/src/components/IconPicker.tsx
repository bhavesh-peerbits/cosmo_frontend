import {
	ApplicationMobile,
	ApplicationVirtual,
	ApplicationWeb
} from '@carbon/react/icons';

export const icons = {
	mobile: {
		component: ApplicationMobile,
		keywords: 'mobile telephone phone call'
	},
	web: {
		component: ApplicationWeb,
		keywords: 'web browser internet'
	},
	virtual: {
		component: ApplicationVirtual,
		keywords: 'virtual reality'
	}
};

const IconPicker = () => {
	return <div>IconPicker</div>;
};

export default IconPicker;
