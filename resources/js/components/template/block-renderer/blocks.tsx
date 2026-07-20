import React from 'react';
import { Block } from './types';
import { TextRenderer } from './text-renderer';
import { BlockRenderer } from './block-renderer';

export const ParagraphBlock = ({ block }: { block: Block }) => {
    // If paragraph is empty, render a line break to maintain spacing
    if (!block.content || block.content.length === 0) {
        return <p className="mb-4 min-h-[1.5rem]" />;
    }
    
    return (
        <p className="mb-4 leading-relaxed text-foreground/90" style={{ textAlign: block.props.textAlignment }}>
            <TextRenderer content={block.content} />
        </p>
    );
};

export const HeadingBlock = ({ block }: { block: Block }) => {
    const level = block.props.level || 1;
    const Tag = `h${level}` as keyof JSX.IntrinsicElements;
    
    // Dynamic styling based on heading level
    const sizeClasses = {
        1: 'text-3xl font-bold mt-10 mb-5',
        2: 'text-2xl font-bold mt-8 mb-4',
        3: 'text-xl font-semibold mt-6 mb-3',
    }[level as number] || 'text-lg font-semibold';

    return (
        <Tag className={`${sizeClasses} text-foreground`} style={{ textAlign: block.props.textAlignment }}>
            <TextRenderer content={block.content} />
        </Tag>
    );
};

export const BulletListBlock = ({ block }: { block: Block }) => {
    return (
        <ul className="list-disc ml-6 mb-2">
            <li className="mb-1 text-foreground/90">
                <TextRenderer content={block.content} />
                {block.children && block.children.length > 0 && (
                    <div className="mt-2">
                        <BlockRenderer blocks={block.children} />
                    </div>
                )}
            </li>
        </ul>
    );
};

export const NumberedListBlock = ({ block }: { block: Block }) => {
    return (
        <ol className="list-decimal ml-6 mb-2">
            <li className="mb-1 text-foreground/90">
                <TextRenderer content={block.content} />
                {block.children && block.children.length > 0 && (
                    <div className="mt-2">
                        <BlockRenderer blocks={block.children} />
                    </div>
                )}
            </li>
        </ol>
    );
};

export const ImageBlock = ({ block }: { block: Block }) => {
    if (!block.props.url) return null;
    
    return (
        <figure className="my-8">
            <img 
                src={block.props.url} 
                alt={block.props.caption || 'Article Image'} 
                className="w-full h-auto max-h-[600px] object-cover rounded-xl shadow-sm bg-muted"
            />
            {block.props.caption && (
                <figcaption className="text-center text-sm text-muted-foreground mt-3 italic">
                    {block.props.caption}
                </figcaption>
            )}
        </figure>
    );
};
