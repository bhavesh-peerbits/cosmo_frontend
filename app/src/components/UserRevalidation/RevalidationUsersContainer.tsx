import { Button, Grid } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import { useTranslation } from 'react-i18next';
import RevalidationUsersTable from './RevalidationUsersTable';

const RevalidationUsersContainer = () => {
	const { t } = useTranslation(['modals', 'userSelect']);
	return (
		<Grid fullWidth className='h-full'>
			<FullWidthColumn className='space-x-5'>
				<Button size='md'>{t('modals:save')}</Button>
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
