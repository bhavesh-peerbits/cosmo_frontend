import { Accordion, AccordionItem, Grid, Layer } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import Application from '@model/Application';
import EvidenceRequestDraft from '@model/EvidenceRequestDraft';
import EvidenceRequestStep from '@model/EvidenceRequestStep';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import UsersSelectionForm from './UsersSelectionForm';

type UsersSelectionContainerProps = {
	appsSelected: Application[];
	steps: EvidenceRequestStep[];
	setIsNextActive: (val: boolean) => void;
	setRequestDraft: Dispatch<SetStateAction<EvidenceRequestDraft>>;
};
const UsersSelectionContainer = ({
	appsSelected,
	steps,
	setIsNextActive,
	setRequestDraft
}: UsersSelectionContainerProps) => {
	const { t } = useTranslation('evidenceRequest');
	const [isCompleted, setIsCompleted] = useState<{ [id: string]: boolean }>();

	useEffect(() => {
		isCompleted &&
			setIsNextActive(Object.values(isCompleted).reduce((curr, prev) => curr && prev));
	}, [isCompleted, setIsNextActive]);

	const translateStepType = (stepType: string | undefined) => {
		switch (stepType) {
			case 'APPROVAL':
				return t('approval');
			case 'UPLOAD':
				return t('upload');
			default:
				return t('request');
		}
	}; // TODO Fix when BE controls are ready (remove '| undefined')

	return (
		<Grid fullWidth narrow className='space-y-5'>
			<FullWidthColumn>
				<FullWidthColumn className='text-heading-3'>
					<span>{t('users-selection')}</span>
				</FullWidthColumn>
				<FullWidthColumn className='text-text-secondary text-body-long-1'>
					<span>Description to add</span>
				</FullWidthColumn>
			</FullWidthColumn>
			{steps.map(step => (
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
		</Grid>
	);
};
export default UsersSelectionContainer;
