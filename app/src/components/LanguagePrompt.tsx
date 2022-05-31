import { Button, ButtonSet, Column, Grid, Layer, Tile, useTheme } from '@carbon/react';
import { memo } from 'react';
import { ArrowRight, Translate } from '@carbon/react/icons';
import { languageOptions, languages } from '@i18n/languageOptions';
import detectLanguage from '@i18n/detectLanguage';
import useUiStore from '@hooks/useUiStore';

interface ButtonGroupProps {
	small?: boolean;
	systemLanguage: typeof languages[number];
	option: typeof languageOptions[number]['label'] | '';
}

const ButtonGroup = memo(({ small, systemLanguage, option }: ButtonGroupProps) => {
	const { setLanguagePromptDismissed, setLanguage } = useUiStore();
	return (
		<ButtonSet stacked={small} className='h-full items-end justify-end'>
			<Button
				className={`${small ? '' : 'h-full'}`}
				kind='secondary'
				isExpressive={small}
				onClick={() => setLanguagePromptDismissed(true)}
			>
				Dismiss
			</Button>
			<Button
				className={`${small ? '' : 'h-full'}`}
				isExpressive={small}
				renderIcon={ArrowRight}
				iconDescription='Change language'
				onClick={() => setLanguage(systemLanguage)}
			>
				Change to {option}
			</Button>
		</ButtonSet>
	);
});

const LanguagePrompt = () => {
	const { languagePromptDismissed, language } = useUiStore();
	const { theme } = useTheme();
	if (languagePromptDismissed) {
		return null;
	}

	const systemLanguage = detectLanguage() as typeof language;
	if (systemLanguage === 'en_US' || systemLanguage === language) {
		return null;
	}

	if (!languages.includes(systemLanguage)) {
		return null;
	}

	const option = languageOptions.find(o => o.value === systemLanguage)?.label ?? '';

	return (
		<Layer level={theme === 'g100' ? 2 : 1}>
			<Tile>
				<Grid className='space-y-4'>
					<Column sm={4} md={8} lg={16}>
						<Translate size='32' />
						<h3 className='text-heading-3'>Supported Language Detected</h3>
					</Column>
					<Column sm={4} md={8} lg={16}>
						<p className='text-body-1'>
							Cosmo is available in your language {option}, would you like to change?
						</p>
					</Column>
					<Column sm={4} md={0} lg={0}>
						<ButtonGroup small {...{ systemLanguage, option }} />
					</Column>
					<Column sm={0} md={8} lg={16}>
						<ButtonGroup {...{ systemLanguage, option }} />
					</Column>
				</Grid>
			</Tile>
		</Layer>
	);
};
export default LanguagePrompt;
