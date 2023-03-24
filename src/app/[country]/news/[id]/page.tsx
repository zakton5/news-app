import { Article } from '../../../../models/article';
import { NewsService } from '../../../../services/api-service';
import ArticlePage from '../../../components/ArticlePage/ArticlePage';

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

  return <ArticlePage article={article} />;
}
