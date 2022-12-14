import { Dispatch, ReactNode, SetStateAction, useState } from 'react';
import { Layer, Tile, Grid, Button } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import { useTranslation } from 'react-i18next';
import { Report } from '@carbon/react/icons';
import MonitoringDraftRecapModal from '@components/Modals/MonitoringDraftRecapModal';

type NewMonitoringStepTileProps = {
	content: ReactNode;
	title: string;
	description: string;
	setCurrentStep: Dispatch<SetStateAction<number>>;
	currentStep: number;
};
const NewMonitoringStepTile = ({
	content,
	title,
	description,
	setCurrentStep,
	currentStep
}: NewMonitoringStepTileProps) => {
	const { t } = useTranslation(['modals', 'changeMonitoring']);
	const [isRecapOpen, setIsRecapOpen] = useState(false);
	return (
		<Layer level={1}>
			<Tile>
				<Grid fullWidth narrow className='space-y-5'>
					<MonitoringDraftRecapModal isOpen={isRecapOpen} setIsOpen={setIsRecapOpen} />
					<FullWidthColumn className='space-y-5' style={{ marginTop: '0px' }}>
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
						<span className='text-text-secondary text-body-long-1'>{description}.</span>
					</FullWidthColumn>

					{content}
					<FullWidthColumn className='flex justify-end space-x-5 pt-7'>
						{currentStep > 0 && (
							<Button
								size='md'
								kind='secondary'
								onClick={() => setCurrentStep(old => old - 1)}
							>
								{t('modals:back')}
							</Button>
						)}
						<Button size='md' onClick={() => setCurrentStep(old => old + 1)}>
							{currentStep === 6 ? t('modals:save') : t('changeMonitoring:save-next')}
						</Button>
					</FullWidthColumn>
				</Grid>
			</Tile>
		</Layer>
	);
};
export default NewMonitoringStepTile;
