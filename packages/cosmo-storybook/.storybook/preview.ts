import { Parameters } from '@storybook/addons';
import './index.scss';
import i18n from 'app/src/i18n';
import ThemeDecorator from './ThemeDecorator';
import { addDecorator } from '@storybook/react';
import { withThemes } from 'storybook-addon-themes/react';

addDecorator(withThemes);
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
	},
	themes: {
		default: 'white',
		list: [
			{ name: 'white', color: '#FFFFFF' },
			{ name: 'g10', color: '#c1bfbf' },
			{ name: 'g90', color: '#464545' },
			{ name: 'g100', color: '#000000' }
		],
		Decorator: ThemeDecorator
	}
};
