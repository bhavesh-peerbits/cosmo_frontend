import { Button, Form, Grid, Tile, TextArea, TextInput } from '@carbon/react';
import { TrashCan } from '@carbon/react/icons';
import FullWidthColumn from '@components/FullWidthColumn';

import InstanceAsset from '@model/InstanceAsset';

type ApplicationInstanceFormProps = {
	instance: InstanceAsset;
};
const ApplicationInstanceForm = ({ instance }: ApplicationInstanceFormProps) => {
	return (
		<Tile href={`${instance.instance?.id}`} className='w-full bg-background'>
			<Form>
				<Grid fullWidth>
					<FullWidthColumn
						data-toc-id={`instance-container-${instance.instance?.id}`}
						data-toc-title={instance.instance?.name}
						className='flex items-center justify-between text-fluid-heading-3'
					>
						{instance.instance?.name}
						<Button
							hasIconOnly
							kind='ghost'
							renderIcon={TrashCan}
							tooltipPosition='bottom'
						/>
					</FullWidthColumn>

					<FullWidthColumn>
						<Grid fullWidth>
							<FullWidthColumn className='mb-5'>
								<TextInput
									id={`${instance.instance?.id}-input-name`}
									labelText='Nome Istanza'
								/>
							</FullWidthColumn>
							<FullWidthColumn className='mb-5'>
								<TextArea labelText='NOTA' />
							</FullWidthColumn>
							<FullWidthColumn className='mb-5'>
								here goes assets container
							</FullWidthColumn>
						</Grid>
					</FullWidthColumn>
				</Grid>
			</Form>
		</Tile>
	);
};
export default ApplicationInstanceForm;
