'use client';

import { FC, useEffect, useState } from 'react';
import { Article } from '../../../models/article';
import { NewsService } from '../../../services/api-service';
import ArticleList from '../ArticleList/ArticleList';
import SearchBar from '../SearchBar/SearchBar';

const SearchPage: FC<{ country: string }> = ({ country }) => {
  const [articles, setArticles] = useState<Article[] | null>(null);
  const [query, setQuery] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!query.trim()) {
      setArticles(null);
      return;
    }

    // Fetch articles with a debounce whenever the search query changes
    const getData = setTimeout(async () => {
      console.log('getting articles');
      setLoading(true);
      setError(null);
      try {
        const articles = await NewsService.getTopNewsByQuery(country, query);
        setArticles(articles);
      } catch (err) {
        setError('Unable to load articles');
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(getData);
  }, [query, country]);

  return (
    <div className="w-full">
      <div className="mb-4">
        <SearchBar
          onChange={(value) => {
            setQuery(value);
          }}
        />
      </div>

      {loading && <p>Loading...</p>}
      {!articles && !loading && <p>Type something in the search bar above.</p>}
      {error && <p>{error}</p>}

      {articles && <ArticleList articles={articles} />}
    </div>
  );
};

export default SearchPage;
