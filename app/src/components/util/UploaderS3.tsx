/* eslint-disable no-unsafe-optional-chaining */
import useGetFile from '@api/uploaders3/useGetFile';
import usePutASelectionOfFiles from '@api/uploaders3/usePutASelectionOfFiles';
import { FileUploaderDropContainer, FileUploaderItem, Form, Tag } from '@carbon/react';
import DeleteFileS3Modal from '@components/Modals/DeleteFileS3Modal';
import usePrompt from '@hooks/usePreventNavigatePrompt';
import FileLink, { fromFiletoFileLink } from '@model/FileLink';
import evidenceRequestUploaderStore from '@store/evidence-request/evidenceRequestUploaderStore';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
	FieldPath,
	FieldValues,
	PathValue,
	UnpackNestedValue,
	useController,
	useForm
} from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Download } from '@carbon/react/icons';
import usePutASelectionOfFilesOnDraft from '@api/uploaders3/usePutASelectionOfFileOnDraft';
import evidenceRequestDraftStore from '@store/evidenceRequestDraft/evidenceRequestDraftStore';
import useSaveDraft from '@api/evidence-request/useSaveDraft';

type CosmoFileUploaderProps<
	T extends FieldValues,
	TName extends FieldPath<T>
> = UnpackNestedValue<PathValue<T, TName>> extends File[]
	? {
			label: string;
			alreadyUploaded?: FileLink[];
			parentFormDirty?: boolean;
			additionalInfo?: Record<string, string>;
			path: string;
	  }
	: never;

interface UploaderS3Form {
	files: File[];
}

