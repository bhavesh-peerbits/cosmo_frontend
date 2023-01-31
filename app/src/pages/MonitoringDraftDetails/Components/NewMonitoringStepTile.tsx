import { ReactNode, useState } from 'react';
import { Layer, Tile, Grid, Button } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import { useTranslation } from 'react-i18next';
import { Report } from '@carbon/react/icons';
import useGetMonitoringDraftById from '@api/change-monitoring-analyst/useGetMonitoringDraftById';
import { useParams } from 'react-router-dom';
import MonitoringDraftRecapModal from '../Modals/MonitoringDraftRecapModal';

type NewMonitoringStepTileProps = {
	content: ReactNode;
	title: string;
	description: string;
};
const NewMonitoringStepTile = ({
	content,
	title,
	description
}: NewMonitoringStepTileProps) => {
	const { t } = useTranslation(['modals', 'changeMonitoring']);
	const [isRecapOpen, setIsRecapOpen] = useState(false);

	const { monitoringDraftId = '' } = useParams();
	const { data: draft } = useGetMonitoringDraftById(monitoringDraftId);

	if (!draft) return null;

	return (
		<>
			<MonitoringDraftRecapModal
				isOpen={isRecapOpen}
				setIsOpen={setIsRecapOpen}
				draft={draft}
			/>
			<Layer level={1}>
				<Tile>
					<Grid fullWidth narrow className='space-y-7'>
						<FullWidthColumn className='space-y-3 md:space-y-0'>
							<div className='flex justify-between'>
								<span className='text-heading-3'>{title}</span>
								<Button
									kind='tertiary'
									hasIconOnly
									renderIcon={Report}
									size='md'
									iconDescription={t('changeMonitoring:monitoring-recap')}
									onClick={() => setIsRecapOpen(true)}
								/>
							</div>
							<div className='mr-0 text-text-secondary text-body-long-1 md:mr-[56px]'>
								{description}.
							</div>
						</FullWidthColumn>

						{content}
					</Grid>
				</Tile>
			</Layer>
		</>
	);
};
export default NewMonitoringStepTile;
