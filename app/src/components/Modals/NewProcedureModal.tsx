import {
	Button,
	ComposedModal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	Select,
	SelectItem,
	SelectSkeleton,
	Toggle
} from '@carbon/react';
import { Dispatch, SetStateAction, Suspense, useEffect, useMemo, useState } from 'react';
import useGetApps from '@api/management/useGetApps';
import { useParams } from 'react-router-dom';
import { useUnmount } from 'ahooks';
import Procedure from '@model/Procedure';
import ProcedureAppInstance from '@model/ProcedureAppInstance';
import useGetProcedures from '@api/procedures/useGetProcedures';
import useGetProcedureByApp from '@api/app-procedures/useGetProcedureByApp';
import { useTranslation } from 'react-i18next';

interface ProcedureSelection {
	isCopySelected: boolean;
	procedureFrom: ProcedureAppInstance | undefined;
	procedure: Procedure | undefined;
}

type NewProcedureModalProps = {
	procedureApps: ProcedureAppInstance[];
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	onSuccess: (
		procedure: Procedure,
		procedureFrom: ProcedureAppInstance | undefined
	) => void;
};

interface ApplicationProcedureSelectProps
	extends Omit<ProcedureBodyProps, 'procedureApps'> {
	appId: string | undefined;
}

const ApplicationProcedureSelect = ({
	appId,
	procedureSelection,
	setProcedureSelection
}: ApplicationProcedureSelectProps) => {
	const { data: proceduresApp = new Map<string, ProcedureAppInstance>() } =
		useGetProcedureByApp(appId);
	const { data: procedures = new Map<string, Procedure>() } = useGetProcedures();
	const { t } = useTranslation('modals');

	return (
		<Select
			id='select-app'
			labelText={t('select-procedure')}
			defaultValue='placeholder-item'
			disabled={proceduresApp.size === 0}
			onChange={e =>
				setProcedureSelection(old => ({
					...old,
					procedureFrom: proceduresApp.get(e.target.value)
				}))
			}
		>
			<SelectItem
				disabled
				hidden
				value={procedureSelection.procedureFrom || 'placeholder-item'}
				text={proceduresApp.size === 0 ? t('no-procedures') : t('select-procedure')}
			/>
			{[...proceduresApp.values()]
				.sort((a, b) =>
					`${procedures.get(a.procedureId)?.name.toLowerCase()}`.localeCompare(
						`${procedures.get(b.procedureId)?.name.toLowerCase()}`
					)
				)
				.map(proc => (
					<SelectItem
						text={`${procedures.get(proc.procedureId)?.name}`}
						value={proc.id}
						key={proc.id}
					/>
				))}
		</Select>
	);
};

const ApplicationSelect = ({
	procedureSelection,
	setProcedureSelection,
	procedureApps
}: ProcedureBodyProps) => {
	const { t } = useTranslation('modals');
	const { appId } = useParams();
	const { data: allApplications = new Map() } = useGetApps();
	const [application, setApplication] = useState<string>();
	useUnmount(() => {
		setProcedureSelection(old => ({ ...old, procedureFrom: undefined }));
	});

	const applications = [...allApplications.values()]
		.filter(app => app.id !== appId)
		.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
	return (
		<div className='space-y-7'>
			<Select
				id='select-app'
				labelText={t('select-application')}
				defaultValue='placeholder-item'
				disabled={applications.length === 0}
				onChange={e => setApplication(e.target.value)}
			>
				<SelectItem
					disabled
					hidden
					value='placeholder-item'
					text={
						applications.length === 0 ? t('no-applications') : t('select-application')
					}
				/>
				{applications.map(app => (
					<SelectItem text={app.name} value={app.id} key={app.id} />
				))}
			</Select>

			<Suspense fallback={<SelectSkeleton />}>
				<ApplicationProcedureSelect
					appId={application}
					{...{ procedureSelection, setProcedureSelection, procedureApps }}
				/>
			</Suspense>
		</div>
	);
};

interface ProcedureBodyProps {
	procedureSelection: ProcedureSelection;
	setProcedureSelection: Dispatch<SetStateAction<ProcedureSelection>>;
	procedureApps: ProcedureAppInstance[];
}

