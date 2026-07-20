import { Header } from '@/components/template/article/detail-page/header';
import ArticleLayout from '@/layouts/article/article-layout';
import { BlockRenderer } from '@/components/template/block-renderer';
import heroImage from '@/assets/images/hero-image.webp';
import { usePage } from '@inertiajs/react';

interface ArticleProps {
    article: {
        id_blog: number;
        judul: string;
        konten: string;
        tanggal: string;
        thumbnail: string | null;
        author: string | null;
    };
}

export default function DetailArticlePage({ article }: ArticleProps) {
    return (
        <ArticleLayout>
            <div className="min-h-screen bg-background py-28">
                <div className="mx-auto max-w-4xl px-6">
                    <Header
                        category="Article"
                        title={article.judul}
                        author={{ name: article.author || 'Admin', avatar: '' }}
                        publishedDate={article.tanggal}
                    />

                    <div className="mt-16">
                        {article.thumbnail && (
                            <div className="aspect-video w-full overflow-hidden rounded-xl bg-muted mb-8">
                                <img
                                    src={article.thumbnail}
                                    alt="Cover Image"
                                    className="h-full w-full object-cover"
                                    width={800}
                                    height={450}
                                />
                            </div>
                        )}
                        <div className="article-content max-w-none">
                            <BlockRenderer blocks={JSON.parse(article.konten || '[]')} />
                        </div>
                    </div>
                </div>
            </div>
        </ArticleLayout>
    );
}
