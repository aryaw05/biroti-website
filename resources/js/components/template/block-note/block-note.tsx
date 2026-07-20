import { useAppearance } from '@/hooks/use-appearance';
import {
    Block,
    BlockNoteEditor,
    BlockNoteSchema,
    defaultBlockSpecs,
} from '@blocknote/core';

import '@blocknote/core/fonts/inter.css';
import { BlockNoteView } from '@blocknote/shadcn';
import '@blocknote/shadcn/style.css';
import '../../../../css/app.css';
type EditorProps = {
    editable: boolean;
    onSetBlocks?: (blocks: Block[]) => void;
    initialContent?: string;
};

// Our <Editor> component we can reuse later
export default function Editor({ editable, onSetBlocks, initialContent }: EditorProps) {
    const { appearance } = useAppearance();

    const { audio, file, ...remainingBlockSpecs } = defaultBlockSpecs;

    const schema = BlockNoteSchema.create({
        blockSpecs: {
            ...remainingBlockSpecs,
        },
    });

    const parsedContent = initialContent ? JSON.parse(initialContent) : undefined;

    const editor = BlockNoteEditor.create({
        schema,
        initialContent: parsedContent,
    });

    return (
        <BlockNoteView
            editor={editor}
            editable={editable}
            theme={appearance === 'dark' ? 'dark' : 'light'}
            onChange={() => {
                if (onSetBlocks) {
                    onSetBlocks(editor.document);
                }
            }}
        />
    );
}