const ProcedureBody = ({
	procedureSelection,
	setProcedureSelection,
	procedureApps
}: ProcedureBodyProps) => {
	const { t } = useTranslation('modals');
	const { data: procedures = new Map<string, Procedure>() } = useGetProcedures();
	const { isCopySelected } = procedureSelection;

	const procFiltered = useMemo(
		() =>
			[...procedures.values()]
				.filter(p => procedureApps.findIndex(pa => pa.procedureId === p.id) === -1)
				.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())),
		[procedureApps, procedures]
	);

	return (
		<div className='flex flex-col space-y-7'>
			<Toggle
				aria-label='Toggle Copy Procedure'
				labelText={t('copy-procedure')}
				labelA=''
				labelB={t('copy')}
				id='toggle-1'
				toggled={isCopySelected}
				onToggle={() =>
					setProcedureSelection(old => ({
						...old,
						isCopySelected: !old.isCopySelected
					}))
				}
			/>
			{isCopySelected && (
				<Suspense
					fallback={
						<div className='space-y-7'>
							<SelectSkeleton />
							<SelectSkeleton />
						</div>
					}
				>
					<ApplicationSelect
						{...{ procedureSelection, setProcedureSelection, procedureApps }}
					/>
				</Suspense>
			)}

			<Select
				id='select-procedure'
				defaultValue='placeholder-item'
				labelText={t('select-to-add')}
				disabled={procFiltered.length === 0}
				onChange={e =>
					setProcedureSelection(old => ({
						...old,
						procedure: procedures.get(e.target.value)
					}))
				}
			>
				<SelectItem
					disabled
					hidden
					value='placeholder-item'
					text={procFiltered.length === 0 ? t('no-procedures') : t('select-procedure')}
				/>
				{procFiltered.map(proc => (
					<SelectItem key={proc.id} text={proc.name} value={proc.id} />
				))}
			</Select>
		</div>
	);
};

const ProcedureBodyLoading = () => {
	const { t } = useTranslation('modals');
	return (
		<div className='flex flex-col space-y-7'>
			<Toggle
				disabled
				aria-label='Toggle Copy Procedure'
				labelText={t('copy-procedure')}
				labelA=''
				labelB={t('copy')}
				id='toggle-1'
			/>

			<SelectSkeleton />
		</div>
	);
};

const NewProcedureModal = ({
	procedureApps,
	isOpen,
	setIsOpen,
	onSuccess
}: NewProcedureModalProps) => {
	const { t } = useTranslation('modals');
	const [procedureSelection, setProcedureSelection] = useState<ProcedureSelection>({
		isCopySelected: false,
		procedureFrom: undefined,
		procedure: undefined
	});
	const [isValid, setIsValid] = useState(false);

	useEffect(() => {
		setIsValid(
			Boolean(
				procedureSelection.isCopySelected
					? procedureSelection.procedureFrom && procedureSelection.procedure
					: procedureSelection.procedure
			)
		);
	}, [procedureSelection]);

	useEffect(() => {
		if (!isOpen) {
			setProcedureSelection({
				procedure: undefined,
				procedureFrom: undefined,
				isCopySelected: false
			});
		}
	}, [isOpen]);

	return (
		<ComposedModal open={isOpen} onClose={() => setIsOpen(false)} className='z-[99999]'>
			<ModalHeader title={t('add-procedure')} closeModal={() => setIsOpen(false)} />
			{isOpen && (
				<ModalBody>
					<Suspense fallback={<ProcedureBodyLoading />}>
						<ProcedureBody
							{...{ procedureSelection, setProcedureSelection, procedureApps }}
						/>
					</Suspense>
				</ModalBody>
			)}
			<ModalFooter>
				<Button kind='secondary' onClick={() => setIsOpen(false)}>
					{t('cancel')}
				</Button>
				<Button
					disabled={!isValid}
					onClick={() => {
						procedureSelection.procedure &&
							onSuccess(procedureSelection.procedure, procedureSelection.procedureFrom);
						setIsOpen(false);
					}}
				>
					{t('add-procedure')}
				</Button>
			</ModalFooter>
		</ComposedModal>
	);
};

export default NewProcedureModal;
