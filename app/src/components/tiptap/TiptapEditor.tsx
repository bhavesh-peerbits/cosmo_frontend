import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Button } from '@carbon/react';
import {
	TextBold,
	TextItalic,
	TextStrikethrough,
	Paragraph,
	ListBulleted,
	ListNumbered,
	Quotes,
	Row,
	Undo,
	Redo
} from '@carbon/react/icons';

type EditorType = {
	editor?: Editor | null;
};

const MenuBar = ({ editor }: EditorType) => {
	if (!editor) {
		return null;
	}

	return (
		<>
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
				kind={editor.isActive('bulletList') ? 'primary' : 'ghost'}
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
				iconDescription='Quotes'
				kind={editor.isActive('blockquote') ? 'primary' : 'ghost'}
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
		</>
	);
};

export default () => {
	const editor = useEditor({
		extensions: [StarterKit],
		content: ''
	});

	return (
		<div className='divide-y divide-solid divide-background border border-solid border-border-strong-1'>
			<div className='bg-layer-1'>
				<MenuBar editor={editor} />
			</div>
			<EditorContent editor={editor} />
		</div>
	);
};
