import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@api';
import Templates, {
	fromDocumentationTemplatesApi,
	toDocumentationTemplatesApi
} from '@model/Administration/DocumentTemplates';

interface CreateTemplateParams {
	templateData: Templates;
}

const createTemplate = ({ templateData }: CreateTemplateParams) => {
	return api.documentTemplateControllerApi
		.createDocumentTemplate({
			documentTemplateDto: toDocumentationTemplatesApi(templateData)
		})
		.then(({ data }) => fromDocumentationTemplatesApi(data));
};

const useCreateTemplate = () => {
	const queryClient = useQueryClient();
	return useMutation(createTemplate, {
		onSuccess: () => {
			queryClient.invalidateQueries(['all-document-templates']);
		}
	});
};

export default useCreateTemplate;
