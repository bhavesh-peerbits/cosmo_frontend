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
	Tag
} from '@carbon/react';
import { useTranslation } from 'react-i18next';
import CosmoFiltersPanel from '@components/CosmoFiltersPanel';
import NewMonitoringFilters from '../Components/NewMonitoringFilters';

type NewMonitoringModalProps = {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
};
const NewMonitoringModal = ({ isOpen, setIsOpen }: NewMonitoringModalProps) => {
	const { t } = useTranslation(['changeMonitoring', 'management', 'modals']);
	const [isCopySelected, setIsCopySelected] = useState(false);

	const cleanUp = () => {
		setIsCopySelected(false);
		setIsOpen(false);
	};

	return (
		<TearsheetNarrow
			title={t('changeMonitoring:new-monitoring')}
			open={isOpen}
			onClose={cleanUp}
			hasCloseIcon
			actions={[
				{
					label: t('modals:cancel'),
					kind: 'secondary',
					onClick: cleanUp,
					id: 'cancel-new-monitoring'
				},
				{ label: t('modals:create'), id: 'create-new-monitoring' }
			]}
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
					toggled={isCopySelected}
					onToggle={() => setIsCopySelected(!isCopySelected)}
				/>
				{isCopySelected && (
					<div className='mt-3 space-y-5'>
						<div className='flex'>
							<Search
								labelText=''
								placeholder={t('changeMonitoring:search-monitoring-name')}
							/>
							<CosmoFiltersPanel>
								<NewMonitoringFilters />
							</CosmoFiltersPanel>
						</div>
						<Tag filter>{t('management:filters')}:</Tag>
						<Accordion>
							<AccordionItem
								key='c'
								title={
									// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
									<div
										className='flex w-fit justify-start'
										onClick={e => e.stopPropagation()}
									>
										<RadioButton
											labelText={
												<span className='text-productive-heading-2'>Monitoring Name</span>
											}
											value='value'
										/>
									</div>
								}
							>
								<div className='flex flex-col'>
									<div className='flex space-x-1'>
										<span className='text-heading-1'>
											{t('changeMonitoring:completed-runs')}:
										</span>
										<span>5</span>
									</div>
									<div className='flex space-x-1'>
										<span className='text-heading-1'>
											{t('changeMonitoring:scheduling')}:
										</span>
										<span>On Demand</span>
									</div>
									<div className='mt-3 flex space-x-1'>
										<span className='text-heading-1'>Path:</span>
										<span>Path</span>
									</div>
								</div>
							</AccordionItem>
						</Accordion>
					</div>
				)}
			</Form>
		</TearsheetNarrow>
	);
};
export default NewMonitoringModal;
