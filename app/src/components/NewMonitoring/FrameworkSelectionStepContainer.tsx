import FullWidthColumn from '@components/FullWidthColumn';
import { Select, SelectItem, Layer, Tile, Button, FormLabel, Tag } from '@carbon/react';
import { Add, EditOff } from '@carbon/react/icons';
import cx from 'classnames';
import useGetNewDraftParameter from '@api/evidence-request/useGetNewDraftParameter';
import { useForm } from 'react-hook-form';
import TreeSelectionModal from '@components/Modals/TreeSelectionModal';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Framework from '@model/Framework';
import useGetUsers from '@api/user/useGetUsers';
import User from '@model/User';
import SingleControlSelect from './SingleControlSelect';
import AssociationSelectionList from './AssociationSelectionList';

type FrameworkStepFormData = {
	framework: string;
	leaves: string[];
	control: string;
	focalPoint: User;
	delegates: User[];
};

const FrameworkSelectionStepContainer = () => {
	const { t } = useTranslation('changeMonitoring');
	const [isTreeSelectionOpen, setIsTreeSelectionOpen] = useState(false);
	const [selectedLeaves, setSelectedLeaves] = useState<Framework[]>([]);

	const { data: parameters } = useGetNewDraftParameter(); // TODO Change when BE is ready
	const { data: users = [] } = useGetUsers();

	const { register, watch, control: controlForm } = useForm<FrameworkStepFormData>();
	const selectedFramework = watch('framework');
	useEffect(() => {
		setSelectedLeaves([]);
	}, [selectedFramework]);

	const associationsFakeData = [
		{
			reviewer: users[0],
			delegates: users,
			id: 'prova',
			name: 'prova'
		}
	];

	return (
		<>
			{(!selectedFramework || selectedFramework !== ('choose-framework' || 'FREE')) && (
				<TreeSelectionModal
					selectedFramework={
						selectedFramework !== ('choose-framework' || 'FREE') || !selectedFramework
							? selectedFramework
							: ''
					}
					open={isTreeSelectionOpen}
					setIsOpen={setIsTreeSelectionOpen}
					selectedLeaves={selectedLeaves}
					setSelectedLeaves={setSelectedLeaves}
				/>
			)}
			<FullWidthColumn className='w-1/2'>
				<Layer level={2}>
					<Select
						labelText='Framework *'
						id='framework-selection'
						{...register('framework', {
							required: true
						})}
					>
						<SelectItem text={t('choose-framework')} value='choose-framework' hidden />
						{parameters?.requestType.map(req => (
							<SelectItem text={req} value={req} />
						))}
					</Select>
				</Layer>
			</FullWidthColumn>
			<FullWidthColumn className='w-1/2 pt-5'>
				<FormLabel className='mb-3'>
					<span>{t('leaves')} *</span>
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
									<Tag onClose={() => setSelectedLeaves([])} filter>
										{selectedLeaves.length} {t('selected-leaves')}
									</Tag>
								</div>
							) : (
								<div className='text-text-placeholder text-body-compact-1'>
									{t('select-control')}
								</div>
							)}
						</div>
						<div className='absolute top-1/2 right-2 -translate-y-1/2'>
							<Button
								kind='ghost'
								renderIcon={() =>
									!selectedFramework ||
									selectedFramework === ('choose-framework' || 'FREE') ? (
										<EditOff size={20} />
									) : (
										<Add size={20} />
									)
								}
								size='sm'
								hasIconOnly
								disabled={
									!selectedFramework ||
									selectedFramework === ('choose-framework' || 'FREE')
								}
								onClick={() => setIsTreeSelectionOpen(true)}
								iconDescription={t('select-leaves')}
							/>
						</div>
					</Tile>
				</div>
			</FullWidthColumn>
			<FullWidthColumn className='w-1/2 pt-5'>
				<SingleControlSelect
					level={1}
					label={t('control')}
					name='control'
					control={controlForm}
					controls={['controllo 1', 'controllo 2']}
					rules={{
						required: {
							value: true,
							message: t('control-required')
						}
					}}
				/>
			</FullWidthColumn>
			<FullWidthColumn>
				<AssociationSelectionList
					associations={associationsFakeData}
					control={controlForm}
				/>
			</FullWidthColumn>
		</>
	);
};
export default FrameworkSelectionStepContainer;
