'use client';

import { FC } from 'react';
import { Article } from '../../../models/article';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  article: Article;
}

const NewsCard: FC<Props> = ({ article }) => {
  const pathname = usePathname();
  const [country, route] = pathname.substring(1).split('/');

  return (
    <Link href={`${country}/news/${article.title}`}>
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
