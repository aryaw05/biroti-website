import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, BriefcaseBusiness, Calendar, Cpu } from 'lucide-react';
import ArticleLayout from '@/layouts/article/article-layout';
import { Link } from '@inertiajs/react';

const categories = [
    { name: 'Technology', totalPosts: 10, icon: Cpu },
    { name: 'Productivity', totalPosts: 5, icon: BriefcaseBusiness },
    { name: 'Soft-Skills', totalPosts: 5, icon: Brain },
];

interface Article {
    id_blog: number;
    judul: string;
    slug: string;
    tanggal: string;
    thumbnail: string | null;
    author: string | null;
}

export default function AllArticle({ articles }: { articles: Article[] }) {
    return (
        <ArticleLayout>
            <div className="mx-auto flex max-w-(--breakpoint-xl) flex-col items-start gap-12 px-6 py-10 lg:flex-row lg:py-28 xl:px-0">
                <div>
                    <div className="space-y-12">
                        {articles?.map((article, i) => (
                            <Card
                                key={i}
                                className="cursor-pointer overflow-hidden rounded-md border-none py-0 shadow-none"
                            >
                                <Link
                                    href={`/article/${article.slug || article.id_blog}`}
                                    className="flex flex-col sm:flex-row sm:items-center"
                                >
                                    <div className="aspect-video shrink-0 grow rounded-lg bg-muted sm:aspect-square sm:w-56 overflow-hidden">
                                        {article.thumbnail ? (
                                            <img src={article.thumbnail} alt={article.judul} className="h-full w-full object-cover" />
                                        ) : (
                                            <div className="h-full w-full bg-muted" />
                                        )}
                                    </div>
                                    <CardContent className="flex flex-col px-0 py-0 sm:px-6">
                                        <div className="flex items-center gap-6">
                                            <Badge className="bg-primary/5 text-primary shadow-none hover:bg-primary/5">
                                                Article
                                            </Badge>
                                        </div>

                                        <h3 className="mt-4 text-2xl font-semibold tracking-tight">
                                            {article.judul}
                                        </h3>
                                        <div className="mt-4 flex items-center gap-6 text-sm font-medium text-muted-foreground">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4" />{' '}
                                                {article.tanggal}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span>Oleh {article.author || 'Admin'}</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Link>
                            </Card>
                        ))}
                    </div>
                </div>
                <aside className="sticky top-8 w-full shrink-0 lg:max-w-sm">
                    <h3 className="text-xl font-semibold tracking-tight">
                        Categories
                    </h3>
                    <div className="mt-4 grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1">
                        {categories.map((category) => (
                            <div
                                key={category.name}
                                className="bg-opacity-15 dark:bg-opacity-25 flex items-center justify-between gap-2 rounded-md bg-muted p-3"
                            >
                                <div className="flex items-center gap-3">
                                    <category.icon className="h-5 w-5" />
                                    <span className="font-medium">
                                        {category.name}
                                    </span>
                                </div>
                                <Badge className="rounded-full bg-foreground/7 px-1.5 text-foreground">
                                    {category.totalPosts}
                                </Badge>
                            </div>
                        ))}
                    </div>
                </aside>
            </div>
        </ArticleLayout>
    );
}
