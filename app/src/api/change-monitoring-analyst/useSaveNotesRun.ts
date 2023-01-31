import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@api';

interface SaveNotesRunParameters {
	notes: string;
	runId: string;
}

const saveNotesRun = ({ notes, runId }: SaveNotesRunParameters) => {
	return api.analystChangeMonitoringControllerApi.saveNotes({
		body: notes,
		runId: +runId
	});
};

const useSaveNotesRun = () => {
	const queryClient = useQueryClient();
	return useMutation(saveNotesRun, {
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries(['run-monitoring', variables.runId]);
		}
	});
};

export default useSaveNotesRun;
