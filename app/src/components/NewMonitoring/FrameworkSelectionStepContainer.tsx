import FullWidthColumn from '@components/FullWidthColumn';
import { Select, SelectItem, Layer, Tile, Button, FormLabel } from '@carbon/react';
import { Add } from '@carbon/react/icons';
import cx from 'classnames';

const FrameworkSelectionStepContainer = () => {
	return (
		<>
			<FullWidthColumn className='w-1/2'>
				<Layer>
					<Select labelText='Framework' id='framework-selection'>
						<SelectItem text='c' value='c'>
							c
						</SelectItem>
					</Select>
				</Layer>
			</FullWidthColumn>
			<FullWidthColumn className='w-1/2 pt-5'>
				<FormLabel className='mb-3'>
					<span>Leaves</span>{' '}
				</FormLabel>
				<div className='flex w-full items-center'>
					<Tile
						className={cx(
							'relative z-0 flex min-h-[2.5rem] w-full items-center border-b-[1px] border-solid border-border-strong-1 bg-layer-1 p-0'
						)}
					>
						<div className='absolute top-1/2 right-2 -translate-y-1/2'>
							<Button
								kind='ghost'
								renderIcon={() => <Add size={20} />}
								size='sm'
								hasIconOnly
							/>
						</div>
					</Tile>
				</div>
			</FullWidthColumn>
		</>
	);
};
export default FrameworkSelectionStepContainer;
