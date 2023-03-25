'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { Article } from '../../../models/article';
import { NewsService } from '../../../services/api-service';
import ArticleList from '../ArticleList/ArticleList';
import Link from 'next/link';

const categories: Record<string, string> = {
  business: 'Business',
  entertainment: 'Entertainment',
  general: 'General',
  health: 'Health',
  science: 'Science',
  sports: 'Sports',
  technology: 'Technology',
};

const CategoriesPage: FC<{ country: string; initialCategory?: string }> = ({ country, initialCategory }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [articles, setArticles] = useState<Article[] | null>(null);
  const [category, setCategory] = useState<string>(initialCategory ?? 'business');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!category?.trim()) {
      setArticles(null);
      return;
    } else {
      // Preserve the search category in the url
      const params = new URLSearchParams();
      params.set('category', category);
      router.replace(`${pathname}?${params}`);
    }

    async function fetchByCategory() {
      setLoading(true);
      setError(null);
      setArticles(null);

      try {
        const articles = await NewsService.getTopNews(country, undefined, category);
        setArticles(articles);
      } catch (err) {
        setError('Unable to load articles');
      } finally {
        setLoading(false);
      }
    }

    fetchByCategory();
  }, [category, country, router, pathname]);

  const renderButton = (category: string, selected: boolean) => {
    let classes = 'py-1 px-2 mb-4 rounded-xl drop-shadow-xl transition hover:scale-105 ';

    if (selected) {
      classes += 'bg-sky-300';
    } else {
      classes += 'bg-white';
    }

    return (
      <div key={category} className={classes} onClick={() => setCategory(category)}>
        {categories[category]}
      </div>
    );
  };

  return (
    <div className="w-full">
      <div className="flex gap-2">
        {Object.entries(categories).map(([key]) => {
          return renderButton(key, key === searchParams.get('category'))
        })}
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {articles && <ArticleList articles={articles} />}
    </div>
  );
};

export default CategoriesPage;
