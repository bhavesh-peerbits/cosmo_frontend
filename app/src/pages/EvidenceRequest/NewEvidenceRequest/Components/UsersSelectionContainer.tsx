import { Accordion, AccordionItem, Button, Grid, Layer } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import Application from '@model/Narrative/Application';
import ApplicationStepRequest from '@model/EvidenceRequest/ApplicationStepRequest';
import evidenceRequestDraftStore from '@store/evidenceRequestDraft/evidenceRequestDraftStore';
import { StepDtoTypeEnum } from 'cosmo-api/src/v1';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import UsersSelectionForm from './UsersSelectionForm';

type UsersSelectionContainerProps = {
	appsSelected: Application[];
	setCurrentStep: (val: number) => void;
};
const UsersSelectionContainer = ({
	appsSelected,
	setCurrentStep
}: UsersSelectionContainerProps) => {
	const { t } = useTranslation(['evidenceRequest', 'modals']);
	const [isCompleted, setIsCompleted] = useState<{ [id: string]: boolean }>();
	const requestDraft = useRecoilValue(evidenceRequestDraftStore);

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
					<span>{t('evidenceRequest:users-selection-description')}.</span>
				</FullWidthColumn>
			</FullWidthColumn>
			{requestDraft?.requests?.[0].steps
				?.filter(step => step.type !== 'REQUEST')
				.map(step => (
					<FullWidthColumn className='space-y-3' key={`${step.id}`}>
						<span className='text-body-long-2'>{translateStepType(step.type)}</span>
						<Layer level={2}>
							<Accordion className='bg-layer-1'>
								{appsSelected.map(application => (
									<AccordionItem
										key={`${application.id}-${step.id}`}
										title={
											<span className='text-productive-heading-1'>
												{application.name}
											</span>
										}
									>
										<UsersSelectionForm
											associations={
												(
													requestDraft.requests?.find(
														request => request.application.id === application.id
													) as ApplicationStepRequest
												).associations
											}
											step={step}
											appStepRequest={
												requestDraft.requests?.find(
													request => request.application.id === application.id
												) as ApplicationStepRequest
											}
											setIsCompleted={setIsCompleted}
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
