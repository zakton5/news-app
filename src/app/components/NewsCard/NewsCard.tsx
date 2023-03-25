'use client';

import { FC } from 'react';
import { Article } from '../../../models/article';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

interface Props {
  article: Article;
}

const NewsCard: FC<Props> = ({ article }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [country] = pathname.substring(1).split('/');

  let articleUrl = `${country}/news/${article.title}`;

  // Add the category to the search URL if the categories page is open.
  const category = searchParams.get('category');
  if (category) {
    articleUrl += `?category=${category}`;
  }

  return (
    <Link href={articleUrl}>
      <div className="relative drop-shadow-xl rounded-lg bg-white overflow-hidden cursor-pointer transition hover:scale-105">
        <div className="relative h-60 border-b-2 border-sky-300">
          {article.urlToImage && <Image alt="headline image" src={article.urlToImage!} className="object-cover" fill />}
        </div>

        <div className="h-44 p-4">
          <h2 className="text-3xl max-h-20 truncate text-ellipsis overflow-hidden mb-2">{article.title}</h2>
          <p className="max-h-40 line-clamp-4">{article.description ?? article.content ?? '-'}</p>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
