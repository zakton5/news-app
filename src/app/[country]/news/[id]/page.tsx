import Link from 'next/link';
import { Article } from '../../../../models/article';
import { NewsService } from '../../../../services/api-service';
import Image from 'next/image';

interface PageParams {
  country: string;
  id: string;
}

async function getData(country: string, id: string): Promise<Article> {
  return await NewsService.getArticle(country, id);
}

export async function generateMetadata({ params }: { params: PageParams }) {
  const article = await getData(params.country, params.id);
  return { title: article.title, description: article.description };
}

export default async function Page({ params }: { params: PageParams }) {
  const article = await getData(params.country, params.id);

  return (
    <div className="max-w-xl m-auto">

      <h1 className="text-4xl mb-4">{article.title}</h1>
      <p className="text-xl mb-4">{article.description}</p>

      {article.urlToImage && (
        <div className="relative h-96 mb-4">
          <Image alt="headline image" src={article.urlToImage!} className="object-cover" fill />
        </div>
      )}

      <p className="mb-4">{article.content}</p>

      <Link href={`/${params.country}/news`} className="text-sm">&lsaquo; Back to list</Link>
    </div>
  );
}
