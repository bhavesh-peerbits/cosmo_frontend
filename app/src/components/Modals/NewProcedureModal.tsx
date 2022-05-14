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
import { Dispatch, SetStateAction, Suspense, useEffect, useState } from 'react';
import useGetApps from '@api/management/useGetApps';
import { useParams } from 'react-router-dom';
import useGetProcedureByApp from '@api/procedures/useGetProcedureByApp';
import { useUnmount } from 'ahooks';
import Procedure from '@model/Procedure';
import ProcedureAppInstance from '@model/ProcedureAppInstance';
import useGetProcedures from '@api/procedures/useGetProcedures';

interface ProcedureSelection {
	isCopySelected: boolean;
	procedureFrom: ProcedureAppInstance | undefined;
	procedure: Procedure | undefined;
}

type NewProcedureModalProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	onSuccess: (
		procedure: Procedure,
		procedureFrom: ProcedureAppInstance | undefined
	) => void;
};

interface ApplicationProcedureSelectProps extends ProcedureBodyProps {
	appId: string | undefined;
}

const ApplicationProcedureSelect = ({
	appId,
	procedureSelection,
	setProcedureSelection
}: ApplicationProcedureSelectProps) => {
	const { data: procedures = [] } = useGetProcedureByApp(appId);
	return (
		<Select
			id='select-app'
			labelText='Select application'
			defaultValue='placeholder-item'
			disabled={procedures.length === 0}
			onChange={e =>
				setProcedureSelection(old => ({
					...old,
					procedureFrom: procedures.find(({ id }) => id === e.target.value)
				}))
			}
		>
			<SelectItem
				disabled
				hidden
				value={procedureSelection.procedureFrom || 'placeholder-item'}
				text={procedures.length === 0 ? 'No procedures available' : 'Select procedure'}
			/>
			{procedures.map(proc => (
				<SelectItem
					text={`${proc.procedure.name}: ${proc.name}`}
					value={proc.id}
					key={proc.id}
				/>
			))}
		</Select>
	);
};

const ApplicationSelect = ({
	procedureSelection,
	setProcedureSelection
}: ProcedureBodyProps) => {
	const { appId } = useParams();
	const { data: allApplications = [] } = useGetApps();
	const [application, setApplication] = useState<string>();
	useUnmount(() => {
		setProcedureSelection(old => ({ ...old, procedureFrom: undefined }));
	});

	const applications = allApplications.filter(app => app.id !== appId);
	return (
		<div className='space-y-7'>
			<Select
				id='select-app'
				labelText='Select application'
				defaultValue='placeholder-item'
				disabled={applications.length === 0}
				onChange={e => setApplication(e.target.value)}
			>
				<SelectItem
					disabled
					hidden
					value='placeholder-item'
					text={
						applications.length === 0 ? 'No applications available' : 'Select application'
					}
				/>
				{applications.map(app => (
					<SelectItem text={app.name} value={app.id} key={app.id} />
				))}
			</Select>

			<Suspense fallback={<SelectSkeleton />}>
				<ApplicationProcedureSelect
					appId={application}
					{...{ procedureSelection, setProcedureSelection }}
				/>
			</Suspense>
		</div>
	);
};

interface ProcedureBodyProps {
	procedureSelection: ProcedureSelection;
	setProcedureSelection: Dispatch<SetStateAction<ProcedureSelection>>;
}

const ProcedureBody = ({
	procedureSelection,
	setProcedureSelection
}: ProcedureBodyProps) => {
	const { data: procedures = [] } = useGetProcedures();
	const { isCopySelected } = procedureSelection;

	return (
		<div className='flex flex-col space-y-7'>
			<Toggle
				aria-label='Toggle Copy Procedure'
				labelText='Copy procedure'
				labelA=''
				labelB='Copy'
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
					<ApplicationSelect {...{ procedureSelection, setProcedureSelection }} />
				</Suspense>
			)}

			<Select
				id='select-procedure'
				defaultValue='placeholder-item'
				labelText='Select procedure to add'
				disabled={procedures.length === 0}
				onChange={e =>
					setProcedureSelection(old => ({
						...old,
						procedure: procedures.find(({ id }) => id === e.target.value)
					}))
				}
			>
				<SelectItem
					disabled
					hidden
					value='placeholder-item'
					text={procedures.length === 0 ? 'No procedures available' : 'Select procedure'}
				/>
				{procedures.map(proc => (
					<SelectItem key={proc.id} text={proc.name} value={proc.id} />
				))}
			</Select>
		</div>
	);
};

const ProcedureBodyLoading = () => {
	return (
		<div className='flex flex-col space-y-7'>
			<Toggle
				disabled
				aria-label='Toggle Copy Procedure'
				labelText='Copy procedure'
				labelA=''
				labelB='Copy'
				id='toggle-1'
			/>

			<SelectSkeleton />
		</div>
	);
};

const NewProcedureModal = ({ isOpen, setIsOpen, onSuccess }: NewProcedureModalProps) => {
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
		<ComposedModal open={isOpen} onClose={() => setIsOpen(false)}>
			<ModalHeader title='Add Procedure' closeModal={() => setIsOpen(false)} />
			<ModalBody>
				<Suspense fallback={<ProcedureBodyLoading />}>
					<ProcedureBody {...{ procedureSelection, setProcedureSelection }} />
				</Suspense>
			</ModalBody>
			<ModalFooter>
				<Button kind='secondary' onClick={() => setIsOpen(false)}>
					Cancel
				</Button>
				<Button
					disabled={!isValid}
					onClick={() => {
						procedureSelection.procedure &&
							onSuccess(procedureSelection.procedure, procedureSelection.procedureFrom);
						setIsOpen(false);
					}}
				>
					Add Procedure
				</Button>
			</ModalFooter>
		</ComposedModal>
	);
};

export default NewProcedureModal;
