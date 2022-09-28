import { DraftRequestDtoTypeApi, DraftRequestDtoTypeApiEnum } from 'cosmo-api';

export type DraftRequestType = DraftRequestDtoTypeApi;
export type DraftRequestDisplayType = 'Type 1' | 'Type 2' | 'Type 3';

export const mapDraftRequestTypeToDraftRequestDisplayType = (
	draftRequestType: DraftRequestDtoTypeApi
): DraftRequestDisplayType => {
	switch (draftRequestType) {
		case DraftRequestDtoTypeApiEnum.Type1:
			return 'Type 1';
		case DraftRequestDtoTypeApiEnum.Type2:
			return 'Type 2';
		default:
			return 'Type 3';
	}
};
