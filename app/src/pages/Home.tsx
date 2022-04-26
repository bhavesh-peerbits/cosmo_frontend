import LanguagePrompt from '@components/LanguagePrompt';
import usePolicyStore from '@hooks/usePolicyStore';
import Centered from '@components/Centered';
import Fade from '@components/Fade';
import { Button, ButtonSet } from '@carbon/react';
import { Link } from 'react-router-dom';

const Home = () => {
	// const { t } = useTranslation();
	// const { setTheme } = useUiStore();
	const { canCreateReport } = usePolicyStore();

	return (
		<div className='flex h-full flex-col'>
			<LanguagePrompt />
			<div>USER CAN CREATE REPORT? {canCreateReport ? 'YES' : 'NO'}</div>

			<Fade>
				<Centered>
					<div className='m-auto flex flex-col justify-around space-y-container-2 bg-layer-2 p-container-5'>
						<h2 className='text-productive-heading-5'>Welcome in Cosmo</h2>
						<p className='text-body-short-2'>
							Navigate in the following section to start
						</p>
						<div className='w-1/2'>
							<ButtonSet>
								<Button as={Link} to='/management'>
									Management
								</Button>
								<Button kind='secondary' className='bg-layer-3'>
									Reports
								</Button>
							</ButtonSet>
						</div>
					</div>
				</Centered>
			</Fade>
			{/* 	<h2 className='my-8 text-heading-2'>{t('home:purpose')}</h2> */}
			{/* 	<Button onClick={() => setTheme(val => (val === 'g100' ? 'white' : 'g100'))}> */}
			{/* 		Change Theme */}
			{/* 	</Button> */}
			{/* 	<h1 data-testid='title' className='my-4 capitalize'> */}
			{/* 		{t('test:test-string')} */}
			{/* 	</h1> */}
			{/* 	<p style={{ lineHeight: '20px' }}> */}
			{/* 		The shell is perhaps the most crucial piece of any UI built with Carbon. It */}
			{/* 		contains the shared navigation framework for the entire design system and ties */}
			{/* 		the products in IBM’s portfolio together in a cohesive and elegant way. The */}
			{/* 		shell is the home of the topmost navigation, where users can quickly and */}
			{/* 		dependably gain their bearings and move between pages. */}
			{/* 		<br /> */}
			{/* 		<br /> */}
			{/* 		The shell was designed with maximum flexibility built in, to serve the needs of */}
			{/* 		a broad range of products and users. Adopting the shell ensures compliance with */}
			{/* 		IBM design standards, simplifies development efforts, and provides great user */}
			{/* 		experiences. All IBM products built with Carbon are required to use the shell’s */}
			{/* 		header. */}
			{/* 		<br /> */}
			{/* 		<br /> */}
			{/* 		To better understand the purpose and function of the UI shell, consider the */}
			{/* 		“shell” of MacOS, which contains the Apple menu, top-level navigation, and */}
			{/* 		universal, OS-level controls at the top of the screen, as well as a universal */}
			{/* 		dock along the bottom or side of the screen. The Carbon UI shell is roughly */}
			{/* 		analogous in function to these parts of the Mac UI. For example, the app */}
			{/* 		switcher portion of the shell can be compared to the dock in MacOS. */}
			{/* 	</p> */}
			{/* 	<h2 */}
			{/* 		style={{ */}
			{/* 			fontWeight: '800', */}
			{/* 			margin: '30px 0', */}
			{/* 			fontSize: '20px' */}
			{/* 		}} */}
			{/* 	> */}
			{/* 		Header responsive behavior */}
			{/* 	</h2> */}
			{/* 	<p style={{ lineHeight: '20px' }}> */}
			{/* 		As a header scales down to fit smaller screen sizes, headers with persistent */}
			{/* 		side nav menus should have the side nav collapse into “hamburger” menu. See the */}
			{/* 		example to better understand responsive behavior of the header. */}
			{/* 	</p> */}
			{/* 	<h2 */}
			{/* 		style={{ */}
			{/* 			fontWeight: '800', */}
			{/* 			margin: '30px 0', */}
			{/* 			fontSize: '20px' */}
			{/* 		}} */}
			{/* 	> */}
			{/* 		Secondary navigation */}
			{/* 	</h2> */}
			{/* 	<p style={{ lineHeight: '20px' }}> */}
			{/* 		The side-nav contains secondary navigation and fits below the header. It can be */}
			{/* 		configured to be either fixed-width or flexible, with only one level of nested */}
			{/* 		items allowed. Both links and category lists can be used in the side-nav and may */}
			{/* 		be mixed together. There are several configurations of the side-nav, but only */}
			{/* 		one configuration should be used per product section. If tabs are needed on a */}
			{/* 		page when using a side-nav, then the tabs are secondary in hierarchy to the */}
			{/* 		side-nav. */}
			{/* 	</p> */}
		</div>
	);
};
export default Home;
