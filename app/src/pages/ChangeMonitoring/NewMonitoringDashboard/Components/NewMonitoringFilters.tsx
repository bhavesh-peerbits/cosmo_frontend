import {
	Tabs,
	TabList,
	Tab,
	TabPanels,
	TabPanel,
	Checkbox,
	SwitcherDivider
} from '@carbon/react';
import useMonitoringForNewDraft from '@hooks/new-monitoring/useMonitoringForNewDraft';
import { useTranslation } from 'react-i18next';

const NewMonitoringFilters = () => {
	const { t } = useTranslation(['management', 'changeMonitoring']);
	const { setFilters, filtersAvailable } = useMonitoringForNewDraft();

	const handleCheckFilterApp = (filter: string, action: 'add' | 'remove') => {
		setFilters(old => ({
			application:
				action === 'add'
					? [...(old.application ?? []), filter]
					: (old.application ?? []).filter((f: string) => f !== filter)
		}));
	};

	const handleCheckFilterCode = (filter: string, action: 'add' | 'remove') => {
		setFilters(old => ({
			controlCode:
				action === 'add'
					? [...(old.controlCode ?? []), filter]
					: (old.controlCode ?? []).filter((f: string) => f !== filter)
		}));
	};

	return (
		<Tabs className='w-full'>
			<TabList className='w-full' aria-label='List of tabs' style={{ width: '100%' }}>
				<Tab>{t('management:applications')}</Tab>
				<Tab>{t('changeMonitoring:controls')}</Tab>
				<SwitcherDivider className='m-0 ml-[1px] h-1 self-end' />
			</TabList>
			<TabPanels>
				<TabPanel>
					<Checkbox
						labelText={t('management:all')}
						id='application-all'
						checked={filtersAvailable.application.every(a => a.enabled)}
						onChange={(_, { checked }) =>
							setFilters({
								application: checked
									? filtersAvailable.application.map(({ app }) => app)
									: []
							})
						}
					/>
					{filtersAvailable.application.map(filter => (
						<Checkbox
							key={filter.app}
							checked={filter.enabled}
							onChange={(_, { checked, id }) =>
								handleCheckFilterApp(id, checked ? 'add' : 'remove')
							}
							id={filter.app}
							labelText={filter.app}
						/>
					))}
				</TabPanel>
				<TabPanel>
					<Checkbox
						labelText={t('management:all')}
						id='control-code-all'
						checked={filtersAvailable.controlCode.every(c => c.enabled)}
						onChange={(_, { checked }) =>
							setFilters({
								controlCode: checked
									? filtersAvailable.controlCode.map(({ code }) => code)
									: []
							})
						}
					/>
					{filtersAvailable.controlCode.map(filter => (
						<Checkbox
							key={filter.code}
							checked={filter.enabled}
							onChange={(_, { checked, id }) =>
								handleCheckFilterCode(id, checked ? 'add' : 'remove')
							}
							id={filter.code}
							labelText={filter.code}
						/>
					))}
				</TabPanel>
			</TabPanels>
		</Tabs>
	);
};
export default NewMonitoringFilters;
