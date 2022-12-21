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
				<MonitoringDraftRecapModal isOpen={isRecapOpen} setIsOpen={setIsRecapOpen} />
				<Grid fullWidth narrow className='space-y-5'>
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
					<FullWidthColumn className='justify-end space-y-5 pt-5 md:flex md:space-y-0 md:space-x-5'>
						{currentStep > 0 && (
							<Button
								size='md'
								kind='secondary'
								onClick={() => setCurrentStep(old => old - 1)}
								className='w-full md:w-fit'
							>
								{t('modals:back')}
							</Button>
						)}
						<Button
							size='md'
							onClick={() => setCurrentStep(old => old + 1)}
							className='w-full md:w-fit'
						>
							{currentStep === 5 ? t('modals:save') : t('changeMonitoring:save-next')}
						</Button>
					</FullWidthColumn>
				</Grid>
			</Tile>
		</Layer>
	);
};
export default NewMonitoringStepTile;
