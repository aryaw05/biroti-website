import Editor from '@/components/template/block-note/block-note';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Block, PartialBlock } from '@blocknote/core';
import { Head, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

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

interface ArticleProps {
    article: {
        id_blog: number;
        judul: string;
        konten: string;
        thumbnail: string | null;
    };
}

export default function EditArticle({ article }: ArticleProps) {
    const [blocks, setBlocks] = useState<Block[]>([]);
    const [title, setTitle] = useState<string>(article.judul);
    const [isPublishing, setIsPublishing] = useState(false);

    const handlePublish = () => {
        if (!title) {
            toast.error('Judul artikel wajib diisi');
            return;
        }

        setIsPublishing(true);
        // Using inertia put for update
        router.put(
            `/dashboard/article/${article.id_blog}`,
            {
                judul: title,
                konten: blocks.length > 0 ? JSON.stringify(blocks) : article.konten,
                thumbnail: article.thumbnail,
            },
            {
                onSuccess: () => {
                    toast.success('Artikel berhasil diperbarui');
                },
                onError: () => {
                    toast.error('Gagal memperbarui artikel');
                    setIsPublishing(false);
                },
            }
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Article" />
            <div className="flex h-screen flex-1 flex-col gap-4 overflow-x-auto rounded-xl py-5 md:px-10">
                <div className="flex items-center justify-between">
                    <input
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        type="text"
                        name="title"
                        placeholder="Article Title"
                        className="flex-1 text-3xl font-bold outline-none md:text-5xl bg-transparent"
                    />
                    <Button 
                        onClick={handlePublish} 
                        disabled={isPublishing}
                    >
                        {isPublishing ? 'Menyimpan...' : 'Update'}
                    </Button>
                </div>
                <Editor editable={true} onSetBlocks={setBlocks} initialContent={article.konten} />
            </div>
        </AppLayout>
    );
}
