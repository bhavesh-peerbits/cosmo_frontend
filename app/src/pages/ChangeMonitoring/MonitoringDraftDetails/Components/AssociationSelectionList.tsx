import {
	StructuredListCell,
	StructuredListBody,
	StructuredListRow,
	StructuredListWrapper,
	StructuredListHead,
	StructuredListInput
} from '@carbon/react';
import { CheckmarkFilled } from '@carbon/react/icons';
import MultipleUserSelect from '@components/MultipleUserSelect';
import SingleUserSelect from '@components/SingleUserSelect';
import UserProfileImage from '@components/UserProfileImage';
import Association from '@model/EvidenceRequest/Association';
import User from '@model/common/User';
import { useEffect, useState } from 'react';
import { Control, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type AssociationSelectionListProps = {
	control: Control<{
		framework: string;
		controls: Association[];
		focalPoint: User;
		delegates: User[];
		association: string;
	}>;
	associations: Association[];
	setValue: UseFormSetValue<{
		framework: string;
		controls: Association[];
		focalPoint: User;
		delegates: User[];
		association: string;
	}>;
	watch: UseFormWatch<{
		framework: string;
		controls: Association[];
		focalPoint: User;
		delegates: User[];
		association: string;
	}>;
};
const AssociationSelectionList = ({
	control,
	associations,
	setValue,
	watch
}: AssociationSelectionListProps) => {
	const { t } = useTranslation(['changeMonitoring', 'evidenceRequest']);
	const [selectedAss, setSelectedAss] = useState('');

	useEffect(() => {
		setValue('association', selectedAss);
	}, [selectedAss, setValue]);

	return (
		<StructuredListWrapper selection ariaLabel='Structured list'>
			<StructuredListHead>
				<StructuredListRow head tabIndex={0}>
					<StructuredListCell head>
						{t('changeMonitoring:association-name')}
					</StructuredListCell>
					<StructuredListCell head>Focal Point</StructuredListCell>
					<StructuredListCell head>
						{t('evidenceRequest:focal-point-delegates')}
					</StructuredListCell>
					<StructuredListCell head />
				</StructuredListRow>
			</StructuredListHead>
			<StructuredListBody>
				<StructuredListRow tabIndex={0} key='free-association'>
					<StructuredListCell onClick={() => setSelectedAss('FREE')} className='italic'>
						{t('changeMonitoring:free-selection')}
					</StructuredListCell>
					<StructuredListCell
						onClick={() => setSelectedAss('FREE')}
						noWrap
						className='space-x-4'
					>
						<SingleUserSelect
							control={control}
							label=''
							level={3}
							hideLabel
							name='focalPoint'
							excludedUsers={watch('delegates')}
						/>
					</StructuredListCell>
					<StructuredListCell onClick={() => setSelectedAss('FREE')} noWrap>
						<MultipleUserSelect
							control={control}
							label='delegates'
							hideLabel
							level={3}
							name='delegates'
							excludedUser={watch('focalPoint')}
						/>
					</StructuredListCell>
					<StructuredListInput
						id='selection-free-association'
						value='selection-free-association'
						title='selection-free-association'
						name='selection-free-association'
						onClick={() => setSelectedAss('FREE')}
					/>
					<StructuredListCell onClick={() => setSelectedAss('FREE')}>
						{(selectedAss === 'FREE' || !selectedAss) && (
							<CheckmarkFilled
								aria-label='select an option'
								title={t('changeMonitoring:select-an-option')}
							/>
						)}
					</StructuredListCell>
				</StructuredListRow>
				{associations.map(association => (
					<StructuredListRow tabIndex={0} key={association.id}>
						<StructuredListCell
							onClick={() => {
								setSelectedAss(association.id);
							}}
						>
							{association.name}
						</StructuredListCell>
						<StructuredListCell
							onClick={() => setSelectedAss(association.id)}
							className='space-x-4'
							noWrap
						>
							<UserProfileImage
								initials={association.reviewer?.displayName}
								imageDescription={association.reviewer?.username}
								tooltipText={association.reviewer?.displayName}
								size='lg'
							/>
							<span>{association.reviewer?.displayName}</span>
						</StructuredListCell>
						<StructuredListCell onClick={() => setSelectedAss(association.id)}>
							{association.delegates?.length
								? association.delegates?.map(del => (
										<UserProfileImage
											initials={del.displayName}
											imageDescription={del.username}
											size='lg'
											tooltipText={del?.displayName}
										/>
								  ))
								: t('evidenceRequest:no-delegates')}
						</StructuredListCell>
						<StructuredListInput
							onClick={() => setSelectedAss(association.id)}
							id={`association-${association.id}`}
							value={`association-${association.id}`}
							title={`association-${association.name}`}
							name={`association-${association.name}`}
						/>
						<StructuredListCell onClick={() => setSelectedAss(association.id)}>
							{selectedAss === association.id && (
								<CheckmarkFilled
									aria-label='select an option'
									onClick={() => setSelectedAss(association.id)}
								>
									<title>{t('changeMonitoring:select-an-option')}</title>
								</CheckmarkFilled>
							)}
						</StructuredListCell>
					</StructuredListRow>
				))}
			</StructuredListBody>
		</StructuredListWrapper>
	);
};
export default AssociationSelectionList;
