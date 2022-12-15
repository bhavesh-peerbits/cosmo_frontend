import FullWidthColumn from '@components/FullWidthColumn';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Toggle, Tooltip, Accordion, AccordionItem } from '@carbon/react';
import { Information } from '@carbon/react/icons';
import OSScriptListContainer from './OSScriptListContainer';
import AssetsList from './AssetsList';

const ScriptSelectionStepContainer = () => {
	const { t } = useTranslation('changeMonitoring');
	const [sameSetup, setSameSetup] = useState(false);
	const fakeData = [
		{
			os: 'OS 1',
			script: [
				{
					script: 'script 1 os 1',
					description: 'This is a description'
				},
				{
					script: 'script 2 os 1',
					description: 'This is a description'
				}
			]
		},
		{
			os: 'OS 2',
			script: [
				{
					script: 'script 1 os 2',
					description: 'This is a description'
				},
				{
					script: 'script 2 os 2',
					description:
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor consectetur adipiscing elit, sed do eiusmod tempor consectetur adipiscing elit, sed do eiusmod tempor consectetur adipiscing elit, sed do eiusmod tempor consectetur adipiscing elit, sed do eiusmod tempor consectetur adipiscing elit, sed do eiusmod tempor consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis  nostrud exercitation. Lorem ipsum dolor sit amet , consectetur adipiscing elit'
				}
			]
		}
	];
	return (
		<>
			<FullWidthColumn>
				<Toggle
					aria-label='Path toggle'
					id='path-toggle'
					labelA={t('different')}
					labelB={t('same')}
					toggled={sameSetup}
					onToggle={() => setSameSetup(!sameSetup)}
					labelText={
						<div className='flex space-x-3'>
							<p className='text-label-1'>{t('asset-setup-toggle')}</p>
							<Tooltip align='top' label={t('tooltip-toggle-script')}>
								<button type='button' onClick={e => e.preventDefault()}>
									<Information />
								</button>
							</Tooltip>
						</div>
					}
				/>
			</FullWidthColumn>
			{sameSetup ? (
				<>
					<FullWidthColumn>
						<AssetsList />
					</FullWidthColumn>
					<FullWidthColumn className='space-y-5 divide-y-[1px] divide-solid divide-border-subtle-0'>
						{fakeData.map(data => (
							<FullWidthColumn className='pt-5'>
								<OSScriptListContainer data={data} />
							</FullWidthColumn>
						))}
					</FullWidthColumn>
				</>
			) : (
				<FullWidthColumn>
					<Accordion className='bg-layer-1'>
						<AccordionItem>
							<FullWidthColumn className='space-y-5 divide-y-[1px] divide-solid divide-border-subtle-0'>
								{fakeData.map(data => (
									<FullWidthColumn className='pt-5'>
										<OSScriptListContainer level={1} data={data} />
									</FullWidthColumn>
								))}
							</FullWidthColumn>{' '}
						</AccordionItem>
					</Accordion>
				</FullWidthColumn>
			)}
		</>
	);
};
export default ScriptSelectionStepContainer;
