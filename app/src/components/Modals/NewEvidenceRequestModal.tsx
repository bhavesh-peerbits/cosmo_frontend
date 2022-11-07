/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import useCreateDraft from '@api/evidence-request/useCreateDraft';
import useGetAllUniqueEvidenceNames from '@api/evidence-request/useGetAllUniqueEvidenceNames';
import useGetNewDraftParameter from '@api/evidence-request/useGetNewDraftParameter';
import { TextInput, Select, SelectItem, Grid, TreeView, TreeNode } from '@carbon/react';
import { CreateTearsheet } from '@components/CreateTearsheet';
import CreateTearsheetStep from '@components/CreateTearsheet/CreateTearsheepStep';
import FullWidthColumn from '@components/FullWidthColumn';
import Framework from '@model/Framework';
import PhaseType from '@model/PhaseType';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { TrashCan } from '@carbon/react/icons';
import useGetFrameworkTreeByCode from '@api/framework/useGetFrameworkTreeByCode';

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
	const [selectedLeaves, setSelectedLeaves] = useState<Framework[]>([]);
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
	const { data: framework } = useGetFrameworkTreeByCode(
		requestType !== 'FREE' ? requestType : ''
	);
	const cleanUp = () => {
		reset();
		setIsOpen(false);
	};
	useEffect(() => {
		setSelectedLeaves([]);
	}, [requestType]);

	const submitRequest = (data: CreateRequestForm) => {
		return mutate(
			{
				draftData: {
					name: data.requestName,
					requestType:
						requestType === 'FREE' ? ['FREE'] : selectedLeaves.map(leaf => leaf.code),
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
									!requestNames
										?.map(existingName => existingName.toLowerCase())
										.includes(name.toLowerCase()) || t('applicationInfo:name-exists')
							})}
						/>
					</FullWidthColumn>
					<FullWidthColumn>
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
								<SelectItem text={type} value={type} key={type} />
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

	const generateFrameworkStep = useCallback(() => {
		const recursiveMap = (tree: Framework) => {
			return tree.children?.map(children => (
				<TreeNode
					className={
						framework?.leafs?.includes(children.code) &&
						![...selectedLeaves].find(item => item.code === children.code)
							? 'cursor-pointer'
							: 'cursor-auto'
					}
					label={children.name}
					onSelect={() =>
						framework?.leafs?.includes(children.code) &&
						![...selectedLeaves].find(item => item.code === children.code) &&
						setSelectedLeaves(old => [...old, children])
					}
				>
					{recursiveMap(children)}
				</TreeNode>
			));
		};

		return (
			<CreateTearsheetStep
				keyValue='frameworkStep'
				title='Framework'
				includeStep={requestType !== 'FREE'}
				className='overflow-auto'
				disableSubmit={selectedLeaves.length === 0}
			>
				<div className='flex w-full space-x-5 divide-x-1 divide-solid divide-border-subtle-0'>
					<div className='w-full'>
						<p>{t('evidenceRequest:select-branches-leaves')}</p>
						<TreeView className='w-full pt-3' hideLabel label='Framework'>
							{framework && recursiveMap(framework)}
						</TreeView>
					</div>
					<div className='w-full pl-5'>
						<p>{t('evidenceRequest:selected-items')}</p>
						<TreeView className='w-full pt-3' hideLabel label='Selected leaves'>
							{[...selectedLeaves].map(leaf => (
								<TreeNode
									label={
										<div className='flex'>
											{leaf.name}
											<div
												className='cursor-pointer pl-4'
												onClick={() =>
													setSelectedLeaves(
														[...selectedLeaves].filter(
															selectedLeaf => selectedLeaf.code !== leaf.code
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
	}, [framework, requestType, selectedLeaves, t]);

	return (
		<CreateTearsheet
			influencerWidth='narrow'
			submitButtonText={t('modals:create')}
			cancelButtonText={t('modals:cancel')}
			backButtonText={t('modals:back')}
			nextButtonText={t('modals:next')}
			className='bg-background-brand'
			title={t('evidenceRequest:create-new-request')}
			open={isOpen}
			onClose={() => {
				cleanUp();
				setIsOpen(false);
			}}
			onRequestSubmit={handleSubmit(submitRequest)}
		>
			{generateBasicInfoStep()}
			{generateFrameworkStep()}
		</CreateTearsheet>
	);
};
export default NewEvidenceRequestModal;
