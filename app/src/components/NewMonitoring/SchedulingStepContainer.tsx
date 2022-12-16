import FullWidthColumn from '@components/FullWidthColumn';
import { Select, SelectItem, Layer } from '@carbon/react';

const SchedulingStepContainer = () => {
	return (
		<>
			<FullWidthColumn className='lg:w-1/2'>
				<Layer>
					{' '}
					<Select id='frequency-select'>
						<SelectItem text='c' value='c' />
					</Select>
				</Layer>
			</FullWidthColumn>
			<FullWidthColumn>c</FullWidthColumn>
		</>
	);
};
export default SchedulingStepContainer;
