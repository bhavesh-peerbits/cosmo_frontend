import useAddAnswerToReview from '@api/user-revalidation/useAddAnswerToReview';
import {
	ComposedModal,
	Form,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	FileUploaderDropContainer
} from '@carbon/react';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';

type AddUserModalProps = {
	isOpen: boolean;
	setIsOpen: (val: boolean) => void;
};

const TestModal = ({ isOpen, setIsOpen }: AddUserModalProps) => {
	const formFile = useRef<HTMLFormElement>();
	const formData = new FormData(formFile.current);
	const { handleSubmit } = useForm({
		mode: 'onChange'
	});
	const { mutate: mutateAddAnswer } = useAddAnswerToReview();
	const cleanUp = () => {
		setIsOpen(false);
	};
	const addAnswer = () => {
		// const file = document.getElementById('upload') as HTMLInputElement;

		// const choosenFile = file.files[0]
		// formData.append('file', choosenFile); // TODO rimuovere commenti, commentato per pushare senza errori
		return mutateAddAnswer({
			reviewId: '1',
			file: formData
		});
	};
	return (
		<ComposedModal size='sm' open={isOpen} onClose={cleanUp}>
			<Form id='prova' onSubmit={handleSubmit(addAnswer)}>
				<ModalHeader title='prova' closeModal={cleanUp}>
					<span className='text-text-secondary text-body-1'>prova</span>
				</ModalHeader>
				<ModalBody hasForm>
					<FileUploaderDropContainer
						labelText='prova'
						// accept={['.csv']}
						className='w-full'
						id='upload'
						// ref={formFile} // TODO rimuovere commento, commentato per pushare senza errori
					/>
				</ModalBody>

				<ModalFooter>
					<Button kind='secondary' onClick={cleanUp}>
						prova
					</Button>
					<Button kind='primary' type='submit'>
						prova
					</Button>
				</ModalFooter>
			</Form>
		</ComposedModal>
	);
};
export default TestModal;
