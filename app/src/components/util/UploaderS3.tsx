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
import { useRecoilState } from 'recoil';
import { Download } from '@carbon/react/icons';
import usePutASelectionOfFilesOnDraft from '@api/uploaders3/usePutASelectionOfFileOnDraft';
import useSaveDraft from '@api/evidence-request/useSaveDraft';
import InlineLoadingStatus from '@components/InlineLoadingStatus';
import ApiError from '@api/ApiError';

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
	const { t } = useTranslation('uploaderS3');
	const [closeUploadInfo, setCloseUploadInfo] = useRecoilState(
		evidenceRequestUploaderStore
	);
	// const requestDraft = useRecoilValue(evidenceRequestDraftStore);
	const [deleteInfo, setDeleteInfo] = useState<{
		isOpen: boolean;
		fileId: string | undefined;
		stepId: string | undefined;
		draftId: string | undefined;
		files: FileLink[] | undefined;
	}>({
		isOpen: false,
		fileId: undefined,
		stepId: undefined,
		draftId: undefined,
		files: alreadyUploaded
	});
	useEffect(
		() =>
			setDeleteInfo(old => ({
				...old,
				files: alreadyUploaded
			})),
		[alreadyUploaded]
	);

	const { mutate, isLoading, isError, error, isSuccess } = usePutASelectionOfFiles();
	const {
		mutate: mutateDraft,
		isLoading: isLoadingDraft,
		isError: isErrorDraft,
		error: errorDraft,
		isSuccess: isSuccessDraft
	} = usePutASelectionOfFilesOnDraft();
	const {
		isError: isErrorSaveDraft,
		error: errorSaveDraft,
		isLoading: isLoadingSaveDraft,
		isSuccess: isSuccessSaveDraft
	} = useSaveDraft();

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
		[setCloseUploadInfo, reset, closeUploadInfo.saveUpload]
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
					onSuccess: (data: FileLink[]) => {
						setCloseUploadInfo(old => ({
							...old,
							saveUpload: false,
							uploadSuccess: true,
							files: data
						}));
						const fileList: FileLink[] = [];
						deleteInfo.files?.forEach(file => fileList.push(file));
						data.forEach(file => fileList.push(file));

						setDeleteInfo(old => ({ ...old, files: fileList }));
						// mutateSaveDraft(
						// 	{
						// 		...requestDraft,
						// 		fileLinks:
						// 			requestDraft.fileLinks && deleteInfo.files
						// 				? [...requestDraft.fileLinks, ...data]
						// 				: data
						// 	},
						// 	{
						// 		onSuccess: () => {
						// 			setCloseUploadInfo(old => ({ ...old, uploadSuccess: false }));
						// 		}
						// 	}
						// );
						reset({ files: [] });
					},
					onError: () => {
						setCloseUploadInfo(old => ({
							...old,
							saveUpload: false,
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
		deleteInfo.files,
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
			<div className='space-y-5' id={`uploader__file__${label}`}>
				{deleteInfo.files && deleteInfo.files?.length > 0 ? (
					<div className='space-y-3'>
						<div className='text-body-compact-1'>{t('already-uploaded')}:</div>
						<div className='space-x-3'>
							{deleteInfo.files.map(file => (
								<Tag
									key={file.id}
									filter
									size='md'
									type='outline'
									className='bg-layer-2'
									onClose={() => {
										setDeleteInfo(old => ({
											...old,
											isOpen: true,
											fileId: file.id,
											stepId: additionalInfo?.stepId,
											draftId: additionalInfo?.draftId
										}));
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
					</div>
				) : null}
				<Form>
					<div className='space-y-5'>
						<div className='space-y-3'>
							<div className='text-heading-compact-1'>{t('upload-file')}</div>
							<FileUploaderDropContainer
								labelText={label}
								className='w-full'
								onAddFiles={(e, { addedFiles }) => {
									files.push(addedFiles[0]);
									onChange(files);
								}}
							/>
						</div>
						<div className='max-h-[160px] max-w-[20rem] space-y-3 overflow-y-auto'>
							{files?.map((file, index) => (
								<div className='' key={`${file.name}`}>
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
						<InlineLoadingStatus
							{...{
								isLoading: isLoading || isLoadingDraft || isLoadingSaveDraft,
								isSuccess: isSuccess || isSuccessDraft || isSuccessSaveDraft,
								isError: isError || isErrorDraft || isErrorSaveDraft,
								error: (error || errorDraft || errorSaveDraft) as ApiError
							}}
						/>
					</div>
				</Form>
			</div>
			<DeleteFileS3Modal deleteInfo={deleteInfo} setDeleteInfo={setDeleteInfo} />
		</>
	);
};

export default UploaderS3;
