import TearsheetNarrow from '@components/Tearsheet/TearsheetNarrow';
import { Dispatch, SetStateAction, useState } from 'react';
import {
	RadioButton,
	RadioButtonGroup,
	Form,
	Toggle,
	TextInput,
	Accordion,
	AccordionItem,
	Search,
	OverflowMenu,
	Tabs,
	TabList,
	Tab,
	TabPanels,
	TabPanel,
	Tag
} from '@carbon/react';
import { Filter } from '@carbon/react/icons';
import { useTranslation } from 'react-i18next';

type NewMonitoringModalProps = {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
};
const NewMonitoringModal = ({ isOpen, setIsOpen }: NewMonitoringModalProps) => {
	const { t } = useTranslation(['changeMonitoring', 'management']);
	const [isCopySelected, setIsCopySelected] = useState(false);
	const cleanUp = () => {
		setIsOpen(false);
	};
	return (
		<TearsheetNarrow
			title='New monitoring'
			open={isOpen}
			onClose={cleanUp}
			actions={[{ label: 'Cancel', kind: 'secondary' }, { label: 'Create' }]}
		>
			<Form className='space-y-5 px-5'>
				<RadioButtonGroup
					name='monitoring-type'
					legendText={`${t('changeMonitoring:monitoring-type')} *`}
					defaultSelected='manual'
					valueSelected='manual'
				>
					<RadioButton labelText={t('changeMonitoring:manual')} value='manual' />
					<RadioButton
						labelText={t('changeMonitoring:automatic')}
						value='automatic'
						disabled
					/>
				</RadioButtonGroup>
				<TextInput
					id='monitoring-name'
					labelText={`${t('changeMonitoring:monitoring-name')} *`}
					placeholder={t('changeMonitoring:monitoring-name-placeholder')}
				/>
				<Toggle
					id='copy-monitoring-toggle'
					labelText={t('changeMonitoring:copy-monitoring')}
					labelA='No'
					labelB={t('changeMonitoring:copy')}
					aria-label='Copy monitoring type'
					onToggle={() => setIsCopySelected(!isCopySelected)}
				/>
				{isCopySelected && (
					<div className='mt-3 space-y-5'>
						<div className='flex'>
							<Search
								labelText=''
								placeholder={t('changeMonitoring:search-monitoring-name')}
							/>
							<OverflowMenu
								ariaLabel='monitoring-filters-menu'
								iconDescription='Monitoring filters menu'
								renderIcon={Filter}
								flipped
							>
								<Tabs>
									<TabList aria-label='List of tabs'>
										<Tab>{t('management:applications')}</Tab>
										<Tab>{t('changeMonitoring:controls')}</Tab>
									</TabList>
									<TabPanels>
										<TabPanel>Applications list</TabPanel>
										<TabPanel>Controls List</TabPanel>
									</TabPanels>
								</Tabs>
							</OverflowMenu>
						</div>
						<Tag filter>Filters:</Tag>
						<Accordion>
							<AccordionItem
								title={
									// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
									<div className='flex justify-start' onClick={e => e.stopPropagation()}>
										<RadioButton
											labelText={
												<span className='text-productive-heading-2'>Monitoring Name</span>
											}
											value='value'
										/>
									</div>
								}
							>
								cc
							</AccordionItem>
						</Accordion>
					</div>
				)}
			</Form>
		</TearsheetNarrow>
	);
};
export default NewMonitoringModal;
