import useGetApps from '@api/management/useGetApps';
import {
	Tabs,
	TabList,
	Tab,
	TabPanels,
	TabPanel,
	Checkbox,
	SwitcherDivider
} from '@carbon/react';
import Application from '@model/Application';
import { Dispatch, SetStateAction } from 'react';

import { useTranslation } from 'react-i18next';

type NewMonitoringFiltersProps = {
	selectedItems: {
		applications: Application[];
		controls: { id: string; name: string }[];
	};
	setSelectedItems: Dispatch<
		SetStateAction<{
			applications: Application[];
			controls: {
				id: string;
				name: string;
			}[];
		}>
	>;
};
const NewMonitoringFilters = ({
	setSelectedItems,
	selectedItems
}: NewMonitoringFiltersProps) => {
	const { t } = useTranslation(['management', 'changeMonitoring']);
	// TODO Use apps from monitoring
	const { data } = useGetApps();
	const apps = data ? [...data.values()] : [];
	const controls = [
		{ id: 'control1', name: 'control 1' },
		{ id: 'control2', name: 'control 2' }
	];

	return (
		<Tabs className='w-full'>
			<TabList className='w-full' aria-label='List of tabs' style={{ width: '100%' }}>
				<Tab>{t('management:applications')}</Tab>
				<Tab>{t('changeMonitoring:controls')}</Tab>
				<SwitcherDivider className='m-0 ml-[1px] h-1 self-end' />
			</TabList>
			<TabPanels>
				<TabPanel>
					{apps.map(app => (
						<Checkbox
							id={app.id}
							labelText={app.name}
							checked={selectedItems.applications.some(a => a.id === app.id)}
							onChange={(e, { checked }) =>
								!checked
									? setSelectedItems(old => ({
											...old,
											applications: old?.applications.filter(a => a.id !== app.id)
									  }))
									: setSelectedItems(old => ({
											...old,
											applications: [...old.applications, app]
									  }))
							}
						/>
					))}
				</TabPanel>
				<TabPanel>
					{controls.map(control => (
						<Checkbox
							id={control.id}
							labelText={control.name}
							checked={selectedItems.controls.some(c => c.id === control.id)}
							onChange={(e, { checked }) =>
								!checked
									? setSelectedItems(old => ({
											...old,
											controls: old?.controls.filter(c => c.id !== control.id)
									  }))
									: setSelectedItems(old => ({
											...old,
											controls: [...old.controls, control]
									  }))
							}
						/>
					))}
				</TabPanel>
			</TabPanels>
		</Tabs>
	);
};
export default NewMonitoringFilters;
