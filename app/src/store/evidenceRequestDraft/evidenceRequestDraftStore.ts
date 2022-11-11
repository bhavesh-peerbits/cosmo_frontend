import EvidenceRequestDraft from '@model/EvidenceRequestDraft';
import { atom } from 'recoil';

const evidenceRequestDraftStore = atom<EvidenceRequestDraft>({
	key: 'evidenceRequestDraftStore',
	default: undefined
	// dangerouslyAllowMutability: true
});

export default evidenceRequestDraftStore;
