import {
	StructuredListCell,
	StructuredListBody,
	StructuredListRow,
	StructuredListWrapper,
	StructuredListHead
} from '@carbon/react';

const AssetsList = () => {
	return (
		<StructuredListWrapper>
			<StructuredListHead>
				<StructuredListRow head>
					<StructuredListCell head>Asset</StructuredListCell>
					<StructuredListCell head>Hostname</StructuredListCell>
					<StructuredListCell head>IP</StructuredListCell>
					<StructuredListCell head>Type</StructuredListCell>
					<StructuredListCell head>OS</StructuredListCell>
					<StructuredListCell head>DB</StructuredListCell>
					<StructuredListCell head>CPE</StructuredListCell>
				</StructuredListRow>
			</StructuredListHead>

			<StructuredListBody>
				<StructuredListRow>
					<StructuredListCell noWrap>Row 1</StructuredListCell>
					<StructuredListCell>Row 1</StructuredListCell>
					<StructuredListCell>Row 1</StructuredListCell>
					<StructuredListCell>Row 1</StructuredListCell>
					<StructuredListCell>Row 1</StructuredListCell>
					<StructuredListCell>Row 1</StructuredListCell>
					<StructuredListCell>Row 1</StructuredListCell>
				</StructuredListRow>
			</StructuredListBody>
		</StructuredListWrapper>
	);
};
export default AssetsList;
