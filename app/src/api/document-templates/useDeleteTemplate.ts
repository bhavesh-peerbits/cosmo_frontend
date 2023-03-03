/* eslint-disable prettier/prettier */
import api from '@api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface DeleteTemplateParams {
	templateId: number;
}

const deleteTemplate = ({ templateId }: DeleteTemplateParams) => {
	return api.documentTemplateControllerApi.deleteDocumentTemplate({ id: +templateId });
};

const useDeleteTemplate = () => {
	const queryClient = useQueryClient();
	return useMutation(deleteTemplate, {
		onSuccess: (_data, params) => {
			queryClient.invalidateQueries(['all-document-templates']);
			queryClient.removeQueries(['template', params.templateId]);
		}
	});
};

export default useDeleteTemplate;
