import {
	ComposedModal,
	ModalBody,
	Tag,
	ModalHeader,
	TextInput,
	Accordion,
	AccordionItem
} from '@carbon/react';
import { useTranslation } from 'react-i18next';
import { Dispatch, SetStateAction } from 'react';
import UserProfileImage from '@components/UserProfileImage';
import Run from '@model/ChangeMonitoring/Run';
import Monitoring from '@model/ChangeMonitoring/Monitoring';

type RecapStringRowProps = {
	title: string;
	info: string;
};
const RecapStringRow = ({ title, info }: RecapStringRowProps) => {
	return (
		<div className='flex divide-x-[1px] divide-solid divide-border-subtle-0'>
			<div className='h-[40px] w-1/3 py-3 pl-3'>
				<p className='text-heading-1'>{title}</p>
			</div>
			<p className='h-[40px] py-3 pl-3 text-body-short-1'>{info}</p>
		</div>
	);
};

type InfoRunProps = {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	run: Run;
	monitoring: Monitoring;
};

const InfoRunModal = ({ isOpen, setIsOpen, run, monitoring }: InfoRunProps) => {
	const { t } = useTranslation([
		'modals',
		'monitoringDashboard',
		'changeMonitoring',
		'evidenceRequest'
	]);

	const cleanUp = () => {
		setIsOpen(false);
	};

	return (
		<ComposedModal open={isOpen} onClose={cleanUp}>
			<ModalHeader
				label={`Monitoring Name - Run ${run.id}`}
				title='Run Recap'
				closeModal={cleanUp}
			/>
			<ModalBody className='space-y-5'>
				<div className='divide-y-[1px] divide-solid divide-border-subtle-0 bg-background'>
					<RecapStringRow
						title={t('modals:application')}
						info={monitoring.instance.application.name}
					/>
					<RecapStringRow
						title={t('changeMonitoring:app-instance')}
						info={monitoring.instance.name}
					/>
					<RecapStringRow title='Run' info={`RUN ${run.orderNumber}`} />
					<RecapStringRow title='Framework' info={monitoring.frameworkName || ''} />
					{monitoring.frameworkLeafsName && (
						<RecapStringRow
							title={t('evidenceRequest:framework-name')}
							info={monitoring.frameworkLeafsName.split('-').join(', ')}
						/>
					)}
					{monitoring.frameworkLeafsCodes && (
						<RecapStringRow
							title={t('evidenceRequest:framework-code')}
							info={monitoring.frameworkLeafsCodes.split('-').join(', ')}
						/>
					)}
					<div className='flex divide-x-[1px] divide-solid divide-border-subtle-0'>
						<div className='h-[40px] w-1/3 py-3 pl-3'>
							<p className='text-heading-1'>{t('evidenceRequest:owner')}</p>
						</div>
						<div className='h-[40px] py-3 pl-3'>
							<UserProfileImage
								size='md'
								initials='cc'
								imageDescription='c'
								tooltipText='c'
							/>
						</div>
					</div>
					<div className='flex divide-x-[1px] divide-solid divide-border-subtle-0'>
						<div className='h-[40px] w-1/3 py-3 pl-3'>
							<p className='text-heading-1'>
								{t('changeMonitoring:extensions-to-ignore')}
							</p>
						</div>
						{monitoring.monitoringAssets
							.map(ma => ma.extensions)
							?.map(extension => (
								<div className='flex h-[40px] items-center py-3 pl-3'>
									<Tag>{extension}</Tag>
								</div>
							))}
					</div>
				</div>
				<Accordion>
					{monitoring.monitoringAssets.map(ma => (
						<AccordionItem title={ma.asset.hostname}>
							<p className='pb-5 text-heading-1 '>Paths:</p>
							<div className='space-y-5'>
								{ma.paths.map(path => (
									<TextInput
										id={`${path.id}`}
										labelText=''
										hideLabel
										readOnly
										size='sm'
										value={path.path}
									/>
								))}
							</div>
						</AccordionItem>
					))}
				</Accordion>
			</ModalBody>
		</ComposedModal>
	);
};
export default InfoRunModal;
