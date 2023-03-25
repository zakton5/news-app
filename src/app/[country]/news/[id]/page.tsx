import { Article } from '../../../../models/article';
import { NewsService } from '../../../../services/api-service';
import ArticlePage from '../../../components/ArticlePage/ArticlePage';

interface Params {
  params: {
    country: string;
    id: string;
  };
  searchParams: {
    category?: string;
  };
}

async function getData(country: string, id: string, category?: string): Promise<Article> {
  const article = await NewsService.getArticle(country, id, category);

  if (!article) {
    throw new Error('Unable to find article');
  }

  return article;
}

export async function generateMetadata({ params, searchParams }: Params) {
  const article = await getData(params.country, params.id, searchParams.category);
  return { title: article.title, description: article.description };
}

export default async function Page({ params, searchParams }: Params) {
  const article = await getData(params.country, params.id, searchParams.category);

  return <ArticlePage article={article} />;
}
