import { Grid, Column, Theme, Button } from '@carbon/react';
import { Add } from '@carbon/react/icons';
import 'style/app.scss';
import useGetExample from '@api/useGetExample';

function App() {
	const { isLoading, data } = useGetExample();
	// eslint-disable-next-line no-console
	console.log(isLoading, data);

	return (
		<Theme theme='g100' className='h-full'>
			<Grid className='h-full bg-gray-900 text-white'>
				<Column>1/4</Column>
				<Column>1/4</Column>
				<Column>1/4</Column>
				<Column>1/4</Column>
				<Column>1/4</Column>
				<Column>
					<Add />
				</Column>
				<Column className='bg-red-150' sm={3} md={1} lg={4}>
					<p>Small: Span 0 of 4</p>
					<p>Medium: Span 0 of 8</p>
					<Grid condensed>
						<div>
							<Button>Butt</Button>
						</div>
						<div>TEST</div>
					</Grid>
				</Column>
			</Grid>
		</Theme>
	);
}

export default App;
