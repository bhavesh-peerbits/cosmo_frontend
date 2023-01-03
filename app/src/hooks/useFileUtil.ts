import { useCallback } from 'react';

export type AvailableFileType = 'csv' | 'xlsx' | 'pdf';

const useFileUtil = () => {
	const downloadFileViaBlob = useCallback(
		(fileBlob: Blob, fileName: string, type: AvailableFileType) => {
			if (fileBlob) {
				const dataUrl = URL.createObjectURL(fileBlob);
				const link = document.createElement('a');
				link.download = `${fileName}.${type}`;
				link.href = dataUrl;
				link.click();
			}
		},
		[]
	);

	return {
		downloadFileViaBlob
	};
};

export default useFileUtil;
