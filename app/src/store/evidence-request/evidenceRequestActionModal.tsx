import EnumActionEvidenceRequestApprove from '@model/EvidenceRequest/EnumActionEvidenceRequestApprove';
import { atom } from 'recoil';

const evidenceRequestActionModal = atom<EnumActionEvidenceRequestApprove>({
	key: 'evidenceRequestActionModal',
	default: 'approve'
});

export default evidenceRequestActionModal;
