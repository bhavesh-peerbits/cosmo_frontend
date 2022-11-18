import { Editor, EditorContent, PureEditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';

import { Button, OverflowMenu, OverflowMenuItem } from '@carbon/react';
import {
	ColumnDelete,
	ColumnInsert,
	ListBulleted,
	ListNumbered,
	Paragraph,
	Quotes,
	Redo,
	Row,
	RowDelete,
	RowInsert,
	Table as TableIcon,
	TextBold,
	TextItalic,
	TextStrikethrough,
	TrashCan,
	Undo
} from '@carbon/react/icons';
import '@style/tiptap.scss';
import { forwardRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

type EditorType = {
	editor?: Editor | null;
	disabled?: boolean;
};
const CustomTableCell = TableCell.extend({
	addAttributes() {
		return {
			// extend the existing attributes …
			...this.parent?.(),

			// and add a new one …
			backgroundColor: {
				default: null,
				parseHTML: element => element.getAttribute('data-background-color'),
				renderHTML: attributes => {
					return {
						'data-background-color': attributes.backgroundColor,
						style: `background-color: ${attributes.backgroundColor}`
					};
				}
			}
		};
	}
});

const MenuBar = ({ editor, disabled }: EditorType) => {
	const { t } = useTranslation('tiptapEditor');
	if (!editor || disabled) {
		return null;
	}

	return (
		<div className='flex flex-wrap'>
			<Button
				size='sm'
				hasIconOnly
				renderIcon={TextBold}
				iconDescription={t('bold')}
				kind={editor.isActive('bold') ? 'primary' : 'ghost'}
				onClick={() => editor.chain().focus().toggleBold().run()}
			/>
			<Button
				size='sm'
				hasIconOnly
				renderIcon={TextItalic}
				iconDescription={t('italic')}
				kind={editor.isActive('italic') ? 'primary' : 'ghost'}
				onClick={() => editor.chain().focus().toggleItalic().run()}
			/>
			<Button
				size='sm'
				hasIconOnly
				renderIcon={TextStrikethrough}
				iconDescription={t('strike')}
				kind={editor.isActive('strike') ? 'primary' : 'ghost'}
				onClick={() => editor.chain().focus().toggleStrike().run()}
			/>
			<Button
				size='sm'
				hasIconOnly
				renderIcon={Paragraph}
				iconDescription={t('parapgraph')}
				kind={editor.isActive('paragraph') ? 'primary' : 'ghost'}
				onClick={() => editor.chain().focus().setParagraph().run()}
			/>
			<Button
				size='sm'
				hasIconOnly
				renderIcon={ListBulleted}
				iconDescription={t('bullet')}
				kind={editor.isActive('bulletList') ? 'primary' : 'ghost'}
				onClick={() => editor.chain().focus().toggleBulletList().run()}
			/>
			<Button
				size='sm'
				hasIconOnly
				renderIcon={ListNumbered}
				iconDescription={t('ordered')}
				kind={editor.isActive('orderedList') ? 'primary' : 'ghost'}
				onClick={() => editor.chain().focus().toggleOrderedList().run()}
			/>
			<Button
				size='sm'
				hasIconOnly
				renderIcon={Quotes}
				iconDescription={t('quotes')}
				kind={editor.isActive('blockquote') ? 'primary' : 'ghost'}
				onClick={() => editor.chain().focus().toggleBlockquote().run()}
			/>
			<Button
				size='sm'
				hasIconOnly
				renderIcon={Row}
				iconDescription={t('rule')}
				kind={editor.isActive('Horizontal') ? 'primary' : 'ghost'}
				onClick={() => editor.chain().focus().setHorizontalRule().run()}
			/>
			<Button
				size='sm'
				hasIconOnly
				renderIcon={Undo}
				iconDescription={t('undo')}
				kind='ghost'
				onClick={() => editor.chain().focus().undo().run()}
			/>
			<Button
				size='sm'
				hasIconOnly
				renderIcon={Redo}
				iconDescription={t('redo')}
				kind='ghost'
				onClick={() => editor.chain().focus().redo().run()}
			/>
			<Button
				size='sm'
				hasIconOnly
				renderIcon={TableIcon}
				iconDescription={t('insert-table')}
				kind='ghost'
				onClick={() =>
					editor
						.chain()
						.focus()
						.insertTable({ rows: 3, cols: 3, withHeaderRow: true })
						.run()
				}
			/>

			<OverflowMenu
				className='h-[32px] w-[32px] flex-none'
				ariaLabel='overflow-menu'
				renderIcon={ColumnInsert}
				iconDescription={t('add-column')}
			>
				<OverflowMenuItem
					itemText={t('column-before')}
					onClick={() => editor.chain().focus().addColumnBefore().run()}
					disabled={!editor.can().addColumnBefore()}
				/>
				<OverflowMenuItem
					itemText={t('column-after')}
					onClick={() => editor.chain().focus().addColumnAfter().run()}
					disabled={!editor.can().addColumnAfter()}
				/>
			</OverflowMenu>
			<Button
				size='sm'
				hasIconOnly
				renderIcon={ColumnDelete}
				iconDescription={t('delete-column')}
				kind='ghost'
				onClick={() => editor.chain().focus().deleteColumn().run()}
				disabled={!editor.can().deleteColumn()}
			/>
			<OverflowMenu
				className='h-[32px] w-[32px] flex-none'
				ariaLabel='overflow-menu'
				renderIcon={RowInsert}
				iconDescription={t('add-row')}
			>
				<OverflowMenuItem
					itemText={t('row-before')}
					onClick={() => editor.chain().focus().addRowBefore().run()}
					disabled={!editor.can().addRowBefore()}
				/>
				<OverflowMenuItem
					itemText={t('row-after')}
					onClick={() => editor.chain().focus().addRowAfter().run()}
					disabled={!editor.can().addRowAfter()}
				/>
			</OverflowMenu>
			<Button
				size='sm'
				hasIconOnly
				renderIcon={RowDelete}
				iconDescription={t('delete-row')}
				kind='ghost'
				onClick={() => editor.chain().focus().deleteRow().run()}
				disabled={!editor.can().deleteRow()}
			/>
			<Button
				size='sm'
				hasIconOnly
				renderIcon={TrashCan}
				iconDescription={t('delete-table')}
				kind='ghost'
				onClick={() => editor.chain().focus().deleteTable().run()}
				disabled={!editor.can().deleteTable()}
			/>
		</div>
	);
};

const TipTapEditor = forwardRef<PureEditorContent, TipTapEditorProps>(
	({ content, onChange, onBlur, readOnly, onReset, className }, ref) => {
		const editor = useEditor({
			extensions: [
				StarterKit,
				Table.configure({
					resizable: true
				}),
				TableRow,
				TableHeader,
				CustomTableCell
			],
			content,
			onBlur,
			onUpdate({ editor: e }) {
				onChange(e.getHTML());
			}
		});
		editor?.setEditable(!readOnly);

		useEffect(() => {
			editor?.commands.clearContent();
			editor?.commands.setContent(content || '');
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [onReset]);

		return (
			<div className='divide-y-[1px] divide-solid divide-border-subtle-0 border-[1px] border-solid border-border-strong-3'>
				<div className='bg-layer-1'>
					<MenuBar editor={editor} disabled={readOnly} />
				</div>
				<EditorContent ref={ref} editor={editor} className={className} />
			</div>
		);
	}
);

interface TipTapEditorProps {
	content: string | undefined;
	onChange: (content: string) => void;
	onBlur?: () => void;
	readOnly?: boolean;
	onReset?: boolean;
	className?: string;
}

export default TipTapEditor;
