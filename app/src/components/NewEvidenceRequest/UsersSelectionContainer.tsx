import { Accordion, AccordionItem, Grid, Layer } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';
import Application from '@model/Application';
import { useTranslation } from 'react-i18next';
import UsersSelectionForm from './UsersSelectionForm';

type UsersSelectionContainerProps = {
	appsSelected: Application[];
	steps: string[];
};
const UsersSelectionContainer = ({
	appsSelected,
	steps
}: UsersSelectionContainerProps) => {
	const { t } = useTranslation('evidenceRequest');

	const applicationNameTitle = (applicationName: string) => {
		return <span className='text-productive-heading-1'>{applicationName}</span>;
	};

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
				<FullWidthColumn className='space-y-2 pt-4'>
					<span className='text-body-long-2'>{step}</span>
					<Layer level={2}>
						<Accordion className='bg-layer-1'>
							{appsSelected.slice(0, 3).map(application => (
								<AccordionItem title={applicationNameTitle(application.name)}>
									<UsersSelectionForm application={application} step={step} />
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
