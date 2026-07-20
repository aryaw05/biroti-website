import React from 'react';
import { Block } from './types';
import { 
    ParagraphBlock, 
    HeadingBlock, 
    BulletListBlock, 
    NumberedListBlock, 
    ImageBlock 
} from './blocks';

interface BlockRendererProps {
    blocks: Block[];
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({ blocks }) => {
    if (!blocks || !Array.isArray(blocks) || blocks.length === 0) return null;

    return (
        <>
            {blocks.map((block) => {
                switch (block.type) {
                    case 'paragraph':
                        return <ParagraphBlock key={block.id} block={block} />;
                    case 'heading':
                        return <HeadingBlock key={block.id} block={block} />;
                    case 'bulletListItem':
                        return <BulletListBlock key={block.id} block={block} />;
                    case 'numberedListItem':
                        return <NumberedListBlock key={block.id} block={block} />;
                    case 'image':
                        return <ImageBlock key={block.id} block={block} />;
                    // Ignore unhandled block types quietly or log a warning if needed
                    default:
                        console.warn(`[BlockRenderer] Unhandled block type: ${block.type}`);
                        return null;
                }
            })}
        </>
    );
};
