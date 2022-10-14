import { Accordion, AccordionItem, Button, Grid, Layer } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import Application from '@model/Application';
import EvidenceRequestDraft from '@model/EvidenceRequestDraft';
import { StepDtoTypeEnum } from 'cosmo-api/src/v1';
import { Dispatch, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';
import UsersSelectionForm from './UsersSelectionForm';

type UsersSelectionContainerProps = {
	appsSelected: Application[];
	setCurrentStep: (val: number) => void;
	setRequestDraft: Dispatch<SetStateAction<EvidenceRequestDraft>>;
	requestDraft: EvidenceRequestDraft;
};
const UsersSelectionContainer = ({
	appsSelected,
	setCurrentStep,
	setRequestDraft,
	requestDraft
}: UsersSelectionContainerProps) => {
	const { t } = useTranslation(['evidenceRequest', 'modals']);
	const [isCompleted, setIsCompleted] = useState<{ [id: string]: boolean }>();

	const translateStepType = (stepType: StepDtoTypeEnum) => {
		switch (stepType) {
			case 'APPROVAL':
				return t('evidenceRequest:approval');
			case 'UPLOAD':
				return t('evidenceRequest:upload');
			default:
				return t('evidenceRequest:request');
		}
	};

	const handleNext = () => {
		setCurrentStep(2);
	};

	return (
		<Grid fullWidth narrow className='space-y-5'>
			<FullWidthColumn>
				<FullWidthColumn className='text-heading-3'>
					<span>{t('evidenceRequest:users-selection')}</span>
				</FullWidthColumn>
				<FullWidthColumn className='text-text-secondary text-body-long-1'>
					<span>Description to add</span>
				</FullWidthColumn>
			</FullWidthColumn>
			{requestDraft?.requests?.[0].steps?.slice(1).map(step => (
				<FullWidthColumn className='space-y-3'>
					<span className='text-body-long-2'>{translateStepType(step.type)}</span>
					<Layer level={2}>
						<Accordion className='bg-layer-1'>
							{appsSelected.map(application => (
								<AccordionItem
									title={
										<span className='text-productive-heading-1'>{application.name}</span>
									}
								>
									<UsersSelectionForm
										application={application}
										step={step}
										setIsCompleted={setIsCompleted}
										setRequestDraft={setRequestDraft}
									/>
								</AccordionItem>
							))}
						</Accordion>
					</Layer>
				</FullWidthColumn>
			))}
			<FullWidthColumn>
				<FullWidthColumn className='flex justify-end space-x-5'>
					<Button kind='secondary' size='md' onClick={() => setCurrentStep(0)}>
						{t('modals:back')}
					</Button>
					<Button
						size='md'
						disabled={
							isCompleted &&
							!Object.values(isCompleted).reduce((curr, prev) => curr && prev)
						}
						onClick={handleNext}
					>
						{t('modals:next')}
					</Button>
				</FullWidthColumn>
			</FullWidthColumn>
		</Grid>
	);
};
export default UsersSelectionContainer;
