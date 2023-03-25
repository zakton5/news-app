import { FC } from 'react';
import { Article } from '../../../models/article';
import ArticleCard from '../ArticleCard/ArticleCard';

interface Props {
  articles: Article[];
}

const ArticleList: FC<Props> = ({ articles }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      {articles.map((article) => {
        return <ArticleCard key={article.title} article={article} />;
      })}
    </div>
  );
};

export default ArticleList;
