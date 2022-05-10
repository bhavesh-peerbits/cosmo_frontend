import { Editor, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';

import { Button, OverflowMenu, OverflowMenuItem } from '@carbon/react';
import '../../style/tiptap.scss';
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

type EditorType = {
	editor?: Editor | null;
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

const MenuBar = ({ editor }: EditorType) => {
	if (!editor) {
		return null;
	}

	return (
		<div className='flex flex-wrap'>
			<Button
				size='sm'
				hasIconOnly
				renderIcon={TextBold}
				iconDescription='Bold'
				kind={editor.isActive('bold') ? 'primary' : 'ghost'}
				onClick={() => editor.chain().focus().toggleBold().run()}
			/>
			<Button
				size='sm'
				hasIconOnly
				renderIcon={TextItalic}
				iconDescription='Italic'
				kind={editor.isActive('italic') ? 'primary' : 'ghost'}
				onClick={() => editor.chain().focus().toggleItalic().run()}
			/>
			<Button
				size='sm'
				hasIconOnly
				renderIcon={TextStrikethrough}
				iconDescription='Strike'
				kind={editor.isActive('strike') ? 'primary' : 'ghost'}
				onClick={() => editor.chain().focus().toggleStrike().run()}
			/>
			<Button
				size='sm'
				hasIconOnly
				renderIcon={Paragraph}
				iconDescription='Paragraph'
				kind={editor.isActive('paragraph') ? 'primary' : 'ghost'}
				onClick={() => editor.chain().focus().setParagraph().run()}
			/>
			<Button
				className='text-text-primary'
				size='sm'
				hasIconOnly
				iconDescription='Heading 1'
				kind={editor.isActive('heading', { level: 1 }) ? 'primary' : 'ghost'}
				onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
			>
				h1
			</Button>
			<Button
				className='text-text-primary'
				size='sm'
				hasIconOnly
				iconDescription='Heading 2'
				kind={editor.isActive('heading', { level: 2 }) ? 'primary' : 'ghost'}
				onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
			>
				h2
			</Button>
			<Button
				className='text-text-primary'
				size='sm'
				hasIconOnly
				iconDescription='Heading 3'
				kind={editor.isActive('heading', { level: 3 }) ? 'primary' : 'ghost'}
				onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
			>
				h3
			</Button>
			<Button
				size='sm'
				hasIconOnly
				renderIcon={ListBulleted}
				iconDescription='Bullet List'
				kind={editor.isActive('bulletList') ? 'primary' : 'ghost'}
				onClick={() => editor.chain().focus().toggleBulletList().run()}
			/>
			<Button
				size='sm'
				hasIconOnly
				renderIcon={ListNumbered}
				iconDescription='Ordered List'
				kind={editor.isActive('orderedList') ? 'primary' : 'ghost'}
				onClick={() => editor.chain().focus().toggleOrderedList().run()}
			/>
			<Button
				size='sm'
				hasIconOnly
				renderIcon={Quotes}
				iconDescription='Quotes'
				kind={editor.isActive('blockquote') ? 'primary' : 'ghost'}
				onClick={() => editor.chain().focus().toggleBlockquote().run()}
			/>
			<Button
				size='sm'
				hasIconOnly
				renderIcon={Row}
				iconDescription='Horizontal Rule'
				kind={editor.isActive('Horizontal') ? 'primary' : 'ghost'}
				onClick={() => editor.chain().focus().setHorizontalRule().run()}
			/>
			<Button
				size='sm'
				hasIconOnly
				renderIcon={Undo}
				iconDescription='Undo'
				kind='ghost'
				onClick={() => editor.chain().focus().undo().run()}
			/>
			<Button
				size='sm'
				hasIconOnly
				renderIcon={Redo}
				iconDescription='Redo'
				kind='ghost'
				onClick={() => editor.chain().focus().redo().run()}
			/>
			<Button
				size='sm'
				hasIconOnly
				renderIcon={TableIcon}
				iconDescription='Insert Table'
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
				iconDescription='Add Column'
			>
				<OverflowMenuItem
					itemText='Add Column Before'
					onClick={() => editor.chain().focus().addColumnBefore().run()}
					disabled={!editor.can().addColumnBefore()}
				/>
				<OverflowMenuItem
					itemText='Add Column After'
					onClick={() => editor.chain().focus().addColumnAfter().run()}
					disabled={!editor.can().addColumnAfter()}
				/>
			</OverflowMenu>
			<Button
				size='sm'
				hasIconOnly
				renderIcon={ColumnDelete}
				iconDescription='Delete Column'
				kind='ghost'
				onClick={() => editor.chain().focus().deleteColumn().run()}
				disabled={!editor.can().deleteColumn()}
			/>
			<OverflowMenu
				className='h-[32px] w-[32px] flex-none'
				ariaLabel='overflow-menu'
				renderIcon={RowInsert}
				iconDescription='Add Row'
			>
				<OverflowMenuItem
					itemText='Add Row Before'
					onClick={() => editor.chain().focus().addRowBefore().run()}
					disabled={!editor.can().addRowBefore()}
				/>
				<OverflowMenuItem
					itemText='Add Row After'
					onClick={() => editor.chain().focus().addRowAfter().run()}
					disabled={!editor.can().addRowAfter()}
				/>
			</OverflowMenu>
			<Button
				size='sm'
				hasIconOnly
				renderIcon={RowDelete}
				iconDescription='Delete Row'
				kind='ghost'
				onClick={() => editor.chain().focus().deleteRow().run()}
				disabled={!editor.can().deleteRow()}
			/>
			<Button
				size='sm'
				hasIconOnly
				renderIcon={TrashCan}
				iconDescription='Delete Table'
				kind='ghost'
				onClick={() => editor.chain().focus().deleteTable().run()}
				disabled={!editor.can().deleteTable()}
			/>
		</div>
	);
};

export default () => {
	const editor = useEditor({
		extensions: [
			StarterKit,
			Table.configure({
				resizable: true
			}),
			TableRow,
			TableHeader,
			CustomTableCell
		]
	});

	return (
		<div className='divide-y-[1px] divide-solid divide-border-subtle-0 border-[1px] border-solid border-border-strong-3'>
			<div className='bg-layer-1'>
				<MenuBar editor={editor} />
			</div>
			<EditorContent editor={editor} />
		</div>
	);
};
