import EvidenceRequestDraft from '@model/EvidenceRequest/EvidenceRequestDraft';
import { atom } from 'recoil';

const evidenceRequestDraftStore = atom<EvidenceRequestDraft>({
	key: 'evidenceRequestDraftStore',
	default: undefined
	// dangerouslyAllowMutability: true
});

export default evidenceRequestDraftStore;
