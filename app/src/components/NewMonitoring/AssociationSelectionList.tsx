import {
	StructuredListCell,
	StructuredListBody,
	StructuredListRow,
	StructuredListWrapper,
	StructuredListHead,
	StructuredListInput
} from '@carbon/react';
import { CheckmarkFilled } from '@carbon/react/icons';
import UserProfileImage from '@components/UserProfileImage';
import Association from '@model/Association';
import { useTranslation } from 'react-i18next';

type AssociationSelectionListProps = {
	associations: Association[];
};
const AssociationSelectionList = ({ associations }: AssociationSelectionListProps) => {
	const { t } = useTranslation(['changeMonitoring', 'evidenceRequest']);
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
				{associations.map(association => (
					<StructuredListRow tabIndex={0} key={association.id}>
						<StructuredListCell>{association.name}</StructuredListCell>
						<StructuredListCell className='space-x-4'>
							<UserProfileImage
								initials={association.reviewer?.displayName}
								imageDescription={association.reviewer?.username}
								tooltipText={association.reviewer?.displayName}
								size='lg'
							/>
							<span>{association.reviewer?.displayName}</span>
						</StructuredListCell>
						<StructuredListCell>
							{association.delegates?.map(del => (
								<UserProfileImage
									initials={del.displayName}
									imageDescription={del.username}
									size='lg'
									tooltipText={del?.displayName}
								/>
							))}
						</StructuredListCell>
						<StructuredListInput
							id='row-1'
							value='row-1'
							title='row-1'
							name='row-1'
							defaultChecked
						/>
						<StructuredListCell>
							<CheckmarkFilled
								className='cds--structured-list-svg'
								aria-label='select an option'
							>
								<title>select an option</title>
							</CheckmarkFilled>
						</StructuredListCell>
					</StructuredListRow>
				))}
			</StructuredListBody>
		</StructuredListWrapper>
	);
};
export default AssociationSelectionList;
