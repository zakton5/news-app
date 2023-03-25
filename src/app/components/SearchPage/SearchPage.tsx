'use client';

import { FC, useEffect, useState } from 'react';
import { Article } from '../../../models/article';
import { NewsService } from '../../../services/api-service';
import ArticleList from '../ArticleList/ArticleList';
import SearchBar from '../SearchBar/SearchBar';
import { usePathname, useRouter } from 'next/navigation';

const SearchPage: FC<{ country: string; initialQuery?: string }> = ({ country, initialQuery }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [articles, setArticles] = useState<Article[] | null>(null);
  const [query, setQuery] = useState<string>(initialQuery ?? '');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!query?.trim()) {
      setArticles(null);
      return;
    } else {
      // Preserve the search query in the url
      const params = new URLSearchParams();
      params.set('q', query);
      router.replace(`${pathname}?${params}`);
    }

    // Fetch articles with a debounce whenever the search query changes
    const getData = setTimeout(async () => {
      setLoading(true);
      setError(null);

      try {
        const articles = await NewsService.getTopNews(country, query);
        setArticles(articles);
      } catch (err) {
        setError('Unable to load articles');
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(getData);
  }, [query, country, router, pathname]);

  return (
    <div className="w-full">
      <div className="mb-4">
        <SearchBar
          initialValue={query}
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
