import { Parameters } from '@storybook/addons';
import './index.scss';
import i18n from 'app/src/i18n';
import { addDecorator } from '@storybook/react';
import { withCarbonTheme } from '@carbon/storybook-addon-theme';

addDecorator(withCarbonTheme);
export const parameters: Parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/
		}
	},
	i18n,
	locale: 'en_US',
	locales: {
		en_US: { title: 'English', left: '🇺🇸' },
		fr_FR: { title: 'Français', left: '🇫🇷' },
		it_IT: { title: 'Italiano', left: '🇮🇹' }
	}
};
