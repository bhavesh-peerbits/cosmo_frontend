import { Grid, Column, Tile } from '@carbon/react';
import { useTranslation } from 'react-i18next';
import RevalidatorsTable from './RevalidatorsTable';

const CampaignDetailsContainer = () => {
	const { t } = useTranslation('userRevalidation');
	return (
		<Grid className='space-y-5 lg:space-y-0'>
			<Column lg={11} md={8} sm={4}>
				<Tile className='bg-background'>
					<p className='text-heading-3'>{t('revalidators')} (N)</p>
					<RevalidatorsTable />
				</Tile>
			</Column>
			<Column lg={5} md={8} sm={4} className='h-full space-y-5 pb-5'>
				<Tile className='h-1/2 bg-background'>Contenuto</Tile>
				<Tile className='h-1/2 bg-background'>Contenuto</Tile>
			</Column>
		</Grid>
	);
};
export default CampaignDetailsContainer;
