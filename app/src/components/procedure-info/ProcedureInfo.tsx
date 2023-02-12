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
import useGetProcedures from '@api/procedures/useGetProcedures';
import ProcedureReviewModal from '@components/Modals/ProcedureReviewModal';
import { useTranslation } from 'react-i18next';
import { useResponsive } from 'ahooks';
import { smoothScroll, triggerFocus } from '@components/TableOfContents/utils';
import MultipleReviewModal from '@pages/Narrative/Menagement/Modals/MultipleReviewModal';
import NewProcedureModal from '../Modals/NewProcedureModal';

type ProcedureState = Partial<ProcedureAppInstance> & {
	id: string;
	procedureId: string;
	isNew?: boolean;
	title?: string;
};

const ProcedureInfo = () => {
	const { t } = useTranslation('procedureInfo');
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
	const { md } = useResponsive();
	const { data: procedures = new Map() } = useGetProcedures();

	useEffect(() => {
		setProcedureList(old => {
			const p = old.findIndex(proc => proc.isNew);
			if (p !== -1) {
				old.splice(p, 1, serverProcs[p]);
				return [...old];
			}
			return [...serverProcs];
		});
	}, [serverProcs]);

	const somethingNew = procedureList.some(p => p.isNew);
	const STICKY_OFFSET = useMemo(
		() =>
			md && buttonRef.current && buttonRef.current.getBoundingClientRect()
				? buttonRef.current.getBoundingClientRect().height + breadcrumbSize * 2 - 1
				: buttonRef.current?.getBoundingClientRect()?.height || 0,
		[breadcrumbSize, md]
	);
	return (
		<TableOfContents
			isCheckView={isCheckboxView}
			setChecked={setProcedureChecked}
			checked={procedureChecked}
			stickyOffset={STICKY_OFFSET}
			tocStickyOffset={breadcrumbSize + 48}
		>
			<Grid fullWidth className='h-full pr-3'>
				<FullWidthColumn className='pt-3'>
					<div className='flex flex-col space-y-5'>
						<div
							className='flex w-full flex-wrap items-center bg-layer-1 md:sticky md:z-10  md:space-x-4'
							ref={buttonRef}
							style={{
								top: breadcrumbSize + 48
							}}
						>
							<Button
								size='md'
								renderIcon={Add}
								className='md:max-w-auto w-full max-w-full md:w-auto'
								onClick={() => setIsNewProcedureOpen(true)}
								disabled={isCheckboxView || somethingNew}
							>
								{t('new-procedure')}
							</Button>
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
								{t('review')}
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
									{t('cancel')}
								</Button>
							)}
						</div>
						<NewProcedureModal
							isOpen={isNewProcedureOpen}
							setIsOpen={setIsNewProcedureOpen}
							procedureApps={[...data.values()]}
							onSuccess={(prc, appProc) => {
								const idtmp = Math.random() * 10000;
								setProcedureList(old => [
									...old,
									{
										...appProc,
										id: `${idtmp}`,
										title: prc.name,
										procedureId: prc.id,
										isNew: true
									}
								]);
								setTimeout(() => {
									const selector = `*[data-toc-id="procedure-container-${idtmp}"]`;
									smoothScroll(selector, 230);
									triggerFocus(selector);
								});
							}}
						/>
						{showProcedureModal &&
							(procedureChecked.length === 1 ? (
								<ProcedureReviewModal
									appId={appId || ''}
									isOpen={showProcedureModal}
									setIsOpen={setShowProcedureModal}
									procedure={
										serverProcs.filter(
											proc => `procedure-container-${proc.id}` === procedureChecked[0]
										)[0]
									}
								/>
							) : (
								<MultipleReviewModal
									appId={appId || ''}
									items={procedureChecked
										.map(procedure =>
											serverProcs.filter(
												proc => `procedure-container-${proc.id}` === procedure
											)
										)
										.flat()}
									isOpen={showProcedureModal}
									setIsOpen={setShowProcedureModal}
									type='procedure'
								/>
							))}
						<div className='space-y-7'>
							{procedureList.length === 0 && (
								<div>
									<NoDataMessage
										className='mt-10 p-5'
										title={t('no-procedures')}
										subtitle={t('relative-button')}
									/>
								</div>
							)}
							{procedureList
								.sort(
									(a, b) =>
										procedures.get(a.procedureId).orderNumber -
										procedures.get(b.procedureId).orderNumber
								)
								.map(procedure => (
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
