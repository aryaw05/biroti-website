export interface TextStyles {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    strike?: boolean;
    textColor?: string;
    backgroundColor?: string;
}

export interface InlineContent {
    type: 'text' | 'link';
    text?: string;
    href?: string;
    content?: InlineContent[];
    styles?: TextStyles;
}

export interface Block {
    id: string;
    type: string;
    props: Record<string, any>;
    content: InlineContent[] | undefined;
    children: Block[];
}
