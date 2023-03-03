/* eslint-disable prettier/prettier */
import api from '@api';
import { useQuery } from '@tanstack/react-query';
import { fromDocumentationTemplatesApi } from '@model/Administration/DocumentTemplates';

const getAllTemplates = () => {
	return api.documentTemplateControllerApi
		.getAllDocumentTemplates()
		.then(({ data }) => (data ? data.content?.map(fromDocumentationTemplatesApi) : []));
};

export default () => useQuery(['all-document-templates'], getAllTemplates);
