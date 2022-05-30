import { Button, Grid } from '@carbon/react';
import { Add, Email } from '@carbon/react/icons';
import { useEffect, useMemo, useRef, useState } from 'react';
import TableOfContents from '@components/TableOfContents';
import useBreadcrumbSize from '@hooks/useBreadcrumbSize';
import FullWidthColumn from '@components/FullWidthColumn';
import { useParams } from 'react-router-dom';
import ProcedureForm from '@components/procedure-info/ProcedureForm';
import NoDataMessage from '@components/NoDataMessage';
import ProcedureAppInstance from '@model/ProcedureAppInstance';
import useGetProcedureByApp from '@api/app-procedures/useGetProcedureByApp';
import NewProcedureModal from '../Modals/NewProcedureModal';

type ProcedureState = Partial<ProcedureAppInstance> & {
	id: string;
	procedureId: string;
	isNew?: boolean;
};

const ProcedureInfo = () => {
	const { appId } = useParams();
	const { data = new Map<string, ProcedureAppInstance>() } = useGetProcedureByApp(appId);
	const { breadcrumbSize } = useBreadcrumbSize();
	const serverProcs = useMemo(() => [...data.values()], [data]);
	const [procedureList, setProcedureList] = useState<ProcedureState[]>(serverProcs);
	const [isNewProcedureOpen, setIsNewProcedureOpen] = useState(false);
	const [isCheckboxView, setIsCheckboxView] = useState(false);
	const [showProcedureModal, setShowProcedureModal] = useState(false);
	const [procedureChecked, setProcedureChecked] = useState<string[]>([]);
	const buttonRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setProcedureList(old => {
			const p = old.findIndex(proc => proc.isNew);
			if (p !== -1) {
				return old.splice(p, 1, serverProcs[p]);
			}
			return serverProcs;
		});
	}, [serverProcs]);

	const somethingNew = procedureList.some(p => p.isNew);

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
								disabled={isCheckboxView || somethingNew}
							>
								New Procedure
							</Button>
							<NewProcedureModal
								isOpen={isNewProcedureOpen}
								setIsOpen={setIsNewProcedureOpen}
								procedureApps={[...data.values()]}
								onSuccess={(prc, appProc) =>
									setProcedureList(old => [
										...old,
										{
											...appProc,
											id: `${Math.random() * 10000}`,
											title: prc.name,
											procedureId: prc.id,
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
									procedureList.length === 0 ||
									somethingNew ||
									(isCheckboxView && procedureChecked.length === 0)
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
										setProcedureChecked([]);
									}}
								>
									Cancel
								</Button>
							)}
						</div>
						{showProcedureModal && (
							<div />

							// <MultipleReviewModal
							// 	isOpen={showProcedureModal}
							// 	setIsOpen={setShowProcedureModal}
							// 	type='procedure'
							// /> // TODO fix modal for procedure type
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
									procedureApp={procedure}
									isNew={procedure.isNew}
									appId={appId as string}
									onDelete={() =>
										setProcedureList(old => old.filter(o => o.id !== procedure.id))
									}
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
