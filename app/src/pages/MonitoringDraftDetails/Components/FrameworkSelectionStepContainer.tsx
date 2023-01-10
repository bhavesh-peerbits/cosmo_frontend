import FullWidthColumn from '@components/FullWidthColumn';
import { Select, SelectItem, Layer, Tile, Button, FormLabel, Tag } from '@carbon/react';
import { Add, EditOff } from '@carbon/react/icons';
import cx from 'classnames';
import { useForm } from 'react-hook-form';
import TreeSelectionModal from '@components/Modals/TreeSelectionModal';
import { Suspense, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Framework from '@model/Framework';
import User from '@model/User';
import useGetFrameworkCodes from '@api/change-monitoring/useGetFrameworkCodes';
import Association from '@model/Association';
import useGetControls from '@api/change-monitoring/useGetControls';
import MultipleControlSelect from './MultipleControlSelect';
import AssociationSelectionList from './AssociationSelectionList';

type FrameworkStepFormData = {
	framework: string;
	leaves: string[];
	controls: Association[];
	focalPoint: User;
	delegates: User[];
};

const FrameworkSelectionStepContainer = () => {
	const { t } = useTranslation('changeMonitoring');
	const [isTreeSelectionOpen, setIsTreeSelectionOpen] = useState(false);
	const [selectedLeaves, setSelectedLeaves] = useState<Framework[]>([]);

	const {
		register,
		watch,
		control: controlForm,
		resetField
	} = useForm<FrameworkStepFormData>();
	const selectedFramework = watch('framework');
	const selectedControls = watch('controls');

	const { data: frameworkCodes } = useGetFrameworkCodes();
	const { data: controls } = useGetControls(
		selectedFramework !== 'FREE'
			? selectedLeaves.map(leaf => leaf.code).join('-')
			: 'FREE'
	);

	useEffect(() => {
		setSelectedLeaves([]);
	}, [selectedFramework]);

	useEffect(() => {
		resetField('controls');
	}, [resetField, selectedFramework, selectedLeaves]);

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
							value: true,
							message: t('control-required')
						}
					}}
					readOnly={selectedFramework !== 'FREE' && selectedLeaves.length === 0}
					controls={controls}
				/>
			</FullWidthColumn>
			{selectedControls && selectedControls.length > 0 && (
				<FullWidthColumn className='overflow-scroll'>
					<AssociationSelectionList
						associations={selectedControls}
						control={controlForm}
					/>
				</FullWidthColumn>
			)}
		</>
	);
};
export default FrameworkSelectionStepContainer;