const UploaderS3 = <T extends FieldValues, TName extends FieldPath<T>>({
	label,
	alreadyUploaded,
	parentFormDirty,
	additionalInfo,
	path
}: CosmoFileUploaderProps<T, TName>) => {
	const { mutate, isLoading } = usePutASelectionOfFiles();
	const { mutate: mutateDraft, isLoading: isLoadingDraft } =
		usePutASelectionOfFilesOnDraft();
	const [closeUploadInfo, setCloseUploadInfo] = useRecoilState(
		evidenceRequestUploaderStore
	);
	const requestDraft = useRecoilValue(evidenceRequestDraftStore);
	const { mutate: mutateSaveDraft } = useSaveDraft();

	const { t } = useTranslation('uploaderS3');
	const [deleteInfo, setDeleteInfo] = useState<{
		isOpen: boolean;
		fileId: string | undefined;
		stepId: string | undefined;
	}>({ isOpen: false, fileId: undefined, stepId: undefined });
	const {
		control,
		reset,
		formState: { isDirty }
	} = useForm<UploaderS3Form>({
		defaultValues: { files: [] }
	});
	const {
		field: { onChange, value: formValue }
	} = useController({
		name: 'files',
		control
	});

	const mutateOptions = useMemo(
		() => ({
			onSuccess: () => {
				setCloseUploadInfo(old => ({
					...old,
					saveUpload: !closeUploadInfo.saveUpload,
					uploadSuccess: true
				}));
				reset({ files: [] });
			},
			onError: () => {
				setCloseUploadInfo(old => ({
					...old,
					saveUpload: !closeUploadInfo.saveUpload,
					uploadSuccess: false
				}));
			}
		}),
		[closeUploadInfo.saveUpload, reset, setCloseUploadInfo]
	);

	usePrompt(t('prevent-close'), isDirty || parentFormDirty);

	const files = formValue as File[];

	const handleSaveFile = useCallback(() => {
		if (files.length === 0 || !closeUploadInfo.saveUpload) {
			setCloseUploadInfo(old => ({ ...old, saveUpload: false }));
			return;
		}
		additionalInfo?.stepId &&
			mutate(
				{
					stepId: +additionalInfo?.stepId,
					fileLinkDtoList: files.map(file => fromFiletoFileLink(file, path)),
					files
				},
				mutateOptions
			);
		additionalInfo?.draftId &&
			mutateDraft(
				{
					draftId: +additionalInfo?.draftId,
					fileLinkDtoList: files.map(file => fromFiletoFileLink(file, path)),
					files
				},
				{
					onSuccess: data => {
						setCloseUploadInfo(old => ({
							...old,
							saveUpload: !closeUploadInfo.saveUpload,
							uploadSuccess: true
						}));
						mutateSaveDraft(
							{
								...requestDraft,
								fileLinks: requestDraft.fileLinks
									? [...requestDraft.fileLinks, ...data]
									: data
							},
							{
								onSuccess: () => {
									setCloseUploadInfo(old => ({ ...old, uploadSuccess: false }));
									// navigate('/new-evidence-request');
								}
							}
						);

						reset({ files: [] });
					},
					onError: () => {
						setCloseUploadInfo(old => ({
							...old,
							saveUpload: !closeUploadInfo.saveUpload,
							uploadSuccess: false
						}));
					}
				}
			);
	}, [
		files,
		closeUploadInfo.saveUpload,
		additionalInfo?.stepId,
		additionalInfo?.draftId,
		mutate,
		mutateOptions,
		mutateDraft,
		setCloseUploadInfo,
		path,
		mutateSaveDraft,
		requestDraft,
		reset
	]);

	const DownloadFile = (fileLink: FileLink) => {
		useGetFile(fileLink.id).then(({ data, headers }) => {
			const fileName =
				headers['content-disposition']
					?.split('filename=')?.[1]
					?.replace(/^"/, '')
					?.replace(/"$/, '') || `${fileLink.name}`;
			const fileBlob = new Blob([data as unknown as BlobPart]);
			const dataUrl = URL.createObjectURL(fileBlob);
			const link = document.createElement('a');
			link.download = fileName;
			link.href = dataUrl;
			link.click();
		});
	};

	useEffect(() => {
		handleSaveFile();
	}, [handleSaveFile, closeUploadInfo.saveUpload]);

	useEffect(
		() =>
			setCloseUploadInfo(old => ({
				...old,
				isLoading: isLoading || isLoadingDraft
			})),
		[isLoading, isLoadingDraft, setCloseUploadInfo]
	);

	useEffect(() => {
		setCloseUploadInfo(old => ({
			...old,
			isDirty
		}));
	}, [isDirty, setCloseUploadInfo]);

	return (
		<>
			<div className='mt-5 space-y-5' id={`uploader__file__${label}`}>
				{alreadyUploaded ? (
					<div>
						<div>{t('already-uploaded')}</div>
						{alreadyUploaded.map(file => (
							<Tag
								filter
								size='md'
								type='outline'
								onClose={() => {
									setDeleteInfo({
										isOpen: true,
										fileId: file.id,
										stepId: additionalInfo?.stepId
									});
								}}
							>
								<div className=''>
									<button
										type='button'
										className='flex space-x-2'
										onClick={() => DownloadFile(file)}
									>
										<Download />
										<span className='text-link-primary hover:text-link-primary-hover hover:underline'>
											{file.name}
										</span>
									</button>
								</div>
							</Tag>
						))}
					</div>
				) : null}
				<Form>
					<div className=' space-y-5'>
						<div>{t('upload-file')}</div>
						<FileUploaderDropContainer
							labelText={label}
							className='w-full'
							onAddFiles={(e, { addedFiles }) => {
								files.push(addedFiles[0]);
								onChange(files);
							}}
						/>
						<div className='mt-2 max-h-[160px] max-w-[20rem] overflow-y-auto'>
							{files?.map((file, index) => (
								<div className='mt-2' key={`${file.name}`}>
									<FileUploaderItem
										name={file.name}
										onDelete={() => {
											files.length > 1
												? onChange(files.filter((_, i) => i !== index))
												: onChange([]);
										}}
										errorSubject='File not valid'
										status='edit'
									/>
								</div>
							))}
						</div>
					</div>
				</Form>
			</div>
			<DeleteFileS3Modal deleteInfo={deleteInfo} setDeleteInfo={setDeleteInfo} />
		</>
	);
};

export default UploaderS3;
