import { Column, Grid, Layer, NumberInput, Tile } from '@carbon/react';
import { FieldErrors, UseFormRegister, Control, UseFormWatch } from 'react-hook-form';
import FullWidthColumn from '@components/FullWidthColumn';
import SingleUserSelect from '@components/SingleUserSelect';
import MultipleUserSelect from '@components/MultipleUserSelect';
import User from '@model/common/User';
import { useState } from 'react';
import useGetUsersByRole from '@api/user/useGetUsersByRole';

export interface ApproverInfoForm {
	steps: [
		{
			approvers: User[];
			delegates: User[];
		}
	];
}
interface ApproverInfoProps {
	watch?: UseFormWatch<ApproverInfoForm>;
	control?: Control<ApproverInfoForm>;
	register: UseFormRegister<ApproverInfoForm>;
	errors: FieldErrors<ApproverInfoForm>;
}
interface StepsInfoType {
	approvers: User[];
	delegates: User[];
}

const ApproverInfo = ({ watch, register, control }: ApproverInfoProps) => {
	const [stepsArr, setStepArr] = useState<StepsInfoType[]>([
		{ approvers: [], delegates: [] }
	]);
	const [isStateChanged, setIsStateChanged] = useState(false);

	const handleAddSteps = (value: number, direction: string) => {
		if (direction === 'up') {
			stepsArr.push({ approvers: [], delegates: [] });
		} else {
			stepsArr.pop();
		}
		setIsStateChanged(!isStateChanged);
	};

	const handleSelectedApprover = (index: number, selectedApprover: User) => {
		const updatedMoreSlot: StepsInfoType[] = [...stepsArr];
		updatedMoreSlot[index].approvers = [selectedApprover];
		setStepArr(updatedMoreSlot);
	};

	const handleSelectedDelegates = (index: number, selectedDelegates: User[]) => {
		const updatedMoreSlot: StepsInfoType[] = [...stepsArr];
		updatedMoreSlot[index].delegates = selectedDelegates;
		setStepArr(updatedMoreSlot);
	};
	return (
		<Layer>
			<Grid fullWidth>
				<Column sm={4} md={8} lg={8} className='mb-5 '>
					<NumberInput
						id='approver-total-steps'
						size='md'
						min={0}
						value={1}
						label='approver'
						onChange={(e, { value, direction }) =>
							handleAddSteps(value as number, direction as string)
						}
					/>
				</Column>

				<FullWidthColumn>
					<Layer className='h-full'>
						{stepsArr?.map((item, index) => {
							return (
								<>
									<Tile id='tile-1'>
										<div className='flex justify-start md:justify-between'>
											<h4 className='mb-5 text-productive-heading-3'>Step {index + 1}</h4>
										</div>
										<Column sm={4} md={8} lg={8} className='mb-5'>
											<SingleUserSelect
												control={control}
												label='approver'
												name={`steps.${index}.approvers.${index}`}
												excludedUsers={
													watch ? watch(`steps.${index}.delegates.${index}`) : []
												}
												level={3}
												setSelectedUser={(selectedApprover: User) => {
													handleSelectedApprover(index, selectedApprover);
												}}
												{...register(`steps.${index}.approvers.${index}`, {
													required: true
												})}
												getUserFn={() => {
													// eslint-disable-next-line react-hooks/rules-of-hooks
													return useGetUsersByRole('WORKFLOW_APPROVER');
												}}
											/>
										</Column>
										<Column sm={4} md={8} lg={8} className='mb-5'>
											<MultipleUserSelect
												control={control}
												label='approver Delegates'
												name={`steps.${index}.delegates.${index}`}
												excludedUser={
													watch ? watch(`steps.${index}.approvers.${index}`) : []
												}
												level={3}
												setSelectedUser={(selectedDelegates: User[]) => {
													handleSelectedDelegates(index, selectedDelegates);
												}}
												selectedUsers={item.approverDelegates}
												{...register(`steps.${index}.delegates.${index}`, {
													required: true
												})}
												getUserFn={() => {
													// eslint-disable-next-line react-hooks/rules-of-hooks
													return useGetUsersByRole('WORKFLOW_APPROVER');
												}}
											/>
										</Column>
									</Tile>
									<br />
								</>
							);
						})}
					</Layer>
				</FullWidthColumn>
			</Grid>
		</Layer>
	);
};
export default ApproverInfo;
