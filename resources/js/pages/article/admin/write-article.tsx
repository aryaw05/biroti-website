import Editor from '@/components/template/block-note/block-note';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Block, PartialBlock } from '@blocknote/core';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Write an article',
        href: dashboard().url,
    },
];
async function saveToStorage(jsonBlocks: Block[], title: string) {
    localStorage.setItem('editorContent', JSON.stringify(jsonBlocks));
    localStorage.setItem('editorTitleContent', title);
}

async function loadFromStorage() {
    const storageString = localStorage.getItem('editorContent');
    return storageString
        ? (JSON.parse(storageString) as PartialBlock[])
        : undefined;
}

export default function WriteArticle() {
    const [blocks, setBlocks] = useState<Block[]>([]);
    const [title, setTitle] = useState<string>('');
    useEffect(() => {
        if (blocks.length === 0 && title === '') {
            return;
        }
        const handler = setTimeout(() => {
            saveToStorage(blocks, title);
            toast.success('konten berhasil disimpan', {
                position: 'top-center',
            });
        }, 5000);

        return () => {
            clearTimeout(handler);
        };
    }, [blocks, title]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Write an Article" />
            <div className="flex h-screen flex-1 flex-col gap-4 overflow-x-auto rounded-xl py-5 md:px-10">
                <input
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    name="title"
                    placeholder="Article Title"
                    className="text-3xl font-bold outline-none md:text-5xl"
                />
                <Editor editable={true} onSetBlocks={setBlocks} />
            </div>
        </AppLayout>
    );
}
