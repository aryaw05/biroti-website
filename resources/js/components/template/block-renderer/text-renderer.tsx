import React from 'react';
import { InlineContent } from './types';

interface TextRendererProps {
    content?: InlineContent[];
}

export const TextRenderer: React.FC<TextRendererProps> = ({ content }) => {
    if (!content || !Array.isArray(content)) return null;

    return (
        <>
            {content.map((item, index) => {
                if (item.type === 'text') {
                    let element = <>{item.text}</>;

                    if (item.styles?.bold) element = <strong>{element}</strong>;
                    if (item.styles?.italic) element = <em>{element}</em>;
                    if (item.styles?.underline) element = <u>{element}</u>;
                    if (item.styles?.strike) element = <del>{element}</del>;

                    // Handle optional custom colors
                    const style: React.CSSProperties = {};
                    if (item.styles?.textColor && item.styles.textColor !== 'default') {
                        style.color = item.styles.textColor;
                    }
                    if (item.styles?.backgroundColor && item.styles.backgroundColor !== 'default') {
                        style.backgroundColor = item.styles.backgroundColor;
                    }

                    if (Object.keys(style).length > 0) {
                        element = <span style={style}>{element}</span>;
                    }

                    return <React.Fragment key={index}>{element}</React.Fragment>;
                }

                if (item.type === 'link') {
                    return (
                        <a 
                            key={index} 
                            href={item.href} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary font-medium hover:underline transition-all"
                        >
                            <TextRenderer content={item.content} />
                        </a>
                    );
                }

                return null;
            })}
        </>
    );
};
