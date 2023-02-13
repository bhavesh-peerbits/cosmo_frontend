import FullWidthColumn from '@components/FullWidthColumn';
import {
	Select,
	SelectItem,
	Layer,
	Tile,
	Button,
	FormLabel,
	Tag,
	InlineLoading
} from '@carbon/react';
import { Add, EditOff } from '@carbon/react/icons';
import cx from 'classnames';
import { useForm } from 'react-hook-form';
import {
	Dispatch,
	SetStateAction,
	Suspense,
	useCallback,
	useEffect,
	useState
} from 'react';
import { useTranslation } from 'react-i18next';
import Framework from '@model/Framework';
import User from '@model/User';
import useGetFrameworkCodes from '@api/change-monitoring-analyst/useGetFrameworkCodes';
import Association from '@model/EvidenceRequest/Association';
import useGetControls from '@api/change-monitoring-analyst/useGetControls';
import InlineLoadingStatus from '@components/InlineLoadingStatus';
import ApiError from '@api/ApiError';
import MonitoringDraft from '@model/MonitoringDraft';
import useGetFrameworkTreeByCode from '@api/framework/useGetFrameworkTreeByCode';
import useSaveDraftAssociation from '@api/change-monitoring-analyst/useSaveDraftAssociation';
import { useParams } from 'react-router-dom';
import AssociationSelectionList from './AssociationSelectionList';
import MultipleControlSelect from './MultipleControlSelect';
import TreeSelectionModal from '../Modals/TreeSelectionModal';

type FrameworkStepFormData = {
	framework: string;
	controls: Association[];
	focalPoint: User;
	delegates: User[];
	association: string;
};

type FrameworkSelectionProps = {
	setCurrentStep: Dispatch<SetStateAction<number>>;
	draft: MonitoringDraft;
};

