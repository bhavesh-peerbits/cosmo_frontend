import {
	Column,
	Grid,
	TextArea,
	TextInput,
	Layer,
	NumberInput,
	Tile
} from '@carbon/react';
import { UseFormRegister } from 'react-hook-form';
import FullWidthColumn from '@components/FullWidthColumn';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export interface ChapterInfoForm {
	chapters: [
		{
			chapterTitle: string;
			chapterDescription: string;
		}
	];
}

interface ChapterInfoProps {
	register: UseFormRegister<ChapterInfoForm>;
}

const ChaptersInfo = ({ register }: ChapterInfoProps) => {
	const { t } = useTranslation('documentationAdmin');
	const [stepsArr, setStepsArr] = useState([
		{ chapterTitle: '', chapterDescription: '' }
	]);
	const [isStateChanged, setIsStateChanged] = useState(false);

	const handleAddSteps = (value: number, direction: string) => {
		if (direction === 'up') {
			stepsArr.push({ chapterTitle: '', chapterDescription: '' });
		} else {
			stepsArr.pop();
		}
		setIsStateChanged(!isStateChanged);
	};

	const handleChangeInput = (index: number, field: string, value: string) => {
		const updateChapters = [...stepsArr];
		if (field === 'chapterTitle') {
			updateChapters[index].chapterTitle = value;
		}

		if (field === 'chapterDescription') {
			updateChapters[index].chapterDescription = value;
		}
		setStepsArr(updateChapters);
	};

	return (
		<Layer>
			<Grid fullWidth>
				<Column sm={4} md={8} lg={8} className='mb-5 '>
					<NumberInput
						id='approver-total-steps'
						size='md'
						min={0}
						value={1}
						label='approver'
						onChange={(e, { value, direction }) =>
							handleAddSteps(value as number, direction as string)
						}
					/>
				</Column>

				<FullWidthColumn>
					<Layer className='h-full'>
						{stepsArr?.map((item, index) => {
							return (
								<>
									<Tile id='tile-1'>
										<div className='flex justify-start md:justify-between'>
											<h4 className='mb-5 text-productive-heading-3'>Chapter</h4>
										</div>
										<Column sm={4} md={8} lg={8} className='mb-5'>
											<TextInput
												id='application-servers'
												labelText={t('chapter-name')}
												placeholder={t('chapter-name-placeholder')}
												{...register(`chapters.${index}.chapterTitle`, {
													onChange: e =>
														handleChangeInput(index, 'chapterTitle', e.target?.value)
												})}
											/>
										</Column>
										<Column sm={4} md={8} lg={8} className='mb-5'>
											<TextArea
												className='w-full'
												id='db-servers'
												labelText={t('chapter-description')}
												placeholder={t('chapter-description-placeholder')}
												{...register(`chapters.${index}.chapterDescription`, {
													onChange: e =>
														handleChangeInput(
															index,
															'chapterDescription',
															e.target?.value
														)
												})}
											/>
										</Column>
									</Tile>
									<br />
								</>
							);
						})}
					</Layer>
				</FullWidthColumn>
			</Grid>
		</Layer>
	);
};
export default ChaptersInfo;
