import { Parameters } from '@storybook/addons';
import './index.scss';
import 'app/src/i18n';

export const parameters: Parameters = {
	actions: { argTypesRegex: '^on[A-Z].*' },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/
		}
	}
};
