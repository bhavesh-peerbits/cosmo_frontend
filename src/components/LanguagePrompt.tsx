import { useRecoilState } from 'recoil';
import uiStore from '@store/ui/uiStore';
import { Button, ButtonSet, Column, Grid, Tile } from '@carbon/react';
import { memo } from 'react';
import { ArrowRight, Translate } from '@carbon/react/icons';
import { languageOptions, languages } from '@i18n';
import detectLanguage from '@i18n/detectLanguage';

const LanguagePrompt = () => {
	const [{ languagePromptDismissed, language }, setUiStore] = useRecoilState(uiStore);

	if (languagePromptDismissed) {
		return null;
	}

	const systemLanguage = detectLanguage();
	if (systemLanguage === 'en_US' || systemLanguage === language) {
		return null;
	}

	if (!languages.includes(systemLanguage as typeof language)) {
		return null;
	}

	const option = languageOptions.find(o => o.value === systemLanguage)?.label ?? '';

	const ButtonGroup = memo(({ small }: { small?: boolean }) => (
		<ButtonSet stacked={small} className='h-full items-end justify-end'>
			<Button
				className={`${small ? '' : 'h-full'}`}
				kind='secondary'
				isExpressive={small}
				onClick={() => setUiStore(val => ({ ...val, languagePromptDismissed: true }))}
			>
				Dismiss
			</Button>
			<Button
				className={`${small ? '' : 'h-full'}`}
				isExpressive={small}
				renderIcon={ArrowRight}
				iconDescription='Change language'
				onClick={() =>
					setUiStore(val => ({
						...val,
						languagePromptDismissed: true,
						language: systemLanguage as typeof language
					}))
				}
			>
				Change to {option}
			</Button>
		</ButtonSet>
	));

	return (
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
					<ButtonGroup small />
				</Column>
				<Column sm={0} md={8} lg={16}>
					<ButtonGroup />
				</Column>
			</Grid>
		</Tile>
	);
};
export default LanguagePrompt;
