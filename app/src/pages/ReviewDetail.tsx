import PageHeader from '@components/PageHeader';
import { Control, FieldErrors, useForm, UseFormRegister } from 'react-hook-form';
import GeneralInfoReview, {
	GeneralInfoForm
} from '@components/ReviewNarrative/GeneralInfoReview';
import { Grid, Tile } from '@carbon/react';
import FullWidthColumn from '@components/FullWidthColumn';

type ApplicationForm = GeneralInfoForm;
const ReviewDetail = () => {
	const {
		register,
		control,
		formState: { errors }
	} = useForm<ApplicationForm>({
		mode: 'onSubmit'
	});
	return (
		<PageHeader
			pageTitle='Name'
			intermediateRoutes={[{ name: 'Review', to: '/review-narrative' }]}
		>
			<Grid fullWidth className='h-full pb-4 pr-4'>
				<FullWidthColumn className='pt-4'>
					<div className='space-y-7'>
						<Tile className='w-full bg-background pb-7'>
							<Grid>
								<FullWidthColumn>
									<GeneralInfoReview
										control={control as unknown as Control<GeneralInfoForm>}
										errors={errors as FieldErrors<GeneralInfoForm>}
										register={register as unknown as UseFormRegister<GeneralInfoForm>}
									/>
								</FullWidthColumn>
							</Grid>
						</Tile>
					</div>
				</FullWidthColumn>
			</Grid>
		</PageHeader>
	);
};

export default ReviewDetail;
