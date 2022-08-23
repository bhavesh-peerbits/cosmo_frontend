import { Button, Grid } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import { useTranslation } from 'react-i18next';
import RevalidationUsersTable from './RevalidationUsersTable';

type RevalidationUsersContainerProps = {
	setIsCampaignCompleted: (val: boolean) => void;
};
const RevalidationUsersContainer = ({
	setIsCampaignCompleted
}: RevalidationUsersContainerProps) => {
	const { t } = useTranslation(['modals', 'userSelect']);
	return (
		<Grid fullWidth className='h-full space-y-5'>
			<FullWidthColumn className='space-x-5'>
				<Button onClick={() => setIsCampaignCompleted(true)} size='md'>
					{t('modals:save')}
				</Button>
				<Button size='md' kind='secondary'>
					{t('userSelect:reset')}
				</Button>
			</FullWidthColumn>
			<FullWidthColumn>
				<RevalidationUsersTable />
			</FullWidthColumn>
		</Grid>
	);
};
export default RevalidationUsersContainer;
