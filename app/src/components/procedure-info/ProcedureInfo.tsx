import { Button, Grid } from '@carbon/react';
import { Add, Email } from '@carbon/react/icons';
import { useRef, useState } from 'react';
import TableOfContents from '@components/TableOfContents';
import useBreadcrumbSize from '@hooks/useBreadcrumbSize';
import FullWidthColumn from '@components/FullWidthColumn';
import useGetProcedureByApp from '@api/procedures/useGetProcedureByApp';
import { useParams } from 'react-router-dom';
import ProcedureForm from '@components/procedure-info/ProcedureForm';
import NoDataMessage from '@components/NoDataMessage';
import ProcedureAppInstance from '@model/ProcedureAppInstance';
import NewProcedureModal from '../Modals/NewProcedureModal';
import MultipleReviewModal from '../Modals/MultipleReviewModal';

type ProcedureState = Partial<ProcedureAppInstance> & {
	procedure: ProcedureAppInstance['procedure'];
	id: string;
	isNew?: boolean;
};

const ProcedureInfo = () => {
	const { appId } = useParams();
	const { data: serverProcs = [] } = useGetProcedureByApp(appId);
	const { breadcrumbSize } = useBreadcrumbSize();

	const [procedureList, setProcedureList] = useState<ProcedureState[]>(serverProcs);
	const [isNewProcedureOpen, setIsNewProcedureOpen] = useState(false);
	const [isCheckboxView, setIsCheckboxView] = useState(false);
	const [showProcedureModal, setShowProcedureModal] = useState(false);
	const [procedureChecked, setProcedureChecked] = useState<string[]>([]);
	const [totalSelected, setTotalSelected] = useState(0);
	const buttonRef = useRef<HTMLDivElement>(null);

	return (
		<TableOfContents
			isCheckView={isCheckboxView}
			setChecked={setProcedureChecked}
			checked={procedureChecked}
			stickyOffset={buttonRef.current?.getBoundingClientRect()?.height || 0}
			tocStickyOffset={breadcrumbSize * 2}
		>
			<Grid fullWidth className='h-full'>
				<FullWidthColumn className='pt-4'>
					<div className='space-y-4'>
						<div
							className='flex w-full flex-wrap items-center md:space-x-4'
							ref={buttonRef}
						>
							<Button
								size='md'
								renderIcon={Add}
								className='md:max-w-auto w-full max-w-full md:w-auto'
								onClick={() => setIsNewProcedureOpen(true)}
								disabled={isCheckboxView}
							>
								New Procedure
							</Button>
							<NewProcedureModal
								isOpen={isNewProcedureOpen}
								setIsOpen={setIsNewProcedureOpen}
								onSuccess={(prc, appProc) =>
									setProcedureList(old => [
										...old,
										{
											...appProc,
											id: `${Math.random() * 10000}`,
											title: prc.name,
											procedure: prc,
											name: appProc?.name || '',
											isNew: true
										}
									])
								}
							/>
							<Button
								kind={isCheckboxView ? 'primary' : 'tertiary'}
								size='md'
								className='md:max-w-auto w-full max-w-full md:w-auto'
								renderIcon={Email}
								disabled={
									procedureList.length === 0 || (isCheckboxView && totalSelected === 0)
								}
								onClick={
									isCheckboxView
										? () => setShowProcedureModal(true)
										: () => setIsCheckboxView(true)
								}
							>
								Review
							</Button>
							{isCheckboxView && (
								<Button
									kind='secondary'
									size='md'
									className='md:max-w-auto w-full max-w-full md:w-auto'
									onClick={() => {
										setIsCheckboxView(false);
										setTotalSelected(0);
									}}
								>
									Cancel
								</Button>
							)}
						</div>
						{showProcedureModal && (
							<MultipleReviewModal
								isOpen={showProcedureModal}
								setIsOpen={setShowProcedureModal}
								type='procedure'
								totalSelected={totalSelected}
							/>
						)}
						<div className='space-y-7'>
							{procedureList.length === 0 && (
								<div>
									<NoDataMessage
										className='mt-10 p-5'
										title='No Procedures'
										subtitle='Add a new one using the relative button'
									/>
								</div>
							)}
							{procedureList.map(procedure => (
								<ProcedureForm
									key={procedure.id}
									procedure={procedure}
									isNew={procedure.isNew}
									appId={appId as string}
								/>
							))}
						</div>
					</div>
				</FullWidthColumn>
			</Grid>
		</TableOfContents>
	);
};
export default ProcedureInfo;
