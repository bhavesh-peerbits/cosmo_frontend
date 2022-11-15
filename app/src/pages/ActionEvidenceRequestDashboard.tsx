import { Tab, TabList, TabPanel, TabPanels } from '@carbon/react';
import EvidenceRequestActionTableView from '@components/EvidenceRequest/EvidenceRequestActionTableView';
import EvidenceRequestActionTileView from '@components/EvidenceRequest/EvidenceRequestActionTileView';
import PageHeader from '@components/PageHeader';
import StickyTabs from '@components/StickyTabs';
import useEvidenceRequestAction from '@hooks/evidence-request/useEvidenceRequestAction';
import { useTranslation } from 'react-i18next';

const ActionEvidenceRequestDashboard = () => {
	const { filters } = useEvidenceRequestAction();
	const { t } = useTranslation('evidenceRequest');
	return (
		<PageHeader pageTitle='Evidence Requests'>
			<StickyTabs>
				<TabList
					contained
					aria-label='List of tabs'
					className='sticky z-10 bg-background'
				>
					<Tab className='max-w-none'>{t('pending-actions')}</Tab>
					<Tab className='max-w-none'>{t('managed')}</Tab>
				</TabList>
				<TabPanels>
					<TabPanel>
						{!filters.isTable ? (
							<EvidenceRequestActionTileView />
						) : (
							<EvidenceRequestActionTableView view='ActionPending' />
						)}
					</TabPanel>
					<TabPanel>
						{!filters.isTable ? (
							<EvidenceRequestActionTileView />
						) : (
							<EvidenceRequestActionTableView view='Closed' />
						)}
					</TabPanel>
				</TabPanels>
			</StickyTabs>
		</PageHeader>
	);
};

export default ActionEvidenceRequestDashboard;
