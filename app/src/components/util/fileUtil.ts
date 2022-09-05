export type AvailableFileType = 'csv' | 'xlsx' | 'pdf';

export function downloadFileViaBlob(
	fileBlob: Blob,
	fileName: string,
	type: AvailableFileType
) {
	if (fileBlob) {
		const dataUrl = URL.createObjectURL(fileBlob);
		const link = document.createElement('a');
		link.download = `${fileName}.${type}`;
		link.href = dataUrl;
		link.click();
	}
}
export default {};
