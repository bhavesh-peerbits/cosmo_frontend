import {
	StructuredListCell,
	StructuredListBody,
	StructuredListRow,
	StructuredListWrapper,
	StructuredListHead,
	StructuredListInput
} from '@carbon/react';
import { CheckmarkFilled } from '@carbon/react/icons';

const AssociationSelectionList = () => {
	return (
		<StructuredListWrapper selection ariaLabel='Structured list'>
			<StructuredListHead>
				<StructuredListRow head tabIndex={0}>
					<StructuredListCell head>ColumnA</StructuredListCell>
					<StructuredListCell head>ColumnB</StructuredListCell>
					<StructuredListCell head />
				</StructuredListRow>
			</StructuredListHead>
			<StructuredListBody>
				<StructuredListRow tabIndex={0}>
					<StructuredListCell>Row 1</StructuredListCell>
					<StructuredListCell>Row 1</StructuredListCell>
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
				<StructuredListRow tabIndex={0}>
					<StructuredListCell>Row 2</StructuredListCell>
					<StructuredListCell>Row 2</StructuredListCell>
					<StructuredListInput id='row-2' value='row-2' title='row-2' name='row-2' />
					<StructuredListCell>
						<CheckmarkFilled
							className='cds--structured-list-svg'
							aria-label='select an option'
						>
							<title>select an option</title>
						</CheckmarkFilled>
					</StructuredListCell>
				</StructuredListRow>
				<StructuredListRow tabIndex={0}>
					<StructuredListCell>Row 3</StructuredListCell>
					<StructuredListCell>Row 3</StructuredListCell>
					<StructuredListInput id='row-3' value='row-3' title='row-3' name='row-3' />
					<StructuredListCell>
						<CheckmarkFilled
							className='cds--structured-list-svg'
							aria-label='select an option'
						>
							<title>select an option</title>
						</CheckmarkFilled>
					</StructuredListCell>
				</StructuredListRow>
			</StructuredListBody>
		</StructuredListWrapper>
	);
};
export default AssociationSelectionList;
