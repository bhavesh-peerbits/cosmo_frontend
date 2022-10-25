/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import useCreateDraft from '@api/evidence-request/useCreateDraft';
import useGetAllUniqueEvidenceNames from '@api/evidence-request/useGetAllUniqueEvidenceNames';
import useGetNewDraftParameter from '@api/evidence-request/useGetNewDraftParameter';
import useGetFrameworkTreeByCode from '@api/framework/useGetFrameworkTreeByCode';
import { TextInput, Select, SelectItem, Grid, TreeView, TreeNode } from '@carbon/react';
import { CreateTearsheet } from '@components/CreateTearsheet';
import CreateTearsheetStep from '@components/CreateTearsheet/CreateTearsheepStep';
import FullWidthColumn from '@components/FullWidthColumn';
import Framework from '@model/Framework';
import PhaseType from '@model/PhaseType';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { TrashCan } from '@carbon/react/icons';

type NewEvidenceRequestModalProps = {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
};

interface CreateRequestForm {
	requestName: string;
	workflow: string;
	requestType: string;
	phaseType: PhaseType;
}
const GenerateFrameworkStep = (requestType: string) => {
	const { data } = useGetFrameworkTreeByCode('Tree');
	const [selectedItems, setSelectedItems] = useState<Framework[]>([]);
	const { t } = useTranslation('evidenceRequest');
	const recursiveMap = (framework: Framework) => {
		return framework?.children?.map(children => (
			<TreeNode
				label={
					<div
						className={`${
							!children.children &&
							!selectedItems.find(item => item.code === children.code) &&
							'cursor-pointer'
						}`}
						onClick={() =>
							!children.children &&
							!selectedItems.find(item => item.code === children.code) &&
							setSelectedItems(old => [...old, children])
						}
					>
						{children.name}
					</div>
				}
			>
				{recursiveMap(children)}
			</TreeNode>
		));
	};
	if (!data) {
		return null;
	}

	return (
		<CreateTearsheetStep
			keyValue='frameworkStep'
			title='Framework'
			includeStep={requestType !== 'FREE'}
			className='overflow-auto'
		>
			<div className='flex w-full space-x-5 divide-x-1 divide-solid divide-border-subtle-0'>
				<div className='w-full'>
					<p>{t('select-branches-leaves')}</p>
					<TreeView className='w-full pt-3' hideLabel label='Framework'>
						{recursiveMap(data)}
					</TreeView>
				</div>
				<div className='w-full pl-5'>
					<p>{t('selected-items')}</p>
					<TreeView className='w-full pt-3' hideLabel label='Selected leaves'>
						{selectedItems.map(item => (
							<TreeNode
								label={
									<div className='flex'>
										{item.name}
										<div
											className='cursor-pointer pl-4'
											onClick={() =>
												setSelectedItems(
													selectedItems.filter(
														selectedItem => selectedItem.code !== item.code
													)
												)
											}
										>
											<TrashCan />
										</div>
									</div>
								}
							/>
						))}
					</TreeView>
				</div>
			</div>
		</CreateTearsheetStep>
	);
};

const NewEvidenceRequestModal = ({ isOpen, setIsOpen }: NewEvidenceRequestModalProps) => {
	const { t } = useTranslation([
		'evidenceRequest',
		'modals',
		'applicationInfo',
		'userSelect'
	]);
	const { mutate } = useCreateDraft(); // TODO Handle errors
	const { data: parameters } = useGetNewDraftParameter();
	const { data: requestNames } = useGetAllUniqueEvidenceNames();
	const [isFreeSelected, setIsFreeSelected] = useState(false);

	const {
		register,
		reset,
		watch,
		handleSubmit,
		formState: { isValid, errors }
	} = useForm<CreateRequestForm>({
		mode: 'onChange'
	});
	const requestType = watch('requestType');

	const cleanUp = () => {
		reset();
		setIsOpen(false);
	};

	const submitFreeRequest = (data: CreateRequestForm) => {
		return mutate(
			{
				draftData: {
					name: data.requestName,
					requestType: data.requestType,
					workflowname: data.workflow,
					phaseType: data.phaseType
				}
			},
			{
				onSuccess: () => {
					cleanUp();
				}
			}
		);
	};
	const generateBasicInfoStep = useCallback(() => {
		return (
			<CreateTearsheetStep
				keyValue='basicInfoStep'
				title={t('evidenceRequest:basic-info')}
				disableSubmit={!isValid}
			>
				<Grid fullWidth className='space-y-7'>
					<FullWidthColumn>
						<TextInput
							id='request-name'
							labelText={t('evidenceRequest:request-name')}
							placeholder={t('evidenceRequest:request-name')}
							invalidText={errors.requestName?.message}
							invalid={Boolean(errors.requestName)}
							{...register('requestName', {
								validate: name =>
									!requestNames?.includes(name.toLowerCase()) ||
									t('applicationInfo:name-exists')
							})}
						/>
					</FullWidthColumn>
					<FullWidthColumn>
						{' '}
						<Select
							id='workflow-types'
							labelText={`${t('evidenceRequest:workflow-type')} *`}
							{...register('workflow', {
								required: true
							})}
						>
							{parameters?.workflowName.map(workflowName => (
								<SelectItem text={workflowName} value={workflowName} key={workflowName} />
							))}
						</Select>
					</FullWidthColumn>
					<FullWidthColumn>
						<Select
							id='request-types'
							labelText={`${t('evidenceRequest:request-type')} *`}
							{...register('requestType', {
								required: true
							})}
						>
							{parameters?.requestType.map(type => (
								<SelectItem
									text={type}
									value={type}
									key={type}
									onSelect={() =>
										type === 'FREE' ? setIsFreeSelected(true) : setIsFreeSelected(false)
									}
								/>
							))}
						</Select>
					</FullWidthColumn>
					<FullWidthColumn>
						<Select
							id='phase-types'
							labelText={`${t('evidenceRequest:phase-type')}`}
							{...register('phaseType')}
						>
							{parameters?.phaseType?.map(phaseType => (
								<SelectItem
									text={phaseType.name || ''}
									value={phaseType}
									key={phaseType.id}
								/>
							))}
						</Select>
					</FullWidthColumn>
				</Grid>
			</CreateTearsheetStep>
		);
	}, [
		errors.requestName,
		isValid,
		parameters?.phaseType,
		parameters?.requestType,
		parameters?.workflowName,
		register,
		requestNames,
		t
	]);

	return (
		<CreateTearsheet
			influencerWidth='narrow'
			submitButtonText={t('modals:create')}
			cancelButtonText={t('modals:cancel')}
			backButtonText={t('modals:back')}
			nextButtonText={t('modals:next')}
			title={t('evidenceRequest:create-new-request')}
			open={isOpen}
			onClose={() => {
				cleanUp();
				setIsOpen(false);
			}}
			onRequestSubmit={
				requestType === 'FREE' ? handleSubmit(submitFreeRequest) : () => undefined // TODO Add correct function
			}
		>
			{generateBasicInfoStep()}
			{!isFreeSelected && GenerateFrameworkStep(requestType)}
		</CreateTearsheet>
	);
};
export default NewEvidenceRequestModal;