const FrameworkSelectionStepContainer = ({
	setCurrentStep,
	draft
}: FrameworkSelectionProps) => {
	const { t } = useTranslation('changeMonitoring');
	const { monitoringDraftId = '' } = useParams();
	const [isTreeSelectionOpen, setIsTreeSelectionOpen] = useState(false);
	const { mutate, isLoading, isError, isSuccess, error } = useSaveDraftAssociation();
	const { data: draftControls } = useGetControls(
		draft.frameworkLeafsCodes,
		draft.instance?.id
	);
	const { data: draftFrameworkTree } = useGetFrameworkTreeByCode(
		!draft?.frameworkName || draft?.frameworkName === 'FREE' ? '' : draft.frameworkName
	);

	const findLeaves = useCallback(
		(framework: Framework): Framework[] => {
			if (framework.children) {
				return framework.children.reduce((prev, curr) => {
					return [...prev, findLeaves(curr)].flat();
				}, [] as Framework[]);
			}
			return draft.frameworkLeafsCodes?.split('-').includes(framework.code)
				? [framework]
				: [];
		},
		[draft.frameworkLeafsCodes]
	);
	const [selectedLeaves, setSelectedLeaves] = useState<Framework[]>(
		draftFrameworkTree ? findLeaves(draftFrameworkTree) : []
	);

	const {
		register,
		watch,
		control: controlForm,
		handleSubmit,
		setValue
	} = useForm<FrameworkStepFormData>({
		defaultValues: {
			framework: draft.frameworkName || 'FREE',
			controls: draftControls,
			focalPoint: draft.focalPoint,
			delegates: draft.delegates,
			association: 'FREE'
		}
	});

	const selectedFramework = watch('framework');
	const selectedControls = watch('controls');
	const focalPoint = watch('focalPoint');
	const selectedAssociation = watch('association');

	const { data: frameworkCodes } = useGetFrameworkCodes();
	const { data: controls } = useGetControls(
		selectedFramework !== 'FREE'
			? selectedLeaves.map(leaf => leaf.code).join('-')
			: 'FREE',
		draft.instance?.id
	);

	useEffect(() => {
		selectedFramework !== draft.frameworkName && setSelectedLeaves([]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedFramework]);

	useEffect(() => {
		if (
			draftFrameworkTree &&
			!findLeaves(draftFrameworkTree).every(c =>
				selectedLeaves.find(el => el.code === c.code)
			)
		) {
			setValue('controls', []);
		}
	}, [draftFrameworkTree, findLeaves, selectedLeaves, setValue]);

	useEffect(() => {
		setValue('association', 'FREE');
	}, [setValue, draft]);

	const saveDraft = (data: FrameworkStepFormData) => {
		return mutate(
			{
				monitoringId: monitoringDraftId,
				focalPoint:
					data.association === 'FREE'
						? data.focalPoint
						: selectedControls.find(c => c.id === data.association)?.reviewer,
				delegates:
					data.association === 'FREE'
						? data.delegates
						: selectedControls.find(c => c.id === data.association)?.delegates,
				controlCode: data.controls.map(c => c.name).join('-'),
				frameworkLeafsCodes: selectedLeaves.map(leaf => leaf.code).join('-'),
				frameworkLeafsNames: selectedLeaves.map(leaf => leaf.name).join('//'),
				frameworkName: selectedFramework
			},
			{ onSuccess: () => setCurrentStep(old => old + 1) }
		);
	};

	return (
		<>
			{(!selectedFramework || selectedFramework !== 'FREE') && (
				<Suspense>
					<TreeSelectionModal
						selectedFramework={
							selectedFramework !== 'FREE' || !selectedFramework ? selectedFramework : ''
						}
						open={isTreeSelectionOpen}
						setIsOpen={setIsTreeSelectionOpen}
						selectedLeaves={selectedLeaves}
						setSelectedLeaves={setSelectedLeaves}
					/>
				</Suspense>
			)}
			<FullWidthColumn className='lg:w-1/2'>
				<Layer level={2}>
					<Select
						labelText='Framework *'
						id='framework-selection'
						{...register('framework', {
							required: true
						})}
					>
						<SelectItem text='FREE' value='FREE' />
						{frameworkCodes?.map(code => (
							<SelectItem text={code} value={code} />
						))}
					</Select>
				</Layer>
			</FullWidthColumn>
			<FullWidthColumn className='lg:w-1/2'>
				<FormLabel className='mb-3'>
					<span>
						{t('leaves')} {selectedFramework !== 'FREE' && '*'}
					</span>
				</FormLabel>
				<div className='flex w-full items-center'>
					<Tile
						className={cx(
							'relative z-0 flex min-h-[2.5rem] w-full items-center border-b-[1px] border-solid border-border-strong-1 bg-layer-3 p-0'
						)}
					>
						<div className='flex h-full w-full items-center justify-between space-x-2 pl-5 pr-8'>
							{selectedLeaves.length > 0 ? (
								<div className='mr-3 flex w-full items-center space-x-4'>
									{selectedLeaves.map(leaf => (
										<Tag
											onClose={() =>
												setSelectedLeaves(old => old.filter(el => el.code !== leaf.code))
											}
											filter
										>
											{leaf.code}
										</Tag>
									))}
								</div>
							) : (
								<div className='text-text-placeholder text-body-compact-1'>
									{t('select-leaves')}
								</div>
							)}
						</div>
						<div className='absolute top-1/2 right-2 -translate-y-1/2'>
							{!selectedFramework || selectedFramework === 'FREE' ? (
								<div className='pr-4'>
									<EditOff />
								</div>
							) : (
								<Button
									kind='ghost'
									renderIcon={() => <Add size={20} />}
									size='sm'
									hasIconOnly
									disabled={!selectedFramework || selectedFramework === 'FREE'}
									onClick={() => setIsTreeSelectionOpen(true)}
									iconDescription={t('select-leaves')}
								/>
							)}
						</div>
					</Tile>
				</div>
			</FullWidthColumn>
			<FullWidthColumn className='lg:w-1/2'>
				<MultipleControlSelect
					level={2}
					label={`${t('control')} *`}
					name='controls'
					control={controlForm}
					rules={{
						required: {
							value: selectedFramework !== 'FREE',
							message: t('control-required')
						}
					}}
					readOnly={selectedLeaves.length === 0}
					controls={controls}
				/>
			</FullWidthColumn>
			{((selectedControls && selectedControls.length > 0) ||
				selectedFramework === 'FREE') && (
				<FullWidthColumn className='overflow-scroll'>
					<AssociationSelectionList
						associations={selectedControls}
						control={controlForm}
						setValue={setValue}
						watch={watch}
					/>
				</FullWidthColumn>
			)}
			<FullWidthColumn className='items-center justify-end space-y-5 md:flex md:space-y-0 md:space-x-5'>
				<InlineLoadingStatus
					{...{ isLoading: false, isSuccess, isError, error: error as ApiError }}
				/>
				<div>{isLoading && <InlineLoading />}</div>
				<Button
					size='md'
					kind='secondary'
					className='w-full md:w-fit'
					onClick={() => setCurrentStep(old => old - 1)}
				>
					{t('back')}
				</Button>
				<Button
					size='md'
					className='w-full md:w-fit'
					onClick={handleSubmit(saveDraft)}
					disabled={
						(selectedFramework === 'FREE'
							? !focalPoint
							: selectedLeaves.length === 0 ||
							  selectedControls.length === 0 ||
							  (selectedAssociation === 'FREE' && !focalPoint) ||
							  !selectedAssociation) || isLoading
					}
				>
					{t('save-next')}
				</Button>
			</FullWidthColumn>
		</>
	);
};
export default FrameworkSelectionStepContainer;
