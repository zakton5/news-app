import { ArticleService } from '../../../services/article-service';
import ArticleList from '../../components/ArticleList/ArticleList';

export const metadata = {
  title: 'Top News',
  description: 'Check out the latest news articles!',
};

async function getData(country: string) {
  return await ArticleService.getTopArticles(country);
}

export default async function Page({ params }: { params: { country: string } }) {
  const articles = await getData(params.country);

  return (
    <div>
      <h1 className="text-2xl">Top News</h1>

      <ArticleList articles={articles} />
    </div>
  );
}
